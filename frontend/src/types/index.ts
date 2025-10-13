export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  studyStreak: number;
  totalStudyTime: number;
}

export interface StudySession {
  id: string;
  title: string;
  duration: number;
  date: string;
  subject: string;
  score?: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: string;
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}