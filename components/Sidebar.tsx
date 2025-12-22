
import React, { useState, useEffect } from 'react';
import { supabase } from '../src/services/supabaseClient';
import LogoutConfirmationModal from './LogoutConfirmationModal';
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
  LogIn,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLoginToggle: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isDarkMode, 
  toggleTheme, 
  isLoggedIn,
  onLoginToggle,
  isCollapsed,
  setIsCollapsed
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [profile, setProfile] = useState<any>(null);
  const [imgError, setImgError] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (isLoggedIn) fetchProfile();
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      
      if (data) {
         setProfile(data);
      } else {
          // Fallback for new signups before profile creation trigger
         setProfile({
            full_name: user?.user_metadata?.full_name || 'Student',
            edge_id: 'PENDING',
            avatar_url: null,
            email: user?.email
         });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserInitial = () => {
      const name = profile?.full_name || profile?.email || 'U';
      return name.charAt(0).toUpperCase();
  };

  // Helper to check active state
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const primaryItems = [
    { id: 'dashboard', path: '/', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'calendar', path: '/calendar', label: 'Calendar', icon: Calendar },
    { id: 'exams', path: '/exams', label: t('exams'), icon: GraduationCap },
    { id: 'photostudio', path: '/studio', label: t('photoStudio'), icon: Camera },
    { id: 'pdftools', path: '/pdf-tools', label: t('pdfTools'), icon: FileText },
  ];

  const secondaryItems = [
    { id: 'guides', path: '/guides', label: 'Guides', icon: BookOpen },
    { id: 'currentaffairs', path: '/current-affairs', label: 'Current Affairs', icon: Newspaper },
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
              src="/logo1.png" 
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
                className="text-base font-display tracking-tight leading-none truncate whitespace-nowrap notranslate"
              >
                ExamEdger <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent font-iceland">
  IN
</span>
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
          <Link
            key={item.id}
            to={item.path}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center group relative transition-all py-1.5 ${
              isActive(item.path)
              ? 'text-ink dark:text-eggshell' 
              : 'text-slate-blue dark:text-denim'
            }`}
          >
            <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0 relative z-10`}>
              <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                isActive(item.path)
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
          </Link>
        ))}

        <div className={`h-px bg-slate-blue/5 dark:bg-white/5 my-4 transition-all ${isCollapsed ? 'mx-6' : 'mx-10'}`} />

        {secondaryItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center group relative transition-all py-1.5 ${
              isActive(item.path)
              ? 'text-ink dark:text-eggshell' 
              : 'text-slate-blue dark:text-denim'
            }`}
          >
            <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0 relative z-10`}>
              <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                isActive(item.path)
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
          </Link>
        ))}
      </nav>

      {/* Footer Area Redesign 
          Layout:
          1. Profile Row (Avatar + Name + Logout Button)
          2. Reach Us
          3. Light Mode
          4. Language
          5. Terms & Privacy (Bottom)
      */}
      <div className="pb-6 mt-auto border-t border-slate-blue/5 dark:border-white/5 bg-slate-blue/[0.01] dark:bg-white/[0.02] pt-4 shrink-0 flex flex-col">
        
        {/* 1. Profile Row */}
        <div className="flex items-center h-16 w-full mb-2">
            <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0 h-full`}>
                <div 
                    onClick={() => navigate(isLoggedIn ? '/profile' : '/auth')}
                    className="size-10 rounded-full bg-slate-blue/5 dark:bg-white/5 flex items-center justify-center border border-slate-blue/10 dark:border-white/10 cursor-pointer hover:bg-slate-blue/10 transition-colors overflow-hidden"
                >
                    {isLoggedIn && profile?.avatar_url && !imgError ? (
                        <img 
                            src={profile.avatar_url} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                            onError={() => setImgError(true)}
                        />
                    ) : isLoggedIn ? (
                        <div className="w-full h-full bg-black flex items-center justify-center text-white font-black text-sm">
                            {getUserInitial()}
                        </div>
                    ) : (
                        <User size={18} strokeWidth={2} className="text-slate-blue dark:text-denim" />
                    )}
                </div>
            </div>
            
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex items-center justify-between pr-4 min-w-0"
                    >
                        <div className="flex flex-col min-w-0 mr-2" onClick={() => navigate(isLoggedIn ? '/profile' : '/auth')}>
                            <span className="text-sm font-black truncate text-ink dark:text-eggshell tracking-tight cursor-pointer hover:text-slate-blue transition-colors">
                                {isLoggedIn ? (profile?.edge_id || 'LOADING...') : t('Guest')}
                            </span>
                            <span className="text-[10px] text-slate-blue dark:text-denim font-black uppercase tracking-widest truncate opacity-60">
                                {isLoggedIn ? (profile?.full_name || 'Member') : 'User'}
                            </span>
                        </div>
                        {isLoggedIn ? (
                             <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="size-9 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
                             >
                                <LogOut size={16} strokeWidth={2.5} />
                             </button>
                        ) : (
                             <button
                                onClick={onLoginToggle}
                                className="px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
                             >
                                {t('login')}
                             </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* 2. Reach Us */}
        <Link 
            to="/contact"
            title={isCollapsed ? "Reach Us" : ""}
            className="flex items-center h-10 w-full group cursor-pointer hover:bg-slate-blue/5 dark:hover:bg-white/5 transition-colors"
        >
             <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
                 <div className="size-9 rounded-xl border border-slate-blue/10 dark:border-white/10 flex items-center justify-center text-slate-blue dark:text-denim group-hover:text-ink dark:group-hover:text-eggshell group-hover:border-slate-blue/20 dark:group-hover:border-white/20 transition-all bg-white dark:bg-white/5">
                     <Info size={16} strokeWidth={2.5} />
                 </div>
             </div>
             <AnimatePresence>
                {!isCollapsed && (
                    <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="text-[11px] font-black uppercase tracking-widest text-slate-blue dark:text-denim group-hover:text-ink dark:group-hover:text-eggshell truncate"
                    >
                        Reach Us
                    </motion.span>
                )}
             </AnimatePresence>
        </Link>

        {/* 3. Light Mode */}
        <div 
            onClick={toggleTheme} 
            className="flex items-center h-10 w-full group cursor-pointer hover:bg-slate-blue/5 dark:hover:bg-white/5 transition-colors"
            title={isCollapsed ? (isDarkMode ? "Light Mode" : "Dark Mode") : ""}
        >
             <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
                 <div className="size-9 rounded-xl border border-slate-blue/10 dark:border-white/10 flex items-center justify-center text-slate-blue dark:text-denim group-hover:text-ink dark:group-hover:text-eggshell group-hover:border-slate-blue/20 dark:group-hover:border-white/20 transition-all bg-white dark:bg-white/5">
                     {isDarkMode ? <Sun size={16} strokeWidth={2.5} /> : <Moon size={16} strokeWidth={2.5} />}
                 </div>
             </div>
             <AnimatePresence>
                {!isCollapsed && (
                    <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="text-[11px] font-black uppercase tracking-widest text-slate-blue dark:text-denim group-hover:text-ink dark:group-hover:text-eggshell truncate"
                    >
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </motion.span>
                )}
             </AnimatePresence>
        </div>

        {/* 4. Language */}
        <div className="relative">
            <div 
                onClick={() => setLangOpen(!langOpen)} 
                className="flex items-center h-10 w-full group cursor-pointer hover:bg-slate-blue/5 dark:hover:bg-white/5 transition-colors"
                title={isCollapsed ? "Language" : ""}
            >
                <div className={`${ICON_TRACK_WIDTH} flex items-center justify-center shrink-0`}>
                    <div className="size-9 rounded-xl border border-slate-blue/10 dark:border-white/10 flex items-center justify-center text-slate-blue dark:text-denim group-hover:text-ink dark:group-hover:text-eggshell group-hover:border-slate-blue/20 dark:group-hover:border-white/20 transition-all bg-white dark:bg-white/5">
                        <Languages size={16} strokeWidth={2.5} />
                    </div>
                </div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.span 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            className="text-[11px] font-black uppercase tracking-widest text-slate-blue dark:text-denim group-hover:text-ink dark:group-hover:text-eggshell truncate"
                        >
                            {t('language')}
                        </motion.span>
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
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40 dark:text-denim/40 px-3 py-2">{t('selectLanguage')}</p>
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
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors notranslate ${
                      i18n.language === lang.code 
                      ? 'bg-slate-blue/10 dark:bg-white/20 text-slate-blue dark:text-white' 
                      : 'text-ink dark:text-eggshell hover:bg-slate-blue/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Terms & Privacy */}
        <AnimatePresence>
            {!isCollapsed && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-blue/30 dark:text-denim/30">
                        <Link to="/terms" className="hover:text-slate-blue dark:hover:text-denim transition-colors whitespace-nowrap">Terms & Condition</Link>
                        <span>||</span>
                        <Link to="/privacy" className="hover:text-slate-blue dark:hover:text-denim transition-colors whitespace-nowrap">Privacy Policy</Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
      <LogoutConfirmationModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={onLoginToggle}
      />
    </aside>
  );
};

export default Sidebar;
