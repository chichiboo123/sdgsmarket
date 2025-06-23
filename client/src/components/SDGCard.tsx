import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { SDGGoal } from '@/lib/sdgData';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface SDGCardProps {
  goal: SDGGoal;
}

export default function SDGCard({ goal }: SDGCardProps) {
  const { addItem, isItemInCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAddToCart = () => {
    if (!isItemInCart(goal.id)) {
      addItem(goal);
      toast({
        title: "목표 선택됨",
        description: `"${goal.title}" 목표가 선택되었습니다!`,
      });
    }
  };

  const handleQuickPurchase = () => {
    if (!isItemInCart(goal.id)) {
      addItem(goal);
    }
    setLocation('/checkout');
  };

  return (
    <div className="sdg-card">
      <div 
        className="h-32 flex items-center justify-center text-4xl"
        style={{ backgroundColor: `${goal.color}20` }}
      >
        <span className="text-6xl">{goal.icon}</span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span 
            className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full"
            style={{ backgroundColor: goal.color }}
          >
            목표 {goal.id}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2">{goal.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{goal.subtitle}</p>
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={isItemInCart(goal.id)}
            className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="inline w-4 h-4 mr-1" />
            {isItemInCart(goal.id) ? '선택됨' : '선택하기'}
          </button>
          <button
            onClick={handleQuickPurchase}
            className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            <Zap className="inline w-4 h-4 mr-1" />
            바로실천
          </button>
        </div>
      </div>
    </div>
  );
}
