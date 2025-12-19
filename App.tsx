
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import ExamsPage from './pages/ExamsPage';
import ToolPage from './pages/ToolPage';
import AuthPage from './pages/AuthPage';
import { AboutPage, ContactPage } from './pages/InfoPages';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Moon, Sun, Languages } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case 'auth': return <AuthPage onAuthComplete={() => { setIsLoggedIn(true); setActiveTab('dashboard'); }} />;
      case 'dashboard': return <Dashboard isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onLogin={() => setActiveTab('auth')} setActiveTab={setActiveTab} />;
      case 'exams': return <ExamsPage />;
      case 'photostudio': return <ToolPage type="photo" />;
      case 'pdftools': return <ToolPage type="pdf" />;
      case 'guides': return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] text-center space-y-8 animate-in fade-in duration-300">
          <div className="size-24 bg-slate-blue/10 dark:bg-white/5 rounded-huge flex items-center justify-center border border-slate-blue/10 dark:border-white/10">
             <div className="text-4xl font-black text-slate-blue dark:text-denim">?</div>
          </div>
          <div className="max-w-2xl px-4">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Exam Strategy Guides</h2>
            <p className="text-base md:text-lg text-slate-blue dark:text-denim/60 font-bold leading-relaxed">
              Topper notes and syllabus breakdowns for 2026 sessions are currently under final review.
            </p>
          </div>
        </div>
      );
      case 'currentaffairs': return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] text-center space-y-8 animate-in fade-in duration-300">
           <div className="size-24 bg-slate-blue/10 dark:bg-white/5 rounded-huge flex items-center justify-center border border-slate-blue/10 dark:border-white/10">
             <div className="text-4xl font-black text-slate-blue dark:text-denim">!</div>
          </div>
          <div className="max-w-2xl px-4">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Daily Briefing</h2>
            <p className="text-base md:text-lg text-slate-blue dark:text-denim/60 font-bold leading-relaxed">
              Your 5-minute news briefing for UPSC and Banking. Live updates starting Monday.
            </p>
          </div>
        </div>
      );
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      default: return <Dashboard isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onLogin={() => setActiveTab('auth')} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden flex bg-eggshell dark:bg-ink transition-colors duration-300 font-body">
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.2); border-radius: 99px; }
        .dark ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.4); }
        .dark ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}</style>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          activeTab={activeTab === 'auth' ? '' : activeTab} 
          setActiveTab={setActiveTab} 
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          isLoggedIn={isLoggedIn}
          onLoginToggle={() => isLoggedIn ? setIsLoggedIn(false) : setActiveTab('auth')}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] md:hidden flex flex-col justify-end"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-space rounded-t-3xl p-8 pb-32 space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-black text-ink dark:text-eggshell">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-blue/10 rounded-full text-ink dark:text-eggshell">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                 {[
                   { id: 'guides', label: 'Guides' },
                   { id: 'currentaffairs', label: 'Current Affairs' },
                   { id: 'about', label: 'About Us' },
                   { id: 'contact', label: 'Contact Us' }
                 ].map(item => (
                   <button 
                     key={item.id}
                     onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                     className="w-full text-left p-4 bg-slate-blue/5 dark:bg-white/5 rounded-xl text-ink dark:text-eggshell font-black uppercase tracking-widest text-sm"
                   >
                     {item.label}
                   </button>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => setIsDarkMode(!isDarkMode)}
                   className="p-4 bg-slate-blue/5 dark:bg-white/5 rounded-xl flex flex-col items-center gap-2 text-slate-blue dark:text-denim"
                 >
                   {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                   <span className="text-[10px] font-black uppercase tracking-widest">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                 </button>
                 <button className="p-4 bg-slate-blue/5 dark:bg-white/5 rounded-xl flex flex-col items-center gap-2 text-slate-blue dark:text-denim">
                   <Languages size={24} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Language</span>
                 </button>
              </div>

              <button 
                onClick={() => { isLoggedIn ? setIsLoggedIn(false) : setActiveTab('auth'); setIsMobileMenuOpen(false); }}
                className={`w-full p-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 ${isLoggedIn ? 'bg-red-50 text-red-600' : 'bg-ink dark:bg-eggshell text-eggshell dark:text-ink'}`}
              >
                {isLoggedIn ? <><LogOut size={16} /> Logout</> : 'Login'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className={`flex-1 h-full overflow-y-auto scroll-smooth transition-all duration-300 ease-in-out ml-0 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Mobile Header */}
        <div className="md:hidden pt-8 px-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <img src="logo1.png" alt="Logo" className="size-8 object-contain" />
             <h1 className="text-lg font-display tracking-tight uppercase leading-none text-ink dark:text-eggshell">
                ExamEdger <span className="text-slate-blue font-iceland">IN</span>
             </h1>
          </div>
          <div className="size-8 rounded-full bg-slate-blue/10 dark:bg-white/10 flex items-center justify-center border border-slate-blue/20 dark:border-white/20">
             <span className="text-xs font-black text-slate-blue dark:text-denim">{isLoggedIn ? 'KS' : 'G'}</span>
          </div>
        </div>

        <div className="p-6 md:p-12 pb-24 md:pb-12 max-w-[1440px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <MobileNav 
        activeTab={activeTab === 'auth' ? '' : activeTab}
        setActiveTab={setActiveTab}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
    </div>
  );
};

export default App;
