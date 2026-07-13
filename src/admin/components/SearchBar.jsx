import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  value = '', 
  onChange, 
  placeholder = "Search..." 
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 bg-white/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:ring-rose-500 dark:focus:border-rose-500 backdrop-blur-md text-zinc-800 dark:text-zinc-200 transition-all placeholder:text-zinc-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-250 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
