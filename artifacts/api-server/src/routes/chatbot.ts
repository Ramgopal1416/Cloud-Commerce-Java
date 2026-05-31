import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { chatbotLogsTable, productsTable, categoriesTable } from "@workspace/db";
import { eq, ilike, or, and } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are ShopBot, the AI shopping concierge for ShopAI — a premium e-commerce platform.

You help customers with:
- Finding products and answering product questions
- Personalized product recommendations based on their needs/budget/style
- Order tracking, returns (14-day window, full refund on defects), and shipping (3–7 days, free over $50)
- Comparing products, styling advice, gift ideas

PRODUCT SEARCH INSTRUCTIONS:
When a customer asks about products, recommendations, or anything product-related, you MUST include a JSON block at the very end of your response in this exact format:
<products>{"keywords":["keyword1","keyword2"],"category":"CategoryName"}</products>

Examples:
- "show me headphones" → <products>{"keywords":["headphones","wireless","bluetooth"],"category":"Electronics"}</products>
- "I need skincare" → <products>{"keywords":["serum","moisturizer","skincare"],"category":"Personal Care"}</products>
- "gift ideas under $50" → <products>{"keywords":["gift","popular"]}</products>
- "yoga mat" → <products>{"keywords":["yoga","mat","fitness"],"category":"Sports & Fitness"}</products>
- "bags" → <products>{"keywords":["bag","tote","backpack"],"category":"Bags & Accessories"}</products>

For general questions (greetings, shipping policy, order status) do NOT include the products block.
Be warm, helpful, and concise. Maximum 3 sentences for your main response.`;

interface ProductSearchHint {
  keywords: string[];
  category?: string;
}

async function findProductsFromHint(hint: ProductSearchHint): Promise<typeof productsTable.$inferSelect[]> {
  try {
    const conditions = hint.keywords
      .slice(0, 3)
      .map((kw) =>
        or(
          ilike(productsTable.name, `%${kw}%`),
          ilike(productsTable.description, `%${kw}%`),
          ilike(productsTable.brand, `%${kw}%`)
        )
      );

    const whereClause = conditions.length > 0 ? or(...conditions) : undefined;

    const results = await db
      .select()
      .from(productsTable)
      .where(and(eq(productsTable.isActive, true), whereClause))
      .limit(6);

    // If category filter was specified and we got < 3 results, try without keyword filter
    if (results.length < 3 && hint.category) {
      const cats = await db
        .select()
        .from(categoriesTable)
        .where(ilike(categoriesTable.name, `%${hint.category}%`))
        .limit(1);
      if (cats[0]) {
        const catProducts = await db
          .select()
          .from(productsTable)
          .where(and(eq(productsTable.isActive, true), eq(productsTable.categoryId, cats[0].id)))
          .limit(6);
        return catProducts;
      }
    }

    return results;
  } catch {
    return [];
  }
}

router.post("/chatbot/message", async (req, res): Promise<void> => {
  const { message, sessionId } = req.body;
  if (!message || !sessionId) {
    res.status(400).json({ error: "message and sessionId required" }); return;
  }

  const history = await db.select().from(chatbotLogsTable)
    .where(eq(chatbotLogsTable.sessionId, sessionId))
    .orderBy(chatbotLogsTable.createdAt);

  const messages: { role: "user" | "assistant"; content: string }[] = [];
  for (const h of history.slice(-6)) {
    messages.push({ role: "user", content: h.userMessage });
    messages.push({ role: "assistant", content: h.botResponse });
  }
  messages.push({ role: "user", content: message });

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    max_completion_tokens: 600,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
  });

  const rawResponse = response.choices[0]?.message.content ?? "I'm sorry, I couldn't process that. Please try again.";

  // Parse out the product search hint block
  const productBlockMatch = rawResponse.match(/<products>([\s\S]*?)<\/products>/);
  let botResponse = rawResponse.replace(/<products>[\s\S]*?<\/products>/, "").trim();
  let products: typeof productsTable.$inferSelect[] = [];

  if (productBlockMatch) {
    try {
      const hint: ProductSearchHint = JSON.parse(productBlockMatch[1]);
      products = await findProductsFromHint(hint);
    } catch {
      // ignore parse error
    }
  }

  const userId = (req as any).user?.id ?? null;
  await db.insert(chatbotLogsTable).values({
    sessionId, userId, userMessage: message, botResponse,
    intent: productBlockMatch ? "product_search" : "general",
  });

  res.json({ response: botResponse, sessionId, intent: productBlockMatch ? "product_search" : "general", products });
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
