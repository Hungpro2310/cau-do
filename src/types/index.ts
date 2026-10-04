export interface GroupScore {
  id: number;
  name: string;
  avatar: string;
  color: string;
  score: number;
  buzzTime: number | null;
  notes: string[];
}

export interface DecryptClue {
  id: number;
  title: string;
  subtitle: string;
  codePrompt: string;
  hint: string;
  iconType: 'history' | 'hands' | 'mother' | 'diamond';
  imagePlaceholderDesc: string;
  answer: string;
  explanation: string;
  quote?: string;
  timeLimit: number;
}

export interface TimeStation {
  id: number;
  stageName: string;
  timeRange: string;
  title: string;
  theme: string;
  keyPoints: string[];
  historicalContext: string;
  pharmaImpact: string;
  quote?: {
    text: string;
    author: string;
    source: string;
  };
  discussionQuestion?: {
    question: string;
    context: string;
    hints: string[];
    teacherAnswerKey: string;
  };
}

export interface DebateScenario {
  id: number;
  assignedGroups: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  currentReality: string;
  taskPrompt: string;
  guidingQuestions: string[];
  teacherProvocations: string[]; // Câu hỏi xoáy châm ngòi
  suggestedArguments: {
    title: string;
    points: string[];
  }[];
}

export interface CorePrinciple {
  number: number;
  title: string;
  detail: string;
  pharmaRelevance: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
