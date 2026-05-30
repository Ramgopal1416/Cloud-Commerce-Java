import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reviewsTable, usersTable, productsTable } from "@workspace/db";
import { eq, avg, sql } from "drizzle-orm";
import { requireAuth } from "../lib/auth";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

async function analyzeSentiment(comment: string): Promise<string> {
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-5-nano",
      max_completion_tokens: 10,
      messages: [
        { role: "system", content: "Classify the sentiment of this product review as exactly one word: positive, neutral, or negative." },
        { role: "user", content: comment },
      ],
    });
    const s = resp.choices[0]?.message.content?.toLowerCase().trim() ?? "neutral";
    if (s.includes("positive")) return "positive";
    if (s.includes("negative")) return "negative";
    return "neutral";
  } catch {
    return "neutral";
  }
}

router.get("/reviews/product/:productId", async (req, res): Promise<void> => {
  const productId = parseInt(Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId, 10);
  const reviews = await db.select({
    id: reviewsTable.id,
    productId: reviewsTable.productId,
    userId: reviewsTable.userId,
    rating: reviewsTable.rating,
    comment: reviewsTable.comment,
    sentiment: reviewsTable.sentiment,
    createdAt: reviewsTable.createdAt,
    user: {
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      role: usersTable.role,
      phone: usersTable.phone,
      address: usersTable.address,
      avatarUrl: usersTable.avatarUrl,
      isActive: usersTable.isActive,
      createdAt: usersTable.createdAt,
    },
  }).from(reviewsTable)
    .leftJoin(usersTable, eq(reviewsTable.userId, usersTable.id))
    .where(eq(reviewsTable.productId, productId))
    .orderBy(reviewsTable.createdAt);

  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const sentimentSummary = { positive: 0, neutral: 0, negative: 0 };
  for (const r of reviews) {
    const s = r.sentiment as keyof typeof sentimentSummary;
    if (s in sentimentSummary) sentimentSummary[s]++;
    else sentimentSummary.neutral++;
  }
  res.json({ reviews, averageRating: avgRating, sentimentSummary });
});

router.post("/reviews", requireAuth, async (req, res): Promise<void> => {
  const { productId, rating, comment } = req.body;
  if (!productId || !rating) { res.status(400).json({ error: "productId and rating required" }); return; }
  if (rating < 1 || rating > 5) { res.status(400).json({ error: "rating must be 1-5" }); return; }

  const sentiment = comment ? await analyzeSentiment(comment) : "neutral";
  const [review] = await db.insert(reviewsTable).values({
    productId, userId: req.user!.id, rating, comment, sentiment,
  }).returning();

  const allReviews = await db.select({ rating: reviewsTable.rating }).from(reviewsTable).where(eq(reviewsTable.productId, productId));
  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(2);
  await db.update(productsTable).set({ rating: avgRating, reviewCount: allReviews.length }).where(eq(productsTable.id, productId));

  res.status(201).json(review);
});

export default router;
