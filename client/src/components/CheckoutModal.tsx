import { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DrawingCanvas from '@/components/DrawingCanvas';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
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

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReceiptGenerated: (receiptData: any) => void;
}

export default function CheckoutModal({ open, onOpenChange, onReceiptGenerated }: CheckoutModalProps) {
  const { items, count } = useCart();
  const { toast } = useToast();
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

      const receiptData = {
        student,
        actionPlan,
        sdgGoals: items,
        date: new Date().toLocaleDateString('ko-KR'),
        time: new Date().toLocaleTimeString('ko-KR'),
      };

      onReceiptGenerated(receiptData);
      onOpenChange(false);

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

  if (count === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>알림</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-500">선택한 목표가 없습니다.</p>
            <Button className="mt-4" onClick={() => onOpenChange(false)}>
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">실천계획 세우기</DialogTitle>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Information */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">학생 정보</h4>
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
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">배송지 정보</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">배송지</label>
                    <Input value="학교" readOnly className="bg-gray-100" />
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
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">실천계획 입력</h4>
                <div className="space-y-4">
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
                            className="flex space-x-4"
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
                              rows={4}
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
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  취소
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  실천 영수증 생성
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}