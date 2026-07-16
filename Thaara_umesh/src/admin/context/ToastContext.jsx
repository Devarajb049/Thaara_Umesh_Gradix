import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Portal/Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem 
              key={toast.id} 
              toast={toast} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const { message, type } = toast;
  
  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 flex-shrink-0" />
  };

  const bgMap = {
    success: 'bg-white/90 border-emerald-500/20 dark:bg-zinc-900/90 dark:border-emerald-500/20',
    error: 'bg-white/90 border-rose-500/20 dark:bg-zinc-900/90 dark:border-rose-500/20',
    warning: 'bg-white/90 border-amber-500/20 dark:bg-zinc-900/90 dark:border-amber-500/20',
    info: 'bg-white/90 border-sky-500/20 dark:bg-zinc-900/90 dark:border-sky-500/20'
  };

  const shadowMap = {
    success: 'shadow-emerald-500/5',
    error: 'shadow-rose-500/5',
    warning: 'shadow-amber-500/5',
    info: 'shadow-sky-500/5'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-xl ${bgMap[type]} ${shadowMap[type]} transition-colors duration-300`}
    >
      {iconMap[type]}
      <div className="flex-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 break-words pt-0.5">
        {message}
      </div>
      <button 
        onClick={onClose}
        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-0.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
