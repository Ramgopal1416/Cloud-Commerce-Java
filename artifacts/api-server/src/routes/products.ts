import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable, inventoryTable } from "@workspace/db";
import { eq, and, gte, lte, ilike, sql } from "drizzle-orm";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const { search, categoryId, minPrice, maxPrice, brand, featured, page = "1", limit = "20" } = req.query as Record<string, string>;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
  const offset = (pageNum - 1) * limitNum;

  const conditions = [eq(productsTable.isActive, true)];
  if (search) conditions.push(ilike(productsTable.name, `%${search}%`));
  if (categoryId) conditions.push(eq(productsTable.categoryId, parseInt(categoryId, 10)));
  if (minPrice) conditions.push(gte(productsTable.price, minPrice));
  if (maxPrice) conditions.push(lte(productsTable.price, maxPrice));
  if (brand) conditions.push(ilike(productsTable.brand, `%${brand}%`));
  if (featured === "true") conditions.push(eq(productsTable.isFeatured, true));

  const where = and(...conditions);
  const [items, [{ count }]] = await Promise.all([
    db.select().from(productsTable).where(where).limit(limitNum).offset(offset),
    db.select({ count: sql<number>`count(*)::int` }).from(productsTable).where(where),
  ]);
  res.json({ items, total: count, page: pageNum, limit: limitNum });
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }
  const [inventory] = await db.select().from(inventoryTable).where(eq(inventoryTable.productId, id));
  res.json({ ...product, inventory: inventory ?? null });
});

router.post("/products", requireAdmin, async (req, res): Promise<void> => {
  const { name, description, price, comparePrice, categoryId, brand, imageUrl, images, sku, isActive, isFeatured, initialStock } = req.body;
  if (!name || !price || !categoryId) {
    res.status(400).json({ error: "name, price, categoryId required" }); return;
  }
  const [product] = await db.insert(productsTable).values({
    name, description, price: String(price), comparePrice: comparePrice ? String(comparePrice) : null,
    categoryId, brand, imageUrl, images, sku, isActive: isActive !== false, isFeatured: isFeatured === true,
  }).returning();
  await db.insert(inventoryTable).values({ productId: product.id, quantity: initialStock ?? 0 });
  res.status(201).json(product);
});

router.patch("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const allowed = ["name","description","price","comparePrice","categoryId","brand","imageUrl","isActive","isFeatured"] as const;
  const updates: Record<string, unknown> = {};
  for (const k of allowed) if (req.body[k] !== undefined) updates[k] = req.body[k];
  const [product] = await db.update(productsTable).set(updates).where(eq(productsTable.id, id)).returning();
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }
  res.json(product);
});

router.delete("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.delete(productsTable).where(eq(productsTable.id, id));
  res.sendStatus(204);
});

export default router;
