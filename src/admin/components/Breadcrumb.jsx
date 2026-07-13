import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">
      <Link 
        to="/admin" 
        className="flex items-center gap-1 hover:text-primary dark:hover:text-rose-400 transition-colors py-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Admin</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            {isLast || !item.path ? (
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold select-none">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path} 
                className="hover:text-primary dark:hover:text-rose-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
