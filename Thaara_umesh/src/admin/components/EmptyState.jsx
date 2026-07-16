import React from 'react';
import { Search } from 'lucide-react';

const EmptyState = ({ 
  title = "No results found", 
  description = "Try adjusting your search keywords or active filter selections.", 
  onReset 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/10">
      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-4">
        <Search className="w-5 h-5" />
      </div>
      <h4 className="text-zinc-800 dark:text-zinc-200 font-semibold text-base mb-1">
        {title}
      </h4>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="text-xs font-semibold px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 active:scale-95 transition-all"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
