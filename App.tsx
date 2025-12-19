
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ExamsPage from './pages/ExamsPage';
import ToolPage from './pages/ToolPage';
import AuthPage from './pages/AuthPage';
import { AboutPage, ContactPage } from './pages/InfoPages';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'auth': return <AuthPage onAuthComplete={() => { setIsLoggedIn(true); setActiveTab('dashboard'); }} />;
      case 'dashboard': return <Dashboard isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onLogin={() => setActiveTab('auth')} setActiveTab={setActiveTab} />;
      case 'exams': return <ExamsPage />;
      case 'photostudio': return <ToolPage type="photo" />;
      case 'pdftools': return <ToolPage type="pdf" />;
      case 'guides': return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in duration-300">
          <div className="size-24 bg-slate-blue/10 dark:bg-white/5 rounded-huge flex items-center justify-center border border-slate-blue/10 dark:border-white/10">
             <div className="text-4xl font-black text-slate-blue dark:text-denim">?</div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">Exam Strategy Guides</h2>
            <p className="text-lg text-slate-blue dark:text-denim/60 font-bold leading-relaxed">
              Topper notes and syllabus breakdowns for 2026 sessions are currently under final review.
            </p>
          </div>
        </div>
      );
      case 'currentaffairs': return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in duration-300">
           <div className="size-24 bg-slate-blue/10 dark:bg-white/5 rounded-huge flex items-center justify-center border border-slate-blue/10 dark:border-white/10">
             <div className="text-4xl font-black text-slate-blue dark:text-denim">!</div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">Daily Briefing</h2>
            <p className="text-lg text-slate-blue dark:text-denim/60 font-bold leading-relaxed">
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
    <div className="flex h-screen bg-eggshell dark:bg-ink transition-colors duration-300 font-body overflow-hidden">
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
      
      <main className={`flex-1 h-full overflow-y-auto no-scrollbar scroll-smooth transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8 md:p-12 max-w-[1440px] mx-auto">
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
    </div>
  );
};

export default App;
