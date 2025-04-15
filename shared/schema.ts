import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const confessionResponses = pgTable("confession_responses", {
  id: serial("id").primaryKey(),
  result: text("result").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertConfessionResponseSchema = createInsertSchema(confessionResponses).pick({
  result: true
});

export type InsertConfessionResponse = z.infer<typeof insertConfessionResponseSchema>;
export type ConfessionResponse = typeof confessionResponses.$inferSelect;
