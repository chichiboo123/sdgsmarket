import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CompletionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartOver: () => void;
}

export default function CompletionModal({ open, onOpenChange, onStartOver }: CompletionModalProps) {
  const handleStartOver = () => {
    onStartOver();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-green-600 mb-4">
            환영합니다!
          </DialogTitle>
        </DialogHeader>

        <div className="text-center p-6 space-y-4">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-800">
              SDGs 구입을 축하합니다!
            </p>
            <p className="text-gray-700">
              당신의 선택이 지구를 위한 첫걸음이 되었어요.
            </p>
            <p className="text-gray-700">
              작은 실천이 모여 큰 변화를 만들어냅니다.
            </p>
            <p className="text-gray-700 font-medium">
              함께 만드는 더 나은 세상, 지금 시작해요!
            </p>
          </div>

          <div className="pt-6">
            <Button 
              onClick={handleStartOver}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              처음으로
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}