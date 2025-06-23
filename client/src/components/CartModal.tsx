import { Trash2, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToCheckout: () => void;
}

export default function CartModal({ open, onOpenChange, onProceedToCheckout }: CartModalProps) {
  const { items, removeItem, count } = useCart();

  const handleProceedToCheckout = () => {
    onProceedToCheckout();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">선택한 SDGs 목표</DialogTitle>
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
          {count === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">선택한 목표가 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${goal.color}20` }}
                      >
                        <span className="text-xl">{goal.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{goal.title}</h4>
                        <p className="text-sm text-gray-600">목표 {goal.id}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(goal.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">총 선택한 목표:</span>
                  <span className="text-lg font-bold text-orange-500">{count}개</span>
                </div>
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  size="lg"
                >
                  실천계획 입력하기
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
