import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  school: text("school").notNull(),
  grade: text("grade").notNull(),
  class: text("class"),
});

export const actionPlans = pgTable("action_plans", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id),
  sdgGoals: json("sdg_goals").$type<number[]>().notNull(),
  planMethod: text("plan_method").notNull(), // 'text', 'drawing', 'both'
  actionPlanText: text("action_plan_text"),
  drawingData: text("drawing_data"), // base64 encoded canvas data
  deliveryMemos: json("delivery_memos").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

export const insertActionPlanSchema = createInsertSchema(actionPlans).omit({
  id: true,
  createdAt: true,
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type ActionPlan = typeof actionPlans.$inferSelect;
export type InsertActionPlan = z.infer<typeof insertActionPlanSchema>;
