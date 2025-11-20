import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const quotes = pgTable("quotes", {
    id: serial("id").primaryKey(),
    text: text("text").notNull(),
    author: text("author").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
