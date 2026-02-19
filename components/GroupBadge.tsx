import { TaskGroup } from '@/types';

interface GroupBadgeProps {
  group?: TaskGroup;
}

export default function GroupBadge({ group }: GroupBadgeProps) {
  if (!group) return null;

  const color = group.metadata?.color || '#6b7280';

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {group.metadata?.name || group.title}
    </span>
  );
}