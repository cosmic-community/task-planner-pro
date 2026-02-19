import { createBucketClient } from '@cosmicjs/sdk';
import { Task, TaskGroup, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tasks' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    const tasks = response.objects as Task[];

    // Sort by deadline (earliest first)
    return tasks.sort((a, b) => {
      const dateA = new Date(a.metadata.deadline).getTime();
      const dateB = new Date(b.metadata.deadline).getTime();
      return dateA - dateB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tasks');
  }
}

export async function getTaskBySlug(slug: string): Promise<Task | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'tasks',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.object as Task;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch task');
  }
}

export async function getTaskGroups(): Promise<TaskGroup[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'task-groups' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return response.objects as TaskGroup[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch task groups');
  }
}