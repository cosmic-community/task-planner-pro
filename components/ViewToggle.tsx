'use client';

import { useState } from 'react';

export default function ViewToggle() {
  const [activeView, setActiveView] = useState<'board' | 'list'>('board');

  const handleToggle = (view: 'board' | 'list') => {
    setActiveView(view);
    const boardEl = document.getElementById('board-view');
    const listEl = document.getElementById('list-view');

    if (boardEl && listEl) {
      if (view === 'board') {
        boardEl.classList.remove('hidden');
        listEl.classList.add('hidden');
      } else {
        boardEl.classList.add('hidden');
        listEl.classList.remove('hidden');
      }
    }
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
      <button
        onClick={() => handleToggle('board')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          activeView === 'board'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
        Board
      </button>
      <button
        onClick={() => handleToggle('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          activeView === 'list'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        List
      </button>
    </div>
  );
}