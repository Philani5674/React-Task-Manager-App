import React from 'react';
import { Task, TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}: TaskColumnProps) {
  return (
    <div
      className="flex flex-col bg-white shadow-lg rounded-xl p-5 min-w-[300px] border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
        {title}
      </h2>
      <div className="flex flex-col space-y-4 overflow-y-auto">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
          ))}
        {tasks.filter((task) => task.status === status).length === 0 && (
          <p className="text-gray-400 text-sm text-center italic">
            No tasks here.
          </p>
        )}
      </div>
    </div>
  );
}
