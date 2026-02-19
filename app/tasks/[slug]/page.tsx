// app/tasks/[slug]/page.tsx
import { getTaskBySlug, getTaskGroups } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import TaskDetail from '@/components/TaskDetail';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TaskPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [task, groups] = await Promise.all([getTaskBySlug(slug), getTaskGroups()]);

  if (!task) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to tasks
      </Link>
      <TaskDetail task={task} groups={groups} />
    </div>
  );
}