import React from 'react';
import { Task, TaskStatus } from '../../types/task';
import { TaskColumn } from '../TaskColumn';
import { useTasks, useTaskStore } from '../../store/useTaskStore';

const COLUMNS = [
  { title: 'Backlog', status: 'backlog' as TaskStatus },
  { title: 'In Progress', status: 'in-progress' as TaskStatus },
  { title: 'Completed', status: 'completed' as TaskStatus },
  { title: 'Deployed', status: 'deployed' as TaskStatus },
];

export function TaskBoard() {
  const {moveTask, tasks} = useTasks();

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {COLUMNS.map(({ title, status }) => (
        <TaskColumn
          key={status}
          title={title}
          status={status}
          tasks={tasks.filter(task => task.status ===status)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}