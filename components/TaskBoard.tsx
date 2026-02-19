'use client';

import { Task, TaskGroup, StatusColumn } from '@/types';
import TaskCard from '@/components/TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  groups: TaskGroup[];
}

const columns: StatusColumn[] = [
  { key: 'todo', value: 'To Do', color: 'text-slate-700', bgColor: 'bg-slate-50' },
  { key: 'in_progress', value: 'In Progress', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  { key: 'done', value: 'Done', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
];

export default function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <div id="board-view" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.metadata.status_field.key === column.key
        );

        return (
          <div key={column.key} className="flex flex-col">
            <div
              className={`flex items-center justify-between px-3 py-2 rounded-lg mb-4 ${column.bgColor}`}
            >
              <h2 className={`text-sm font-semibold ${column.color}`}>
                {column.value}
              </h2>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${column.bgColor} ${column.color}`}
              >
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} variant="board" />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}