import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { ordersTable, orderItemsTable, cartTable, cartItemsTable, inventoryTable, notificationsTable, productsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth";

const router: IRouter = Router();

async function buildOrderDetail(orderId: number) {
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
  if (!order) return null;
  const items = await db.select({
    id: orderItemsTable.id,
    orderId: orderItemsTable.orderId,
    productId: orderItemsTable.productId,
    quantity: orderItemsTable.quantity,
    unitPrice: orderItemsTable.unitPrice,
    subtotal: orderItemsTable.subtotal,
    product: productsTable,
  }).from(orderItemsTable)
    .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id))
    .where(eq(orderItemsTable.orderId, orderId));
  return { ...order, items };
}

router.get("/orders", requireAuth, async (req, res): Promise<void> => {
  const orders = await db.select().from(ordersTable)
    .where(eq(ordersTable.userId, req.user!.id))
    .orderBy(ordersTable.createdAt);
  res.json(orders);
});

router.post("/orders", requireAuth, async (req, res): Promise<void> => {
  const { shippingAddress, paymentMethod, notes } = req.body;
  if (!shippingAddress) { res.status(400).json({ error: "shippingAddress required" }); return; }

  const [cart] = await db.select().from(cartTable).where(eq(cartTable.userId, req.user!.id));
  if (!cart) { res.status(400).json({ error: "Cart is empty" }); return; }

  const cartItems = await db.select({
    id: cartItemsTable.id,
    productId: cartItemsTable.productId,
    quantity: cartItemsTable.quantity,
    unitPrice: cartItemsTable.unitPrice,
  }).from(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));

  if (!cartItems.length) { res.status(400).json({ error: "Cart is empty" }); return; }

  const totalAmount = cartItems.reduce((s, i) => s + parseFloat(i.unitPrice) * i.quantity, 0).toFixed(2);

  const validMethods = ["STRIPE", "RAZORPAY", "COD"] as const;
  const resolvedMethod = validMethods.includes(paymentMethod) ? paymentMethod : "COD";

  const [order] = await db.insert(ordersTable).values({
    userId: req.user!.id,
    totalAmount,
    shippingAddress,
    paymentMethod: resolvedMethod,
    notes,
    status: "CONFIRMED",
    paymentStatus: "PENDING",
  }).returning();

  for (const item of cartItems) {
    const subtotal = (parseFloat(item.unitPrice) * item.quantity).toFixed(2);
    await db.insert(orderItemsTable).values({
      orderId: order.id, productId: item.productId,
      quantity: item.quantity, unitPrice: item.unitPrice, subtotal,
    });
    await db.update(inventoryTable)
      .set({ quantity: 0 })
      .where(eq(inventoryTable.productId, item.productId));
  }

  await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));

  await db.insert(notificationsTable).values({
    userId: req.user!.id,
    orderId: order.id,
    type: "ORDER_CONFIRM",
    message: `Your order #${order.id} has been confirmed! Total: $${totalAmount}`,
    isSent: true,
  });

  res.status(201).json(order);
});

router.get("/orders/:id", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const detail = await buildOrderDetail(id);
  if (!detail) { res.status(404).json({ error: "Order not found" }); return; }
  if (detail.userId !== req.user!.id && req.user!.role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden" }); return;
  }
  res.json(detail);
});

router.post("/orders/:id/cancel", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
  if (!order) { res.status(404).json({ error: "Order not found" }); return; }
  if (order.userId !== req.user!.id) { res.status(403).json({ error: "Forbidden" }); return; }
  if (!["PENDING", "CONFIRMED"].includes(order.status)) {
    res.status(400).json({ error: "Order cannot be cancelled at this stage" }); return;
  }
  const [updated] = await db.update(ordersTable).set({ status: "CANCELLED" }).where(eq(ordersTable.id, id)).returning();
  res.json(updated);
});

router.post("/orders/:id/return", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
  if (!order) { res.status(404).json({ error: "Order not found" }); return; }
  if (order.userId !== req.user!.id) { res.status(403).json({ error: "Forbidden" }); return; }
  const [updated] = await db.update(ordersTable).set({ status: "RETURN_REQUESTED" }).where(eq(ordersTable.id, id)).returning();
  res.json(updated);
});

export default router;
