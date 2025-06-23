import { Trash2, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Cart() {
  const { items, removeItem, count } = useCart();
  const [, setLocation] = useLocation();

  const handleProceedToCheckout = () => {
    setLocation('/checkout');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">선택한 SDGs 목표</h1>
          </div>
        </div>

        {count === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">선택한 목표가 없습니다.</p>
              <Link href="/">
                <Button className="mt-4">목표 선택하러 가기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((goal) => (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${goal.color}20` }}
                        >
                          <span className="text-2xl">{goal.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-600">목표 {goal.id}</p>
                          <p className="text-sm text-gray-500 mt-1">{goal.subtitle}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(goal.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
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
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
