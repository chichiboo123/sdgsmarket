import { students, actionPlans, type Student, type InsertStudent, type ActionPlan, type InsertActionPlan } from "@shared/schema";

export interface IStorage {
  createStudent(student: InsertStudent): Promise<Student>;
  createActionPlan(actionPlan: InsertActionPlan): Promise<ActionPlan>;
  getActionPlan(id: number): Promise<ActionPlan | undefined>;
}

export class MemStorage implements IStorage {
  private students: Map<number, Student>;
  private actionPlans: Map<number, ActionPlan>;
  private currentStudentId: number;
  private currentActionPlanId: number;

  constructor() {
    this.students = new Map();
    this.actionPlans = new Map();
    this.currentStudentId = 1;
    this.currentActionPlanId = 1;
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const student: Student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  async createActionPlan(insertActionPlan: InsertActionPlan): Promise<ActionPlan> {
    const id = this.currentActionPlanId++;
    const actionPlan: ActionPlan = {
      ...insertActionPlan,
      id,
      createdAt: new Date(),
    };
    this.actionPlans.set(id, actionPlan);
    return actionPlan;
  }

  async getActionPlan(id: number): Promise<ActionPlan | undefined> {
    return this.actionPlans.get(id);
  }
}

export const storage = new MemStorage();
