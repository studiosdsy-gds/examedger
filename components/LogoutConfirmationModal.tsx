import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden pointer-events-auto border border-slate-blue/10 dark:border-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-blue/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                    <LogOut size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-black text-ink dark:text-eggshell tracking-tight">Confirm Logout</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-blue/5 dark:hover:bg-white/5 rounded-full transition-colors text-slate-blue dark:text-denim"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-slate-blue dark:text-denim font-medium leading-relaxed">
                  Are you sure you want to sign out? You will need to log in again to access your account.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 p-4 bg-slate-blue/5 dark:bg-black/20">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl font-bold bg-white dark:bg-white/5 border border-slate-blue/10 dark:border-white/10 text-ink dark:text-eggshell hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfirmationModal;
