import { Download, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: any;
  onComplete?: () => void;
}

export default function ReceiptModal({ open, onOpenChange, receiptData, onComplete }: ReceiptModalProps) {
  const { toast } = useToast();

  const handleDownloadReceipt = async () => {
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
        title: "다운로드 완료",
        description: "영수증이 다운로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handlePrintReceipt = () => {
    window.print();
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
          <div className="bg-white p-8 border-2 border-dashed border-gray-300 rounded-lg mb-6">
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
            
            {receiptData.actionPlan.actionPlanText && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">나의 실천계획</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{receiptData.actionPlan.actionPlanText}</p>
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
            <Button variant="outline" onClick={handlePrintReceipt}>
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
