import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  Menu,
  Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMenuToggle: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab, onMenuToggle }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'photostudio', label: 'Studio', icon: Image },
    { id: 'pdftools', label: 'PDF', icon: FileText },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 py-2 px-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-slate-blue/10 dark:border-white/10 z-[60] md:hidden flex justify-between items-center pb-safe-area-bottom">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all w-[18%] ${
            activeTab === item.id 
            ? 'text-ink dark:text-eggshell' 
            : 'text-slate-blue dark:text-denim hover:bg-slate-blue/5'
          }`}
        >
          <div className={`p-1.5 rounded-lg mb-0.5 transition-all ${
            activeTab === item.id 
            ? 'bg-ink dark:bg-eggshell text-eggshell dark:text-ink shadow-md scale-110' 
            : ''
          }`}>
            <item.icon size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider scale-90">{item.label}</span>
        </button>
      ))}

      <button
        onClick={onMenuToggle}
        className="flex flex-col items-center justify-center p-1.5 rounded-xl transition-all w-[18%] text-slate-blue dark:text-denim hover:bg-slate-blue/5"
      >
        <div className="p-1.5 rounded-lg mb-0.5">
          <Menu size={20} strokeWidth={2.5} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider scale-90">Menu</span>
      </button>
    </div>
  );
};

export default MobileNav;
