
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Camera, 
  FileText, 
  BookOpen, 
  Newspaper, 
  Info, 
  Mail, 
  Languages, 
  ChevronUp,
  LogOut,
  Moon,
  Sun,
  User,
  Menu,
  LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isDarkMode, 
  toggleTheme, 
  isLoggedIn,
  onLoginToggle,
  isCollapsed,
  setIsCollapsed
}) => {
  const [langOpen, setLangOpen] = useState(false);

  const primaryItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'photostudio', label: 'Photo Studio', icon: Camera },
    { id: 'pdftools', label: 'PDF Tools', icon: FileText },
    { id: 'guides', label: 'Guides', icon: BookOpen },
    { id: 'currentaffairs', label: 'Current Affairs', icon: Newspaper },
  ];

  const secondaryItems = [
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  // The 'Icon Track' width (fixed at 80px / w-20)
  const ICON_TRACK_WIDTH = "w-20";

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-black border-r border-slate-blue/10 dark:border-white/5 flex flex-col z-50 text-ink dark:text-eggshell select-none transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Header Area - Branding and Menu Toggle */}
      <div className="flex flex-col pt-6 pb-4 shrink-0">
        <div className="flex items-center">
          <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
            <img 
              src="logo1.png" 
              alt="Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-base font-display tracking-tight uppercase leading-none truncate whitespace-nowrap notranslate"
              >
                ExamEdger <span className="text-slate-blue font-iceland">IN</span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center mt-6">
          <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 rounded-xl hover:bg-slate-blue/5 dark:hover:bg-white/5 transition-colors text-slate-blue dark:text-denim hover:text-ink dark:hover:text-eggshell active:scale-95"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-blue dark:text-denim ml-[-12px]"
              >
                MENU
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 scrollbar-hide">
        {primaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center group relative transition-all py-1.5 ${
              activeTab === item.id 
              ? 'text-ink dark:text-eggshell' 
              : 'text-slate-blue dark:text-denim'
            }`}
          >
            <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0 relative z-10`}>
              <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-white dark:bg-white text-black dark:text-black shadow-lg scale-105' 
                : 'group-hover:bg-slate-blue/5 dark:group-hover:bg-white/5 group-hover:text-ink dark:group-hover:text-eggshell'
              }`}>
                <item.icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-sm tracking-wide truncate pr-4 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}

        <div className={`h-px bg-slate-blue/5 dark:bg-white/5 my-4 transition-all ${isCollapsed ? 'mx-6' : 'mx-10'}`} />

        {secondaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center group relative transition-all py-1.5 ${
              activeTab === item.id 
              ? 'text-ink dark:text-eggshell' 
              : 'text-slate-blue dark:text-denim'
            }`}
          >
            <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0 relative z-10`}>
              <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-white dark:bg-white text-black dark:text-black shadow-lg scale-105' 
                : 'group-hover:bg-slate-blue/5 dark:group-hover:bg-white/5 group-hover:text-ink dark:group-hover:text-eggshell'
              }`}>
                <item.icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-sm tracking-wide truncate pr-4 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Footer Area */}
      <div className="pb-6 space-y-3 mt-auto border-t border-slate-blue/5 dark:border-white/5 bg-slate-blue/[0.01] dark:bg-white/[0.02] pt-4 shrink-0">
        
        {/* User Info Row */}
        <div className="flex items-center h-10">
          <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
            <div className="size-9 rounded-full bg-slate-blue/5 dark:bg-white/5 flex items-center justify-center border border-slate-blue/10 dark:border-white/10">
              <User size={16} strokeWidth={2} className="text-slate-blue dark:text-denim" />
            </div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="flex-1 min-w-0 pr-4"
              >
                <p className="text-[12px] font-black truncate text-ink dark:text-eggshell uppercase tracking-tight">
                  {isLoggedIn ? 'Karan Sharma' : 'Guest User'}
                </p>
                <p className="text-[10px] text-slate-blue dark:text-denim font-black uppercase tracking-widest truncate opacity-60">
                  {isLoggedIn ? 'Member' : 'Limited Access'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Login Pill Row */}
        <div className="flex items-center h-10 w-full overflow-hidden">
          <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
             <button 
              onClick={onLoginToggle}
              className={`size-9 flex items-center justify-center rounded-lg transition-all duration-200 border ${
                isLoggedIn 
                ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20' 
                : 'bg-white text-black border-transparent hover:bg-slate-50'
              }`}
            >
              {isLoggedIn ? <LogOut size={16} strokeWidth={2.5} /> : <LogIn size={16} strokeWidth={2.5} />}
            </button>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onLoginToggle}
                className={`flex-1 flex items-center h-9 px-4 rounded-lg font-black text-[12px] uppercase tracking-[0.2em] whitespace-nowrap mr-4 transition-colors ${
                  isLoggedIn 
                  ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20' 
                  : 'bg-white text-black hover:bg-slate-50'
                }`}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Row */}
        <div className="flex items-center h-10">
          <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
            <button 
              onClick={toggleTheme}
              title="Toggle Theme"
              className="size-9 flex items-center justify-center bg-slate-blue/5 dark:bg-white/5 rounded-lg hover:bg-slate-blue/10 dark:hover:bg-white/10 transition-colors border border-slate-blue/10 dark:border-white/10 text-slate-blue dark:text-denim"
            >
              {isDarkMode ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
            </button>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="flex-1 pr-4"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-blue dark:text-denim">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language Row */}
        <div className="relative">
          <div className="flex items-center h-10">
            <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className={`size-9 flex items-center justify-center rounded-lg transition-all border ${
                  langOpen 
                  ? 'bg-slate-blue/10 dark:bg-white/10 border-slate-blue/40 dark:border-white/40 text-ink dark:text-eggshell shadow-lg' 
                  : 'bg-slate-blue/5 dark:bg-white/5 border-slate-blue/10 dark:border-white/10 text-slate-blue dark:text-denim hover:text-ink dark:hover:text-eggshell'
                }`}
              >
                <Languages size={16} strokeWidth={2.5} />
              </button>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.button 
                  onClick={() => setLangOpen(!langOpen)}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="flex-1 text-left pr-4"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-blue dark:text-denim">
                    Language
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute bottom-full left-4 mb-2 w-48 bg-white dark:bg-black border border-slate-blue/10 dark:border-white/10 rounded-xl shadow-2xl p-2 z-[60] max-h-60 overflow-y-auto ${isCollapsed ? 'left-16' : 'left-4'}`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40 px-3 py-2">Select Language</p>
                {[
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'Hindi' },
                  { code: 'bn', label: 'Bengali' },
                  { code: 'te', label: 'Telugu' },
                  { code: 'mr', label: 'Marathi' },
                  { code: 'ta', label: 'Tamil' },
                  { code: 'ur', label: 'Urdu' },
                  { code: 'gu', label: 'Gujarati' },
                  { code: 'kn', label: 'Kannada' },
                  { code: 'ml', label: 'Malayalam' },
                  { code: 'or', label: 'Odia' },
                  { code: 'pa', label: 'Punjabi' },
                  { code: 'as', label: 'Assamese' },
                  { code: 'mai', label: 'Maithili' },
                  { code: 'sat', label: 'Santali' },
                  { code: 'ks', label: 'Kashmiri' },
                  { code: 'ne', label: 'Nepali' },
                  { code: 'kok', label: 'Konkani' },
                  { code: 'sd', label: 'Sindhi' },
                  { code: 'doi', label: 'Dogri' },
                  { code: 'mni', label: 'Manipuri' },
                  { code: 'brx', label: 'Bodo' },
                  { code: 'sa', label: 'Sanskrit' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                        if (lang.code === 'en') {
                            window.location.reload();
                        } else {
                             window.location.href = `https://translate.google.com/translate?sl=en&tl=${lang.code}&u=${encodeURIComponent(window.location.href)}`;
                        }
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-ink dark:text-eggshell hover:bg-slate-blue/5 dark:hover:bg-white/5 rounded-lg transition-colors notranslate"
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
