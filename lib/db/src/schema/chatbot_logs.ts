import { pgTable, serial, integer, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chatbotLogsTable = pgTable("chatbot_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  userMessage: text("user_message").notNull(),
  botResponse: text("bot_response").notNull(),
  intent: varchar("intent", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertChatbotLogSchema = createInsertSchema(chatbotLogsTable).omit({ id: true, createdAt: true });
export type InsertChatbotLog = z.infer<typeof insertChatbotLogSchema>;
export type ChatbotLog = typeof chatbotLogsTable.$inferSelect;
