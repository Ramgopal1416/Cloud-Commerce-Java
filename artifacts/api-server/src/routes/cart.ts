import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { cartTable, cartItemsTable, productsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth";

const router: IRouter = Router();

async function getOrCreateCart(userId: number) {
  let [cart] = await db.select().from(cartTable).where(eq(cartTable.userId, userId));
  if (!cart) {
    [cart] = await db.insert(cartTable).values({ userId }).returning();
  }
  return cart;
}

async function buildCartResponse(userId: number) {
  const cart = await getOrCreateCart(userId);
  const items = await db.select({
    id: cartItemsTable.id,
    cartId: cartItemsTable.cartId,
    productId: cartItemsTable.productId,
    quantity: cartItemsTable.quantity,
    unitPrice: cartItemsTable.unitPrice,
    createdAt: cartItemsTable.createdAt,
    updatedAt: cartItemsTable.updatedAt,
    product: productsTable,
  }).from(cartItemsTable)
    .leftJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .where(eq(cartItemsTable.cartId, cart.id));

  const total = items.reduce((sum, item) => sum + parseFloat(item.unitPrice) * item.quantity, 0).toFixed(2);
  return { id: cart.id, userId: cart.userId, items, total };
}

router.get("/cart", requireAuth, async (req, res): Promise<void> => {
  res.json(await buildCartResponse(req.user!.id));
});

router.post("/cart/items", requireAuth, async (req, res): Promise<void> => {
  const { productId, quantity = 1 } = req.body;
  if (!productId) { res.status(400).json({ error: "productId required" }); return; }
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId));
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }
  const cart = await getOrCreateCart(req.user!.id);
  const [existing] = await db.select().from(cartItemsTable)
    .where(and(eq(cartItemsTable.cartId, cart.id), eq(cartItemsTable.productId, productId)));
  if (existing) {
    await db.update(cartItemsTable).set({ quantity: existing.quantity + quantity }).where(eq(cartItemsTable.id, existing.id));
  } else {
    await db.insert(cartItemsTable).values({ cartId: cart.id, productId, quantity, unitPrice: product.price });
  }
  res.json(await buildCartResponse(req.user!.id));
});

router.patch("/cart/items/:id", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const { quantity } = req.body;
  if (!quantity || quantity < 1) { res.status(400).json({ error: "quantity >= 1 required" }); return; }
  await db.update(cartItemsTable).set({ quantity }).where(eq(cartItemsTable.id, id));
  res.json(await buildCartResponse(req.user!.id));
});

router.delete("/cart/items/:id", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.delete(cartItemsTable).where(eq(cartItemsTable.id, id));
  res.json(await buildCartResponse(req.user!.id));
});

router.delete("/cart/clear", requireAuth, async (req, res): Promise<void> => {
  const cart = await getOrCreateCart(req.user!.id);
  await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));
  res.sendStatus(204);
});

export default router;
