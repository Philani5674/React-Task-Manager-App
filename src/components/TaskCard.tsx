import React from 'react';
import { Clock, FileText, MoreVertical, CheckCircle2 } from 'lucide-react';

// Updated type definition
export type TaskStatus = 'backlog' | 'in-progress' | 'completed' | 'deployed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const getStatusColor = () => {
    switch (task.status) {
      case 'backlog': return 'bg-gray-50 text-gray-600';
      case 'in-progress': return 'bg-yellow-50 text-yellow-600';
      case 'completed': return 'bg-green-50 text-green-600';
      case 'deployed': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task?.id)}
      className="group relative bg-white rounded-xl shadow-sm border border-gray-200 cursor-move 
        hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 
        overflow-hidden"
    >
      {/* Card Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
            {task.title}
          </h3>
          <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-gray-500 text-sm line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center">
          {/* Metadata */}
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">
                {new Date(task?.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getStatusColor()}`}>
              <FileText className="w-3 h-3" />
              <span className="text-xs capitalize">
                {task.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          {task.status === 'completed' && (
            <CheckCircle2 className="text-green-500 w-5 h-5" />
          )}
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 w-full h-1 ${getStatusColor()}`}></div>
    </div>
  );
}