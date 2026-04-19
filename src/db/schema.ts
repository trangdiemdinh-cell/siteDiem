import { pgTable, serial, doublePrecision, timestamp, text } from "drizzle-orm/pg-core";

export const bmiRecords = pgTable("bmi_records", {
  id: serial("id").primaryKey(),
  weight: doublePrecision("weight").notNull(),
  height: doublePrecision("height").notNull(),
  bmi: doublePrecision("bmi").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
