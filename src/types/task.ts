export type TaskStatus = 'backlog' | 'in-progress' | 'completed' | 'deployed';

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  userId?: string;
}