import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, productsTable, ordersTable, inventoryTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/admin/stats", requireAdmin, async (_req, res): Promise<void> => {
  const [[{ totalUsers }], [{ totalProducts }], [{ totalOrders }], [{ totalRevenue }], [{ pendingOrders }], lowStock] = await Promise.all([
    db.select({ totalUsers: sql<number>`count(*)::int` }).from(usersTable),
    db.select({ totalProducts: sql<number>`count(*)::int` }).from(productsTable).where(eq(productsTable.isActive, true)),
    db.select({ totalOrders: sql<number>`count(*)::int` }).from(ordersTable),
    db.select({ totalRevenue: sql<string>`coalesce(sum(total_amount::numeric), 0)::text` }).from(ordersTable),
    db.select({ pendingOrders: sql<number>`count(*)::int` }).from(ordersTable).where(eq(ordersTable.status, "PENDING")),
    db.select().from(inventoryTable).where(sql`${inventoryTable.quantity} <= ${inventoryTable.lowStockThreshold}`),
  ]);
  res.json({ totalUsers, totalProducts, totalOrders, totalRevenue, pendingOrders, lowStockCount: lowStock.length });
});

router.get("/admin/orders", requireAdmin, async (req, res): Promise<void> => {
  const { status, page = "1" } = req.query as Record<string, string>;
  const pageNum = parseInt(page, 10) || 1;
  const limit = 50;
  const offset = (pageNum - 1) * limit;
  let query = db.select().from(ordersTable).orderBy(ordersTable.createdAt).limit(limit).offset(offset);
  const orders = await (status ? db.select().from(ordersTable).where(eq(ordersTable.status, status as any)).orderBy(ordersTable.createdAt).limit(limit).offset(offset) : query);
  res.json(orders);
});

router.patch("/admin/orders/:id/status", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const { status } = req.body;
  if (!status) { res.status(400).json({ error: "status required" }); return; }
  const [order] = await db.update(ordersTable).set({ status }).where(eq(ordersTable.id, id)).returning();
  if (!order) { res.status(404).json({ error: "Order not found" }); return; }
  res.json(order);
});

router.get("/admin/users", requireAdmin, async (_req, res): Promise<void> => {
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    role: usersTable.role,
    phone: usersTable.phone,
    address: usersTable.address,
    avatarUrl: usersTable.avatarUrl,
    isActive: usersTable.isActive,
    createdAt: usersTable.createdAt,
  }).from(usersTable).orderBy(usersTable.createdAt);
  res.json(users);
});

export default router;
