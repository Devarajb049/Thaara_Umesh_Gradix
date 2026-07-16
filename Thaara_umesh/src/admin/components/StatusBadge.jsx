import React from 'react';

const StatusBadge = ({ status = '' }) => {
  const normStatus = status.toLowerCase();

  const config = {
    active: {
      bg: 'bg-primary/10 text-primary border-primary/20',
      label: 'Active'
    },
    inactive: {
      bg: 'bg-zinc-100 text-zinc-500 border-zinc-150',
      label: 'Inactive'
    },
    approved: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Approved'
    },
    pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-250',
      label: 'Pending'
    },
    rejected: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      label: 'Rejected'
    },
    unread: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200 font-bold',
      label: 'Unread'
    },
    read: {
      bg: 'bg-zinc-100 text-zinc-450 border-zinc-150',
      label: 'Read'
    }
  };

  const current = config[normStatus] || {
    bg: 'bg-zinc-100 text-zinc-500 border-zinc-150',
    label: status
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg}`}>
      {current.label}
    </span>
  );
};

export default StatusBadge;
