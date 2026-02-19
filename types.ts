// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
}

// Select dropdown field shape from Cosmic API
export interface SelectDropdownField {
  key: string;
  value: string;
}

// File attachment from Cosmic
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Task Group interface
export interface TaskGroup extends CosmicObject {
  type: 'task-groups';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Task interface
export interface Task extends CosmicObject {
  type: 'tasks';
  metadata: {
    description: string;
    deadline: string;
    status_field: SelectDropdownField;
    priority?: SelectDropdownField;
    group?: TaskGroup;
    attachments?: CosmicFile[] | null;
    created_at?: string;
  };
}

// Status type literals matching content model exactly
export type TaskStatusValue = 'To Do' | 'In Progress' | 'Done';
export type TaskStatusKey = 'todo' | 'in_progress' | 'done';

// Priority type literals matching content model exactly
export type TaskPriorityValue = 'Low' | 'Medium' | 'High';
export type TaskPriorityKey = 'low' | 'medium' | 'high';

// Form data for creating/updating tasks
export interface TaskFormData {
  title: string;
  description: string;
  deadline: string;
  status_field: TaskStatusValue;
  priority: TaskPriorityValue;
  group: string; // group object ID
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Status column definitions for board view
export interface StatusColumn {
  key: TaskStatusKey;
  value: TaskStatusValue;
  color: string;
  bgColor: string;
}

// Helper for error checking
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}