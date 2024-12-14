import React from 'react';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/layout/Header';
import { TaskBoard } from './components/tasks/TaskBoard';
import { TaskForm } from './components/TaskForm';
import { Task } from './types/task';
import { useTaskStore } from './store/useTaskStore';

function App() {
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center max-w-lg">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Welcome to Task Management
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                Stay organized, focused, and productive with our simple task management system. Sign in to get started!
              </p>
              <button
                onClick={signInWithGoogle}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform duration-300 hover:scale-105"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        ) : (
          <>
            <TaskForm
              onAddTask={function (task: Omit<Task, 'id' | 'createdAt'>): void {
                useTaskStore.getState().addTask({ ...task, userId: user?.id });
              }}
            />
            <TaskBoard />
          </>
        )}
      </main>

      <footer className="bg-indigo-600 text-white py-4">
        <div className="text-center text-sm">
          Built by <span className="font-semibold">Philani Ngcamu, First React Project</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
