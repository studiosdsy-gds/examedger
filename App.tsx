
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import ExamsPage from './pages/ExamsPage';
import ExamDetailsPage from './pages/ExamDetailsPage';
import CalendarPage from './pages/CalendarPage';
import ToolPage from './pages/ToolPage';
import AuthPage from './pages/AuthPage';
import { AboutPage, ContactPage, TermsPage, PrivacyPage } from './pages/InfoPages';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from './src/services/supabaseClient';
import ChatWidget from './components/ChatWidget';
import ProfilePage from './pages/ProfilePage';
import GlobalLoader from './src/components/GlobalLoader';
import MobileMenu from './components/MobileMenu';
import { LoadingProvider, useLoading } from './src/context/LoadingContext';

// Wrapper to handle location-based effects if needed (like scroll restoration)
const AppContent: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDashboard = location.pathname === '/';
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    // Initial Load Simulation
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initialize Auth State
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  // Handle back button closing mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      window.history.pushState(null, '');
      const handlePopState = () => setIsMobileMenuOpen(false);
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        // Clean up history if visual close happened (optional, complex to get right without double-back)
      };
    }
  }, [isMobileMenuOpen]);

  // Scroll to top on route change & Trigger Global Loader
  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0);
    setIsLoading(true);
    // Turn off immediately so context handles the minimum duration timer.
    // If the new page needs to load data, it should call setIsLoading(true) on mount.
    setIsLoading(false);
  }, [location.pathname]);

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
      
      {!location.pathname.includes('/auth') && (
        <div className="hidden md:block">
          <Sidebar 
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
            isLoggedIn={isLoggedIn}
            onLoginToggle={() => isLoggedIn ? supabase.auth.signOut() : navigate('/auth')}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        </div>
      )}

      {/* Mobile Menu & Global Loader */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
            supabase.auth.signOut();
            setIsLoggedIn(false);
        }}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      <GlobalLoader isLoading={isLoading} />
      
      <main className={`flex-1 h-full overflow-y-auto scroll-smooth transition-all duration-300 ease-in-out ml-0 ${isSidebarCollapsed || location.pathname.includes('/auth') ? 'md:ml-20' : 'md:ml-64'} ${isChatOpen && isDashboard ? 'md:mr-[400px]' : ''}`}>
        {!location.pathname.includes('/auth') && (
            <div className="md:hidden pt-8 px-6 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src="/logo1.png" alt="Logo" className="size-8 object-contain" />
                <h1 className="text-lg font-display tracking-tight uppercase leading-none text-ink dark:text-eggshell">
                    ExamEdger <span className="text-slate-blue font-iceland">IN</span>
                </h1>
            </div>
            <button 
                onClick={() => navigate(isLoggedIn ? '/profile' : '/auth')}
                className="size-8 rounded-full bg-slate-blue/10 dark:bg-white/10 flex items-center justify-center border border-slate-blue/20 dark:border-white/20 active:scale-95 transition-transform"
            >
                <span className="text-xs font-black text-slate-blue dark:text-denim">{isLoggedIn ? 'ME' : 'G'}</span>
            </button>
            </div>
        )}

        <div className="p-6 md:p-12 pb-24 md:pb-12 max-w-[1440px] mx-auto">
          <AnimatePresence mode="wait">
             {/* AnimatePresence transition key */}
             <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onLogin={() => {}} setActiveTab={() => {}} />} />
                <Route path="/calendar" element={<CalendarPage isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onLoginRequest={() => {}} />} />
                <Route path="/exams" element={<ExamsPage />} />
                <Route path="/exams/:examId" element={<ExamDetailsPage />} />
                <Route path="/studio" element={<ToolPage type="photo" />} />
                <Route path="/pdf-tools" element={<ToolPage type="pdf" />} />
                <Route path="/guides" element={
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
                } />
                <Route path="/current-affairs" element={
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
                } />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/auth" element={<AuthPage onAuthComplete={() => { /* Navigate handled by auth listener */ }} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
             </Routes>
          </AnimatePresence>
        </div>
      </main>

      {!location.pathname.includes('/auth') && (
        <MobileNav 
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onChatToggle={() => setIsChatOpen(prev => !prev)}
        />
      )}
      
      {!location.pathname.includes('/auth') && (
        <ChatWidget 
            isOpen={isChatOpen} 
            onToggle={setIsChatOpen} 
            isDashboard={isDashboard} 
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
    return (
        <LoadingProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </LoadingProvider>
    );
};

export default App;
