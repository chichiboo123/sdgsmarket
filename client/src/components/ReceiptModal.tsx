import { Download, X, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import CompletionModal from './CompletionModal';

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: any;
  onComplete?: () => void;
}

export default function ReceiptModal({ open, onOpenChange, receiptData, onComplete }: ReceiptModalProps) {
  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false
      });
      
      const link = document.createElement('a');
      link.download = 'sdg-receipt.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handlePrintReceipt = () => {
    if (!receiptRef.current) return;
    
    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "인쇄 실패",
        description: "팝업이 차단되었습니다. 팝업을 허용해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>SDGs 실천 영수증</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 20px; 
              line-height: 1.6;
            }
            .bg-white { background-color: white !important; }
            .bg-gray-50 { background-color: #f9fafb !important; }
            .bg-blue-50 { background-color: #eff6ff !important; }
            .border-2 { border: 2px solid #d1d5db !important; }
            .border-dashed { border-style: dashed !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            .border-gray-200 { border-color: #e5e7eb !important; }
            .rounded-lg { border-radius: 8px !important; }
            .p-8 { padding: 32px !important; }
            .p-4 { padding: 16px !important; }
            .mb-6 { margin-bottom: 24px !important; }
            .mb-4 { margin-bottom: 16px !important; }
            .mb-3 { margin-bottom: 12px !important; }
            .mb-2 { margin-bottom: 8px !important; }
            .mt-4 { margin-top: 16px !important; }
            .mt-2 { margin-top: 8px !important; }
            .pt-4 { padding-top: 16px !important; }
            .pb-4 { padding-bottom: 16px !important; }
            .py-2 { padding-top: 8px !important; padding-bottom: 8px !important; }
            .space-y-1 > * + * { margin-top: 4px !important; }
            .space-y-2 > * + * { margin-top: 8px !important; }
            .space-y-4 > * + * { margin-top: 16px !important; }
            .text-center { text-align: center !important; }
            .text-right { text-align: right !important; }
            .text-2xl { font-size: 24px !important; }
            .text-lg { font-size: 18px !important; }
            .text-sm { font-size: 14px !important; }
            .font-bold { font-weight: bold !important; }
            .font-semibold { font-weight: 600 !important; }
            .font-medium { font-weight: 500 !important; }
            .text-blue-600 { color: #2563eb !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-orange-500 { color: #f97316 !important; }
            .border-b { border-bottom: 1px solid #e5e7eb !important; }
            .border-t { border-top: 1px solid #e5e7eb !important; }
            .border-l-4 { border-left: 4px solid !important; }
            .flex { display: flex !important; }
            .items-center { align-items: center !important; }
            .justify-between { justify-content: space-between !important; }
            .space-x-2 > * + * { margin-left: 8px !important; }
            .whitespace-pre-wrap { white-space: pre-wrap !important; }
            .max-w-full { max-width: 100% !important; }
            .h-auto { height: auto !important; }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleComplete = () => {
    setShowCompletion(true);
  };

  const handleStartOver = () => {
    onOpenChange(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!receiptData) {
    return null;
  }

  return (
    <>
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
              
              {receiptData.actionPlan.paymentMethod && receiptData.actionPlan.paymentMethod.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">선택한 결제수단(실천방식)</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      {receiptData.actionPlan.paymentMethod.map((method: string) => {
                        const methodInfo = {
                          think: { label: "생각하기", emoji: "🤔" },
                          empathize: { label: "공감하기", emoji: "💝" },
                          action: { label: "행동하기", emoji: "🚀" }
                        }[method];
                        return methodInfo ? (
                          <div key={method} className="flex items-center space-x-2">
                            <span>{methodInfo.emoji}</span>
                            <span>{methodInfo.label}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {(receiptData.actionPlan.actionPlanText || receiptData.actionPlan.drawingData) && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">나의 실천계획</h3>
                  <div className="space-y-4">
                    {receiptData.actionPlan.actionPlanText && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="whitespace-pre-wrap">{receiptData.actionPlan.actionPlanText}</p>
                      </div>
                    )}
                    {receiptData.actionPlan.drawingData && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">그림으로 표현한 실천계획</h4>
                        <img 
                          src={receiptData.actionPlan.drawingData} 
                          alt="실천계획 그림" 
                          className="max-w-full h-auto border border-gray-200 rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="text-center border-t border-gray-300 pt-4 text-sm text-gray-600">
                <p>이 영수증은 여러분의 지속가능발전목표 실천 의지를 나타내는 소중한 증명서입니다.</p>
                <p className="mt-2 font-semibold text-orange-500">함께 만들어가는 더 나은 세상! 🌍</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-4">
              <Button onClick={handleDownloadReceipt} className="bg-orange-500 hover:bg-orange-600">
                <Download className="w-4 h-4 mr-2" />
                영수증 다운로드
              </Button>
              <Button onClick={handlePrintReceipt} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
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

      <CompletionModal 
        open={showCompletion}
        onOpenChange={setShowCompletion}
        onStartOver={handleStartOver}
      />
    </>
  );
}