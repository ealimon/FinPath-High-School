export type ModuleStatus = 'DONE' | 'IN_PROGRESS' | 'AVAILABLE';

export interface TutorialSlide {
  title: string;
  subtitle?: string;
  content: string;
  iconName: string;
  keyTakeaway?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WorksheetQuestion {
  id: string;
  prompt: string;
  type: 'fill' | 'calc' | 'reflection';
  placeholder?: string;
  suggestedAnswer?: string;
}

export interface WorksheetData {
  title: string;
  subtitle: string;
  instructions: string;
  scenario: string;
  questions: WorksheetQuestion[];
}

export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  status: ModuleStatus;
  tag: string;
  category: 'Earning' | 'Banking' | 'Budgeting' | 'Credit' | 'College & Loans' | 'Housing & Auto' | 'Investing' | 'Security';
  learningConcepts: string[];
  tutorialSlides: TutorialSlide[];
  gameType: 'paycheck' | 'banking' | 'budget' | 'credit' | 'studentloans' | 'carbuying' | 'renting' | 'compound' | 'scams' | 'freelance';
  quiz: QuizQuestion[];
  worksheet: WorksheetData;
  masteryScore?: number;
}

export interface ReadinessMetric {
  category: string;
  title: string;
  description: string;
  status: 'Mastered' | 'In Progress' | 'Not Started';
  iconName: string;
  keySkills: string[];
}

export interface UserStats {
  completedModulesCount: number;
  totalModulesCount: number;
  readinessPercentage: number;
}

