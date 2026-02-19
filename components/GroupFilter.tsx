'use client';

import { useState } from 'react';
import { TaskGroup } from '@/types';

interface GroupFilterProps {
  groups: TaskGroup[];
}

export default function GroupFilter({ groups }: GroupFilterProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const handleFilter = (groupSlug: string | null) => {
    setActiveGroup(groupSlug);

    // Show/hide task cards based on group
    const allCards = document.querySelectorAll('[data-group]');
    allCards.forEach((card) => {
      const el = card as HTMLElement;
      if (!groupSlug || el.dataset.group === groupSlug) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Groups</h3>
      <div className="space-y-1">
        <button
          onClick={() => handleFilter(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            activeGroup === null
              ? 'bg-gray-100 text-gray-900 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Groups
        </button>
        {groups.map((group) => {
          const color = group.metadata?.color || '#6b7280';
          return (
            <button
              key={group.id}
              onClick={() => handleFilter(group.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                activeGroup === group.slug
                  ? 'font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={
                activeGroup === group.slug
                  ? { backgroundColor: `${color}15`, color }
                  : undefined
              }
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              {group.metadata?.name || group.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}