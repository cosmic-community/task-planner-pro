import { getTasks, getTaskGroups } from '@/lib/cosmic';
import TaskBoard from '@/components/TaskBoard';
import TaskList from '@/components/TaskList';
import GroupFilter from '@/components/GroupFilter';
import ViewToggle from '@/components/ViewToggle';
import EmptyState from '@/components/EmptyState';
import TaskForm from '@/components/TaskForm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [tasks, groups] = await Promise.all([getTasks(), getTaskGroups()]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-500 mt-1">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started with Task Planner Pro."
        />
      ) : (
        <TaskDashboard tasks={tasks} groups={groups} />
      )}
    </div>
  );
}

function TaskDashboard({
  tasks,
  groups,
}: {
  tasks: Awaited<ReturnType<typeof getTasks>>;
  groups: Awaited<ReturnType<typeof getTaskGroups>>;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <GroupFilter groups={groups} />
        <div className="mt-6">
          <TaskForm groups={groups} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <ViewToggle />
        <div className="mt-6">
          <TaskBoard tasks={tasks} groups={groups} />
          <TaskList tasks={tasks} groups={groups} />
        </div>
      </div>
    </div>
  );
}