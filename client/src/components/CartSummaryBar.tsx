import { useCart } from '@/hooks/use-cart';
import { useLocation } from 'wouter';

export default function CartSummaryBar() {
  const { count } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    setLocation('/checkout');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">선택한 목표:</span>
          <span className="font-semibold text-blue-600">{count}개</span>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          실천계획 세우기
        </button>
      </div>
    </div>
  );
}
