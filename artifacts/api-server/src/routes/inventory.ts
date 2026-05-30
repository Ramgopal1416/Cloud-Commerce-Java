import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { inventoryTable } from "@workspace/db";
import { eq, lte, sql } from "drizzle-orm";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/inventory/low-stock", requireAdmin, async (_req, res): Promise<void> => {
  const items = await db.select().from(inventoryTable)
    .where(sql`${inventoryTable.quantity} <= ${inventoryTable.lowStockThreshold}`);
  res.json(items);
});

router.get("/inventory/:productId", requireAdmin, async (req, res): Promise<void> => {
  const productId = parseInt(Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId, 10);
  const [inv] = await db.select().from(inventoryTable).where(eq(inventoryTable.productId, productId));
  if (!inv) { res.status(404).json({ error: "Inventory not found" }); return; }
  res.json(inv);
});

router.patch("/inventory/:productId", requireAdmin, async (req, res): Promise<void> => {
  const productId = parseInt(Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId, 10);
  const { quantity, lowStockThreshold } = req.body;
  const updates: Record<string, unknown> = {};
  if (quantity !== undefined) updates.quantity = quantity;
  if (lowStockThreshold !== undefined) updates.lowStockThreshold = lowStockThreshold;
  const [inv] = await db.update(inventoryTable).set(updates).where(eq(inventoryTable.productId, productId)).returning();
  if (!inv) { res.status(404).json({ error: "Inventory not found" }); return; }
  res.json(inv);
});

export default router;
