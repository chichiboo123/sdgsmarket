import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentSchema, insertActionPlanSchema } from "@shared/schema";
import PDFDocument from 'pdfkit';

export async function registerRoutes(app: Express): Promise<Server> {
  // Create student
  app.post("/api/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validatedData);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  // Create action plan
  app.post("/api/action-plans", async (req, res) => {
    try {
      const validatedData = insertActionPlanSchema.parse(req.body);
      const actionPlan = await storage.createActionPlan(validatedData);
      res.json(actionPlan);
    } catch (error) {
      res.status(400).json({ error: "Invalid action plan data" });
    }
  });

  // Generate receipt PDF
  app.post("/api/generate-receipt", async (req, res) => {
    try {
      const { studentData, actionPlanData, sdgGoals } = req.body;
      
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="sdg-receipt.pdf"');
      
      doc.pipe(res);
      
      // Header
      doc.fontSize(20).text('SDGs 마켓', 50, 50);
      doc.fontSize(16).text('실천 영수증', 50, 80);
      doc.fontSize(10).text(new Date().toLocaleDateString('ko-KR'), 50, 100);
      
      // Student info
      doc.fontSize(14).text('주문자 정보', 50, 140);
      doc.fontSize(10)
         .text(`이름: ${studentData.name}`, 50, 160)
         .text(`학교: ${studentData.school}`, 50, 180)
         .text(`학년/반: ${studentData.grade}학년 ${studentData.class || ''}`, 50, 200);
      
      // SDG Goals
      doc.fontSize(14).text('선택한 SDGs 목표', 50, 240);
      let yPos = 260;
      sdgGoals.forEach((goal: any, index: number) => {
        doc.fontSize(10).text(`${index + 1}. ${goal.title} (목표 ${goal.id})`, 50, yPos);
        yPos += 20;
      });
      
      // Action plan
      if (actionPlanData.actionPlanText) {
        doc.fontSize(14).text('나의 실천계획', 50, yPos + 20);
        doc.fontSize(10).text(actionPlanData.actionPlanText, 50, yPos + 40, { width: 500 });
      }
      
      // Footer
      doc.fontSize(8).text('이 영수증은 여러분의 지속가능발전목표 실천 의지를 나타내는 소중한 증명서입니다.', 50, doc.page.height - 100);
      doc.text('함께 만들어가는 더 나은 세상! 🌍', 50, doc.page.height - 80);
      
      doc.end();
    } catch (error) {
      res.status(500).json({ error: "Failed to generate receipt" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
