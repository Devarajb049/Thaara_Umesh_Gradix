import React from 'react';

const StatusBadge = ({ status = '' }) => {
  const normStatus = status.toLowerCase();

  const config = {
    active: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      label: 'Active'
    },
    inactive: {
      bg: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
      label: 'Inactive'
    },
    approved: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      label: 'Approved'
    },
    pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
      label: 'Pending'
    },
    rejected: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
      label: 'Rejected'
    },
    unread: {
      bg: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30 font-bold',
      label: 'Unread'
    },
    read: {
      bg: 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700',
      label: 'Read'
    }
  };

  const current = config[normStatus] || {
    bg: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
    label: status
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg}`}>
      {current.label}
    </span>
  );
};

export default StatusBadge;
