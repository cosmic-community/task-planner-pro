'use client';

import { Task, TaskGroup } from '@/types';
import TaskCard from '@/components/TaskCard';

interface TaskListProps {
  tasks: Task[];
  groups: TaskGroup[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div id="list-view" className="hidden">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex-1">Task</div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="w-16 text-center">Priority</span>
            <span className="w-24 text-center">Status</span>
            <span className="w-24 text-center">Deadline</span>
            <span className="w-8" />
          </div>
        </div>
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} variant="list" />
          ))
        )}
      </div>
    </div>
  );
}