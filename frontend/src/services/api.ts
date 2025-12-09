import { LearningModule, UserProgress, CodeSubmission } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const modulesAPI = {
  getAll: async (): Promise<LearningModule[]> => {
    const response = await fetch(`${API_BASE_URL}/modules`);
    if (!response.ok) throw new Error('Failed to fetch modules');
    return response.json();
  },

  getById: async (id: number): Promise<LearningModule> => {
    const response = await fetch(`${API_BASE_URL}/modules/${id}`);
    if (!response.ok) throw new Error('Failed to fetch module');
    return response.json();
  },

  getByCategory: async (category: string): Promise<LearningModule[]> => {
    const response = await fetch(`${API_BASE_URL}/modules/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch modules by category');
    return response.json();
  },

  create: async (module: Partial<LearningModule>): Promise<LearningModule> => {
    const response = await fetch(`${API_BASE_URL}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(module),
    });
    if (!response.ok) throw new Error('Failed to create module');
    return response.json();
  },
};

export const progressAPI = {
  getUserProgress: async (userId: string): Promise<UserProgress[]> => {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user progress');
    return response.json();
  },

  getModuleProgress: async (userId: string, moduleId: number): Promise<UserProgress> => {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}/module/${moduleId}`);
    if (!response.ok) throw new Error('Failed to fetch module progress');
    return response.json();
  },

  saveProgress: async (progress: Partial<UserProgress>): Promise<UserProgress> => {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress),
    });
    if (!response.ok) throw new Error('Failed to save progress');
    return response.json();
  },
};

export const sandboxAPI = {
  submitCode: async (submission: Partial<CodeSubmission>): Promise<CodeSubmission> => {
    const response = await fetch(`${API_BASE_URL}/sandbox/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error('Failed to submit code');
    return response.json();
  },

  getUserSubmissions: async (userId: string): Promise<CodeSubmission[]> => {
    const response = await fetch(`${API_BASE_URL}/sandbox/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user submissions');
    return response.json();
  },
};
