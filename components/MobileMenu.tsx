import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Globe, Sun, Moon, LogOut, ChevronRight, FileText, Camera, Calendar, BookOpen, Newspaper } from 'lucide-react';
import LogoutConfirmationModal from './LogoutConfirmationModal';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isLoggedIn, onLogout, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-end md:hidden">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Sheet */}
            <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full bg-[#f3f4f6] dark:bg-zinc-900 rounded-t-[40px] p-6 pb-8 overflow-y-auto max-h-[85vh] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
                onClick={e => e.stopPropagation()}
            >
                {/* Handle Bar */}
                <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-8" />

                {/* Header */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div>
                        <h2 className="text-3xl font-black text-black dark:text-white tracking-tighter leading-none">Menu</h2>
                        <p className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mt-1">Explore Examedger</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="size-10 flex items-center justify-center bg-white dark:bg-white/10 rounded-full text-black dark:text-white shadow-sm active:scale-90 transition-transform"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Search Bar Placeholder */}
                <div className="mb-6">
                    <div className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                        <Search className="text-black/40 dark:text-white/40" size={20} />
                        <span className="text-base font-bold text-black/40 dark:text-white/40">Search exams, guides...</span>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Primary Actions */}
                    <Link to="/" onClick={onClose} className="col-span-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all group">
                         <div className="flex flex-col">
                             <span className="text-xs font-black text-black/40 dark:text-white/40 uppercase tracking-widest mb-1">Main</span>
                             <span className="text-xl font-black text-black dark:text-white tracking-tight">Dashboard</span>
                         </div>
                         <div className="size-10 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                             <ChevronRight size={20} />
                         </div>
                    </Link>

                    {/* Quick Links */}
                    <Link to="/exams" onClick={onClose} className="aspect-[4/3] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-sm active:scale-95 transition-all relative overflow-hidden group">
                        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-0 transition-opacity scale-150">
                            <BookOpen size={40} />
                        </div>
                        <BookOpen size={24} className="text-black dark:text-white" />
                        <div>
                            <span className="text-xs font-bold text-black/40 dark:text-white/40 block">Browse</span>
                            <span className="text-lg font-black text-black dark:text-white leading-none">Exams</span>
                        </div>
                    </Link>

                    <Link to="/calendar" onClick={onClose} className="aspect-[4/3] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-sm active:scale-95 transition-all relative overflow-hidden group">
                        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-20 transition-opacity scale-150">
                            <Calendar size={40} />
                        </div>
                        <Calendar size={24} className="text-black dark:text-white" />
                        <div>
                            <span className="text-xs font-bold text-black/40 dark:text-white/40 block">Track</span>
                            <span className="text-lg font-black text-black dark:text-white leading-none">Calendar</span>
                        </div>
                    </Link>

                    {/* Tools Section */}
                    <div className="col-span-2 grid grid-cols-2 gap-3">
                         <Link to="/studio" onClick={onClose} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-all">
                            <div className="size-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Camera size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-black/40 dark:text-white/40 tracking-wider">Tool</span>
                                <span className="text-sm font-black text-black dark:text-white">Photo Studio</span>
                            </div>
                        </Link>
                         <Link to="/pdf-tools" onClick={onClose} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-all">
                            <div className="size-10 bg-rose-50 dark:bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400">
                                <FileText size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-black/40 dark:text-white/40 tracking-wider">Tool</span>
                                <span className="text-sm font-black text-black dark:text-white">PDF Tools</span>
                            </div>
                        </Link>
                    </div>

                    <Link to="/current-affairs" onClick={onClose} className="col-span-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-100 dark:border-orange-500/20 rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Newspaper size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-orange-600/60 dark:text-orange-400/60 tracking-wider">Update</span>
                                <span className="text-sm font-black text-black dark:text-white">Current Affairs</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Actions Row */}
                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-2 grid grid-cols-4 gap-2 mb-6 shadow-sm">
                    <Link to="/about" onClick={onClose} className="flex flex-col items-center justify-center py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-black dark:text-white mb-0.5">About</span>
                    </Link>
                    <Link to="/contact" onClick={onClose} className="flex flex-col items-center justify-center py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-black dark:text-white mb-0.5">Contact</span>
                    </Link>
                    <button onClick={toggleTheme} className="flex flex-col items-center justify-center py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-black dark:text-white mb-0.5">{isDarkMode ? 'Light' : 'Dark'}</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-black dark:text-white mb-0.5">Lang</span>
                    </button>
                </div>

                {/* Login/Logout */}
                <button 
                    onClick={() => {
                        if (isLoggedIn) {
                            setShowLogoutConfirm(true);
                        } else {
                            navigate('/auth');
                            onClose();
                        }
                    }}
                    className={`w-full py-4 rounded-2xl text-base font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-transform ${
                        isLoggedIn 
                        ? 'bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20' 
                        : 'bg-black dark:bg-white text-white dark:text-black border border-transparent'
                    }`}
                >
                    {isLoggedIn ? 'Sign Out' : 'Sign In'}
                </button>

                {/* Policy Links */}
                <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                     <Link to="/terms" onClick={onClose} className="hover:text-black dark:hover:text-white transition-colors">Terms & Condition</Link>
                     <span>•</span>
                     <Link to="/privacy" onClick={onClose} className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
                </div>

            </motion.div>
        </div>
      )}
    </AnimatePresence>

    <LogoutConfirmationModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
            onLogout();
            onClose();
        }}
    />
    </>
  );
};

export default MobileMenu;
