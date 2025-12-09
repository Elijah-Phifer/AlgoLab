export interface LearningModule {
  id: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
  content: string;
  topics: string[];
  createdDate: string;
  lastModified: string;
  hasBlocklyWorkspace: boolean;
  blocklyXml?: string;
}

export interface UserProgress {
  id: number;
  userId: string;
  moduleId: number;
  isCompleted: boolean;
  progressPercentage: number;
  lastAccessed: string;
  savedBlocklyXml?: string;
}

export interface CodeSubmission {
  id: number;
  userId: string;
  moduleId: number;
  blocklyXml: string;
  generatedCode: string;
  submittedDate: string;
  isSuccessful: boolean;
  feedbackMessage?: string;
}
