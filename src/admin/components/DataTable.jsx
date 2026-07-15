import React, { useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  onBulkDelete,
  pagination = { currentPage: 1, totalPages: 1, onPageChange: () => {} },
  emptyStateReset,
  sortConfig = { key: '', direction: '' },
  onSort,
  allIds = []
}) => {
  const { currentPage, totalPages, onPageChange } = pagination;

  const handleSort = (key) => {
    if (!onSort) return;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort(key, direction);
  };

  const isAllSelected = data.length > 0 && selectedIds.length === allIds.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < allIds.length;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Bulk Operations Toolbar */}
      {selectedIds.length > 0 && onBulkDelete && (
        <div className="flex items-center justify-between px-6 py-3.5 bg-rose-50 border border-rose-100 rounded-2xl animate-fade-in">
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-rose-700">
            <span>{selectedIds.length} items selected</span>
          </div>
          <button
            onClick={onBulkDelete}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/10 active:scale-95 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-3xl border border-zinc-150 bg-white shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-150 bg-zinc-50/50">
              {/* Select All Checkbox */}
              {onSelectAll && (
                <th className="p-4 pl-6 w-12 select-none">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected;
                      }}
                      onChange={(e) => onSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded-md border-zinc-300 text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                </th>
              )}

              {/* Dynamic Headers */}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-4 text-xs font-bold tracking-wider text-zinc-550 uppercase select-none ${
                    col.sortable ? 'cursor-pointer hover:text-zinc-800' : ''
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <ArrowUpDown className="w-3 h-3 text-zinc-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Loading Skeleton
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-zinc-150/60">
                  {onSelectAll && (
                    <td className="p-4 pl-6">
                      <div className="w-4 h-4 bg-zinc-200 rounded animate-pulse" />
                    </td>
                  )}
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-4">
                      <div 
                        className="bg-zinc-200 rounded animate-pulse"
                        style={{ 
                          width: col.key === 'actions' ? '60px' : `${Math.floor(Math.random() * (120 - 60) + 60)}px`,
                          height: '16px' 
                        }} 
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length + (onSelectAll ? 1 : 0)} className="p-8">
                  <EmptyState onReset={emptyStateReset} />
                </td>
              </tr>
            ) : (
              // Data Rows
              data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-zinc-150 hover:bg-zinc-50/40 transition-colors ${
                      isSelected ? 'bg-primary/5' : ''
                    }`}
                  >
                    {/* Row Checkbox */}
                    {onSelectRow && (
                      <td className="p-4 pl-6">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onSelectRow(item.id, e.target.checked)}
                            className="w-4 h-4 rounded-md border-zinc-300 text-primary focus:ring-primary cursor-pointer"
                          />
                        </div>
                      </td>
                    )}

                    {/* Cells */}
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className="p-4 text-sm text-zinc-850 font-medium"
                      >
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!loading && data.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-1 select-none">
          <div className="text-xs text-zinc-500">
            Page <span className="font-semibold text-zinc-800">{currentPage}</span> of{' '}
            <span className="font-semibold text-zinc-800">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-zinc-200 text-zinc-650 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-primary text-white shadow-md shadow-primary/15'
                      : 'border border-zinc-200 text-zinc-650 hover:bg-zinc-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-zinc-200 text-zinc-650 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
