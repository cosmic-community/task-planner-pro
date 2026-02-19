import { SelectDropdownField } from '@/types';

interface PriorityBadgeProps {
  priority?: SelectDropdownField;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (!priority) return null;

  const colorMap: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  const colors = colorMap[priority.value] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors}`}
    >
      {priority.value}
    </span>
  );
}