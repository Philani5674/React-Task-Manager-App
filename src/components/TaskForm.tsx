import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types/task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description,
      status: 'backlog',
    });

    setTitle('');
    setDescription('');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Add New Task
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Task</h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={3}
              placeholder="Add a brief description (optional)"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 hover:shadow-md transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
