import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ 
  filters = [], 
  values = {}, 
  onChange 
}) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filter Icon Label */}
      <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 text-xs font-semibold uppercase tracking-wider select-none">
        <Filter className="w-3.5 h-3.5" />
        <span>Filters</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <div key={filter.name} className="relative">
            <select
              value={values[filter.name] || ''}
              onChange={(e) => onChange(filter.name, e.target.value)}
              className="appearance-none bg-white/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 pr-9 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:ring-rose-500 dark:focus:border-rose-500 backdrop-blur-md font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all"
            >
              <option value="">All {filter.label}</option>
              {filter.choices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
