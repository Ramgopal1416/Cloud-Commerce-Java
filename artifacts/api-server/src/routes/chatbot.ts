import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { chatbotLogsTable, productsTable, categoriesTable } from "@workspace/db";
import { eq, ilike, and } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are ShopBot, an AI shopping assistant for an e-commerce platform.
You help customers with:
- Finding products and answering product questions
- Order tracking and status updates
- Return and refund policies (14-day return window, full refund if item is defective)
- Product recommendations based on their interests
- FAQ support (shipping takes 3-7 days, free shipping over $50)
- Comparing products

Be helpful, concise, and friendly. If asked about specific products, guide the user to search on the platform.
For order tracking, ask for their order ID and tell them to check the Orders section.
Always stay on-topic as a shopping assistant.`;

router.post("/chatbot/message", async (req, res): Promise<void> => {
  const { message, sessionId } = req.body;
  if (!message || !sessionId) {
    res.status(400).json({ error: "message and sessionId required" }); return;
  }

  const history = await db.select().from(chatbotLogsTable)
    .where(eq(chatbotLogsTable.sessionId, sessionId))
    .orderBy(chatbotLogsTable.createdAt);

  const messages: { role: "user" | "assistant"; content: string }[] = [];
  for (const h of history.slice(-8)) {
    messages.push({ role: "user", content: h.userMessage });
    messages.push({ role: "assistant", content: h.botResponse });
  }
  messages.push({ role: "user", content: message });

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    max_completion_tokens: 512,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
  });

  const botResponse = response.choices[0]?.message.content ?? "I'm sorry, I couldn't process that. Please try again.";

  const userId = (req as any).user?.id ?? null;
  await db.insert(chatbotLogsTable).values({
    sessionId, userId, userMessage: message, botResponse, intent: "general",
  });

  res.json({ response: botResponse, sessionId, intent: "general" });
});

router.get("/chatbot/history", async (req, res): Promise<void> => {
  const { sessionId } = req.query as { sessionId: string };
  if (!sessionId) { res.status(400).json({ error: "sessionId required" }); return; }
  const logs = await db.select().from(chatbotLogsTable)
    .where(eq(chatbotLogsTable.sessionId, sessionId))
    .orderBy(chatbotLogsTable.createdAt);
  res.json(logs);
});

export default router;
