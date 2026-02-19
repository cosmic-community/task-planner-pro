'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task, TaskGroup, TaskStatusValue, TaskPriorityValue } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import GroupBadge from '@/components/GroupBadge';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface TaskDetailProps {
  task: Task;
  groups: TaskGroup[];
}

const statusOptions: TaskStatusValue[] = ['To Do', 'In Progress', 'Done'];
const priorityOptions: TaskPriorityValue[] = ['Low', 'Medium', 'High'];

export default function TaskDetail({ task, groups }: TaskDetailProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.metadata.description);
  const [deadline, setDeadline] = useState(task.metadata.deadline);
  const [status, setStatus] = useState<TaskStatusValue>(task.metadata.status_field.value as TaskStatusValue);
  const [priority, setPriority] = useState<TaskPriorityValue>(
    (task.metadata.priority?.value as TaskPriorityValue) || 'Medium'
  );
  const [groupId, setGroupId] = useState(task.metadata.group?.id || '');

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          deadline,
          status_field: status,
          priority,
          group: groupId || '',
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update task');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        alert('Failed to delete task');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const deadlineDate = new Date(task.metadata.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const createdDate = task.metadata.created_at
    ? new Date(task.metadata.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  const attachments = task.metadata.attachments || [];

  return (
    <div className="max-w-3xl">
      {isConfirmingDelete && (
        <DeleteConfirmDialog
          title={task.title}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-bold text-gray-900 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              ) : (
                <h1 className="text-xl font-bold text-gray-900">{task.title}</h1>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <StatusBadge status={task.metadata.status_field} />
                <PriorityBadge priority={task.metadata.priority} />
                <GroupBadge group={task.metadata.group} />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setTitle(task.title);
                      setDescription(task.metadata.description);
                      setDeadline(task.metadata.deadline);
                      setStatus(task.metadata.status_field.value as TaskStatusValue);
                      setPriority((task.metadata.priority?.value as TaskPriorityValue) || 'Medium');
                      setGroupId(task.metadata.group?.id || '');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => setIsConfirmingDelete(true)}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Edit Fields */}
        {isEditing && (
          <div className="p-6 bg-gray-50 border-b border-gray-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatusValue)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriorityValue)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {priorityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Group</label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">No group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.metadata?.name || group.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Description
          </h2>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-y font-mono"
              placeholder="Markdown supported..."
            />
          ) : (
            <div className="text-gray-700">
              <MarkdownRenderer content={task.metadata.description} />
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Deadline:</span>{' '}
              <span className="font-medium text-gray-900">{formattedDeadline}</span>
            </div>
            {createdDate && (
              <div>
                <span className="text-gray-500">Created:</span>{' '}
                <span className="font-medium text-gray-900">{createdDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Attachments ({attachments.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {attachments.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-video rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <img
                    src={`${file.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={`Attachment ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={300}
                    height={200}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}