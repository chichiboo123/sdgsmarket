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
      const { student, actionPlan, sdgGoals, date, time } = req.body;
      
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="sdg-receipt.pdf"');
      
      // Create buffer to store PDF data
      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        res.send(pdfBuffer);
      });
      
      // Header
      doc.fontSize(20).text('SDGs 마켓', 50, 50, { align: 'center' });
      doc.fontSize(16).text('실천 영수증', 50, 80, { align: 'center' });
      doc.fontSize(10).text(`${date} ${time}`, 50, 100, { align: 'center' });
      
      // Student info
      doc.fontSize(14).text('주문자 정보', 50, 140);
      doc.fontSize(10)
         .text(`이름: ${student.name}`, 50, 160)
         .text(`학교: ${student.school}`, 50, 180)
         .text(`학년/반: ${student.grade}학년 ${student.class || ''}`, 50, 200);
      
      // SDG Goals
      doc.fontSize(14).text('선택한 SDGs 목표', 50, 240);
      let yPos = 260;
      sdgGoals.forEach((goal: any, index: number) => {
        doc.fontSize(10).text(`${index + 1}. ${goal.title} (목표 ${goal.id})`, 50, yPos);
        yPos += 20;
      });
      
      doc.fontSize(10).text(`총 목표 수: ${sdgGoals.length}개`, 50, yPos + 10);
      
      // Action plan
      if (actionPlan.actionPlanText) {
        doc.fontSize(14).text('나의 실천계획', 50, yPos + 40);
        doc.fontSize(10).text(actionPlan.actionPlanText, 50, yPos + 60, { width: 500 });
      }
      
      // Footer
      const footerY = doc.page.height - 100;
      doc.fontSize(8).text('이 영수증은 여러분의 지속가능발전목표 실천 의지를 나타내는 소중한 증명서입니다.', 50, footerY, { align: 'center' });
      doc.text('함께 만들어가는 더 나은 세상! 🌍', 50, footerY + 20, { align: 'center' });
      
      doc.end();
    } catch (error) {
      console.error('PDF generation error:', error);
      res.status(500).json({ error: "Failed to generate receipt" });
    }
  });

  // Generate receipt as image
  app.post("/api/generate-receipt-image", async (req, res) => {
    try {
      const { student, actionPlan, sdgGoals, date, time } = req.body;
      
      // Create HTML content for the receipt
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Noto Sans KR', sans-serif; margin: 0; padding: 20px; background: white; }
            .receipt { max-width: 600px; margin: 0 auto; padding: 40px; border: 2px dashed #ccc; }
            .header { text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #2563eb; font-size: 32px; margin: 0; }
            .header h2 { font-size: 24px; margin: 10px 0; }
            .header p { color: #666; font-size: 14px; margin: 10px 0; }
            .section { margin-bottom: 30px; }
            .section h3 { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
            .info-box { background: #f8f9fa; padding: 20px; border-radius: 8px; }
            .goal-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
            .goal-item:last-child { border-bottom: none; }
            .goal-title { display: flex; align-items: center; gap: 10px; }
            .action-plan { background: #dbeafe; padding: 20px; border-radius: 8px; }
            .footer { text-align: center; border-top: 1px solid #ccc; padding-top: 20px; font-size: 12px; color: #666; }
            .footer p:last-child { color: #ea580c; font-weight: bold; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>SDGs 마켓</h1>
              <h2>실천 영수증</h2>
              <p>${date} ${time}</p>
            </div>
            
            <div class="section">
              <h3>주문자 정보</h3>
              <div class="info-box">
                <p><strong>이름:</strong> ${student.name}</p>
                <p><strong>학교:</strong> ${student.school}</p>
                <p><strong>학년/반:</strong> ${student.grade}학년 ${student.class || ''}</p>
              </div>
            </div>
            
            <div class="section">
              <h3>선택한 SDGs 목표</h3>
              <div>
                ${sdgGoals.map((goal: any) => `
                  <div class="goal-item">
                    <div class="goal-title">
                      <span>${goal.icon}</span>
                      <span>${goal.title}</span>
                    </div>
                    <span>목표 ${goal.id}</span>
                  </div>
                `).join('')}
                <div style="text-align: right; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc;">
                  <strong>총 목표 수: ${sdgGoals.length}개</strong>
                </div>
              </div>
            </div>
            
            ${actionPlan.actionPlanText ? `
              <div class="section">
                <h3>나의 실천계획</h3>
                <div class="action-plan">
                  <p>${actionPlan.actionPlanText}</p>
                </div>
              </div>
            ` : ''}
            
            <div class="footer">
              <p>이 영수증은 여러분의 지속가능발전목표 실천 의지를 나타내는 소중한 증명서입니다.</p>
              <p>함께 만들어가는 더 나은 세상! 🌍</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error('Image generation error:', error);
      res.status(500).json({ error: "Failed to generate receipt image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
