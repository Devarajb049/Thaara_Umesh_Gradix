import React from 'react';
import Modal from './Modal';
import { AlertOctagon } from 'lucide-react';

const DeleteConfirmation = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Item", 
  message = "Are you sure you want to delete this item? This action cannot be undone." 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
          <AlertOctagon className="w-6 h-6" />
        </div>
        
        <div className="flex flex-col gap-1">
          <p className="text-zinc-800 dark:text-zinc-200 font-semibold text-base">
            Confirm Deletion
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {message}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-850 active:scale-98 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark shadow-md shadow-primary/10 active:scale-98 transition-all text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
