'use client';

import Link from 'next/link';
import { Task } from '@/types';
import PriorityBadge from '@/components/PriorityBadge';
import StatusBadge from '@/components/StatusBadge';
import GroupBadge from '@/components/GroupBadge';

interface TaskCardProps {
  task: Task;
  variant?: 'board' | 'list';
}

export default function TaskCard({ task, variant = 'board' }: TaskCardProps) {
  const deadline = new Date(task.metadata.deadline);
  const now = new Date();
  const isOverdue = deadline < now && task.metadata.status_field.key !== 'done';
  const isUpcoming =
    !isOverdue &&
    deadline.getTime() - now.getTime() < 3 * 24 * 60 * 60 * 1000 &&
    task.metadata.status_field.key !== 'done';

  const attachmentCount = task.metadata.attachments?.length || 0;

  const formattedDeadline = deadline.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const createdDate = task.metadata.created_at
    ? new Date(task.metadata.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  if (variant === 'list') {
    return (
      <Link
        href={`/tasks/${task.slug}`}
        className="flex items-center gap-4 px-4 py-3 bg-white hover:bg-gray-50 border-b border-gray-100 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <GroupBadge group={task.metadata.group} />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <PriorityBadge priority={task.metadata.priority} />
          <StatusBadge status={task.metadata.status_field} />
          <span
            className={`text-xs font-medium ${
              isOverdue
                ? 'text-red-600'
                : isUpcoming
                  ? 'text-amber-600'
                  : 'text-gray-500'
            }`}
          >
            {formattedDeadline}
          </span>
          {attachmentCount > 0 && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              {attachmentCount}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/tasks/${task.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 task-card-hover"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {task.title}
        </h3>
        <PriorityBadge priority={task.metadata.priority} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <GroupBadge group={task.metadata.group} />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span
          className={`font-medium flex items-center gap-1 ${
            isOverdue
              ? 'text-red-600'
              : isUpcoming
                ? 'text-amber-600'
                : 'text-gray-500'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formattedDeadline}
        </span>

        <div className="flex items-center gap-2">
          {attachmentCount > 0 && (
            <span className="text-gray-400 flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              {attachmentCount}
            </span>
          )}
          {createdDate && (
            <span className="text-gray-400">Added {createdDate}</span>
          )}
        </div>
      </div>
    </Link>
  );
}