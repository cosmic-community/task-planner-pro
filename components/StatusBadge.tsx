import { SelectDropdownField } from '@/types';

interface StatusBadgeProps {
  status: SelectDropdownField;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<string, string> = {
    'To Do': 'bg-slate-100 text-slate-700 border-slate-200',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    Done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const dotColorMap: Record<string, string> = {
    'To Do': 'bg-slate-400',
    'In Progress': 'bg-blue-500',
    Done: 'bg-emerald-500',
  };

  const colors = colorMap[status.value] || 'bg-gray-100 text-gray-700 border-gray-200';
  const dotColor = dotColorMap[status.value] || 'bg-gray-400';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status.value}
    </span>
  );
}