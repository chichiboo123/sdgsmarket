// GitHub Pages용 로컬 스토리지 기반 API 모킹
import type { Student, ActionPlan, InsertStudent, InsertActionPlan } from '@shared/schema';

// 로컬 스토리지 키
const STORAGE_KEYS = {
  STUDENTS: 'sdg_students',
  ACTION_PLANS: 'sdg_action_plans',
  COUNTERS: 'sdg_counters'
};

// ID 생성을 위한 카운터
function getNextId(type: 'student' | 'actionPlan'): number {
  const counters = JSON.parse(localStorage.getItem(STORAGE_KEYS.COUNTERS) || '{}');
  const nextId = (counters[type] || 0) + 1;
  counters[type] = nextId;
  localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(counters));
  return nextId;
}

// 학생 생성
export async function createStudent(insertStudent: InsertStudent): Promise<Student> {
  const student: Student = {
    ...insertStudent,
    id: getNextId('student'),
    createdAt: new Date()
  };

  const students = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || '[]');
  students.push(student);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));

  return student;
}

// 액션 플랜 생성
export async function createActionPlan(insertActionPlan: InsertActionPlan): Promise<ActionPlan> {
  const actionPlan: ActionPlan = {
    ...insertActionPlan,
    id: getNextId('actionPlan'),
    createdAt: new Date()
  };

  const actionPlans = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTION_PLANS) || '[]');
  actionPlans.push(actionPlan);
  localStorage.setItem(STORAGE_KEYS.ACTION_PLANS, JSON.stringify(actionPlans));

  return actionPlan;
}

// 액션 플랜 조회
export async function getActionPlan(id: number): Promise<ActionPlan | undefined> {
  const actionPlans = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTION_PLANS) || '[]');
  return actionPlans.find((plan: ActionPlan) => plan.id === id);
}

// 모든 액션 플랜 조회
export async function getAllActionPlans(): Promise<ActionPlan[]> {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTION_PLANS) || '[]');
}

// 특정 학생의 액션 플랜 조회
export async function getActionPlansByStudent(studentId: number): Promise<ActionPlan[]> {
  const actionPlans = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTION_PLANS) || '[]');
  return actionPlans.filter((plan: ActionPlan) => plan.studentId === studentId);
}

// 로컬 데이터 초기화 (개발/테스트용)
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  localStorage.removeItem(STORAGE_KEYS.ACTION_PLANS);
  localStorage.removeItem(STORAGE_KEYS.COUNTERS);
}