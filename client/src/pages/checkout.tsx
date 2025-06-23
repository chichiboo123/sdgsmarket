import { useState } from 'react';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/Header';
import DrawingCanvas from '@/components/DrawingCanvas';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const formSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  school: z.string().min(1, '학교명을 입력하세요'),
  grade: z.string().min(1, '학년을 선택하세요'),
  class: z.string().optional(),
  planMethod: z.enum(['text', 'drawing', 'both']),
  actionPlanText: z.string().optional(),
  deliveryMemos: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const deliveryOptions = [
  "빠른 배송 원함",
  "문 앞에 놓아주세요",
  "부재시 연락 바람",
  "직접 연락 필요"
];

export default function Checkout() {
  const { items, count, clearCart } = useCart();
  const { toast } = useToast();
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [drawingData, setDrawingData] = useState<string>('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      school: '',
      grade: '',
      class: '',
      planMethod: 'text',
      actionPlanText: '',
      deliveryMemos: [],
    },
  });

  const planMethod = form.watch('planMethod');

  const onSubmit = async (data: FormData) => {
    try {
      const studentData = {
        name: data.name,
        school: data.school,
        grade: data.grade,
        class: data.class || '',
      };

      const actionPlanData = {
        sdgGoals: items.map(item => item.id),
        planMethod: data.planMethod,
        actionPlanText: data.actionPlanText || '',
        drawingData: drawingData,
        deliveryMemos: data.deliveryMemos || [],
      };

      // Create student
      const studentResponse = await apiRequest('POST', '/api/students', studentData);
      const student = await studentResponse.json();

      // Create action plan
      const actionPlanResponse = await apiRequest('POST', '/api/action-plans', {
        ...actionPlanData,
        studentId: student.id,
      });
      const actionPlan = await actionPlanResponse.json();

      setReceiptData({
        student,
        actionPlan,
        sdgGoals: items,
        date: new Date().toLocaleDateString('ko-KR'),
        time: new Date().toLocaleTimeString('ko-KR'),
      });

      setShowReceipt(true);

      toast({
        title: "실천계획이 저장되었습니다!",
        description: "영수증을 확인하고 다운로드하세요.",
      });
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

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

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    clearCart();
  };

  if (count === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">선택한 목표가 없습니다.</p>
              <Link href="/">
                <Button className="mt-4">목표 선택하러 가기</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                장바구니로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">실천계획 세우기</h1>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Student Information */}
            <Card>
              <CardHeader>
                <CardTitle>학생 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름 *</FormLabel>
                        <FormControl>
                          <Input placeholder="이름을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>배송지</FormLabel>
                        <FormControl>
                          <Input placeholder="배송지를 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>학년 *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="학년 선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1학년</SelectItem>
                            <SelectItem value="2">2학년</SelectItem>
                            <SelectItem value="3">3학년</SelectItem>
                            <SelectItem value="4">4학년</SelectItem>
                            <SelectItem value="5">5학년</SelectItem>
                            <SelectItem value="6">6학년</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>반</FormLabel>
                        <FormControl>
                          <Input placeholder="반을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle>배송 메모(선택)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">배송지</label>
                  <Input value="학교" readOnly className="bg-gray-50" />
                </div>
                <FormField
                  control={form.control}
                  name="deliveryMemos"
                  render={() => (
                    <FormItem>
                      <FormLabel>배송 메모</FormLabel>
                      <div className="space-y-2">
                        {deliveryOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="deliveryMemos"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, option]);
                                      } else {
                                        field.onChange(value.filter((v) => v !== option));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {option}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Action Plan */}
            <Card>
              <CardHeader>
                <CardTitle>실천계획 입력</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="planMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>실천계획 방법 선택</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="text" id="text" />
                            <label htmlFor="text" className="text-sm">글로 작성</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="drawing" id="drawing" />
                            <label htmlFor="drawing" className="text-sm">그림으로 작성</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both" />
                            <label htmlFor="both" className="text-sm">글과 그림 모두</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {(planMethod === 'text' || planMethod === 'both') && (
                  <FormField
                    control={form.control}
                    name="actionPlanText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>나의 실천계획</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="선택한 SDGs 목표를 위해 어떤 실천을 할 것인지 구체적으로 작성해보세요."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {(planMethod === 'drawing' || planMethod === 'both') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      그림으로 실천계획 그리기
                    </label>
                    <DrawingCanvas onDrawingChange={setDrawingData} />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Link href="/cart">
                <Button variant="outline">취소</Button>
              </Link>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                실천 영수증 생성
              </Button>
            </div>
          </form>
        </Form>

        {/* Receipt Modal */}
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>실천 영수증</DialogTitle>
            </DialogHeader>

            {receiptData && (
              <div className="space-y-6">
                <div className="bg-white p-8 border-2 border-dashed border-gray-300 rounded-lg">
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
                      {receiptData.sdgGoals.map((goal: any, index: number) => (
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

                <div className="flex justify-center space-x-4">
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
                  <Button onClick={handleCloseReceipt}>
                    완료
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}