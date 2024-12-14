import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import { Task, TaskStatus } from '../types/task';
import React from 'react';
import { useAuthStore } from './useAuthStore';

const supabaseUrl = 'https://qupdwyxjircerzphfhcc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cGR3eXhqaXJjZXJ6cGhmaGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMDk0NjMsImV4cCI6MjA0OTc4NTQ2M30.68YiSEKyEcp5SWdF9IrRCWh5fhXsl53lUssIqjmu8lc';

if (!supabaseKey) {
  throw new Error('Missing Supabase key. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}
const supabase = createClient(supabaseUrl, supabaseKey);

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  moveTask: (taskId: string, status: TaskStatus) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  
  fetchTasks: async () => {
    const userId = useAuthStore.getState().user?.id;
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('Tasks')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false });

      if (error) throw error;

      set({ 
        tasks: data || [], 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch tasks', 
        isLoading: false 
      });
    }
  },

  // Add a new task to Supabase
  addTask: async (newTask) => {
    set({ isLoading: true, error: null });
    try {
      // Prepare task for insertion
      const taskToInsert:Task = {
        ...newTask,
      };

      const { data, error } = await supabase
        .from('Tasks')
        .insert(taskToInsert)
        .select()
        .single();

      if (error) throw error;

      // Update local state with the inserted task
      set((state) => ({
        tasks: [data, ...state.tasks],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add task', 
        isLoading: false 
      });
    }
  },

  // Move a task to a different status in Supabase
  moveTask: async (taskId, status) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('Tasks')
        .update({ status })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      const userId = useAuthStore.getState().user?.id;
      const { data: updatedTasks, error: fetchError } = await supabase
        .from('Tasks')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false });

      if (fetchError) throw fetchError;

      set({
        tasks: updatedTasks || [],
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to move task', 
        isLoading: false 
      });
    }
  },

  // Delete a task from Supabase
  deleteTask: async (taskId) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('Tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      // Remove task from local state
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete task', 
        isLoading: false 
      });
    }
  }
}));

// Helper hook for component usage
export function useTasks() {
  const store = useTaskStore();
  
  // Fetch tasks on first use
  React.useEffect(() => {
    store.fetchTasks();
  }, []);

  return store;
}