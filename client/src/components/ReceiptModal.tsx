
import { Download, Printer, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: any;
  onComplete?: () => void;
}

export default function ReceiptModal({ open, onOpenChange, receiptData, onComplete }: ReceiptModalProps) {
  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    try {
      const response = await apiRequest('POST', '/api/generate-receipt', receiptData);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'sdg-receipt.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "PDF 다운로드 완료",
        description: "영수증 PDF가 다운로드되었습니다.",
      });
    } catch (error) {
      console.error('PDF download error:', error);
      toast({
        title: "PDF 다운로드 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadJPG = async () => {
    try {
      if (!receiptRef.current) return;
      
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = 'sdg-receipt.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "JPG 다운로드 완료",
        description: "영수증 이미지가 다운로드되었습니다.",
      });
    } catch (error) {
      console.error('JPG download error:', error);
      toast({
        title: "JPG 다운로드 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      
      const receiptElement = receiptRef.current;
      if (!receiptElement) return;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>SDGs 마켓 실천 영수증</title>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
            body { 
              font-family: 'Noto Sans KR', sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: white; 
              color: black;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${receiptElement.innerHTML}
        </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
      }, 250);
      
      toast({
        title: "인쇄 준비 완료",
        description: "인쇄 창이 열렸습니다.",
      });
    } catch (error) {
      console.error('Print error:', error);
      toast({
        title: "인쇄 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleComplete = () => {
    onOpenChange(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!receiptData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">실천 영수증</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <div ref={receiptRef} className="bg-white p-8 border-2 border-dashed border-gray-300 rounded-lg mb-6">
            <div className="text-center border-b border-gray-300 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">SDGs 마켓</h2>
              <p className="text-lg font-semibold">실천 영수증</p>
              <p className="text-sm text-gray-600">{receiptData.date} {receiptData.time}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">주문자 정보</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                <p><span className="font-medium">이름:</span> {receiptData.student.name}</p>
                <p><span className="font-medium">학교:</span> {receiptData.student.school}</p>
                <p><span className="font-medium">학년/반:</span> {receiptData.student.grade}학년 {receiptData.student.class}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">선택한 SDGs 목표</h3>
              <div className="space-y-2">
                {receiptData.sdgGoals.map((goal: any) => (
                  <div key={goal.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span>{goal.icon}</span>
                      <span>{goal.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">목표 {goal.id}</span>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4 pt-4 border-t border-gray-300">
                <p className="font-bold">총 목표 수: {receiptData.sdgGoals.length}개</p>
              </div>
            </div>
            
            {(receiptData.actionPlan.actionPlanText || receiptData.actionPlan.drawingData) && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">나의 실천계획</h3>
                {receiptData.actionPlan.actionPlanText && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="whitespace-pre-wrap">{receiptData.actionPlan.actionPlanText}</p>
                  </div>
                )}
                {receiptData.actionPlan.drawingData && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">그림으로 그린 실천계획:</p>
                    <img src={receiptData.actionPlan.drawingData} alt="실천계획 그림" className="max-w-full h-auto border border-gray-200 rounded" />
                  </div>
                )}
              </div>
            )}
            
            <div className="text-center border-t border-gray-300 pt-4 text-sm text-gray-600">
              <p>이 영수증은 여러분의 지속가능발전목표 실천 의지를 나타내는 소중한 증명서입니다.</p>
              <p className="mt-2 font-semibold text-orange-500">함께 만들어가는 더 나은 세상! 🌍</p>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mb-4">
            <Button onClick={handleDownloadJPG} className="bg-green-500 hover:bg-green-600">
              <Image className="w-4 h-4 mr-2" />
              JPG 다운로드
            </Button>
            <Button onClick={handleDownloadPDF} className="bg-red-500 hover:bg-red-600">
              <Download className="w-4 h-4 mr-2" />
              PDF 다운로드
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              인쇄하기
            </Button>
          </div>

          <div className="text-center">
            <Button onClick={handleComplete} size="lg">
              완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
