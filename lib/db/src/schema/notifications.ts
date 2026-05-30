import { pgTable, serial, integer, text, boolean, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const notificationTypeEnum = pgEnum("notification_type", ["ORDER_CONFIRM", "SHIPPED", "DELIVERED", "CANCELLED", "LOW_STOCK", "PROMO"]);

export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  orderId: integer("order_id"),
  type: notificationTypeEnum("type").notNull(),
  message: text("message").notNull(),
  isSent: boolean("is_sent").notNull().default(false),
  isRead: boolean("is_read").notNull().default(false),
  snsMessageId: varchar("sns_message_id", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notificationsTable).omit({ id: true, createdAt: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;
