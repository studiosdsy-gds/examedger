import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Menu,
  Image,
  Bot
} from 'lucide-react';

interface MobileNavProps {
  onMenuToggle: () => void;
  onChatToggle: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onMenuToggle, onChatToggle }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const NavItem = ({ to, icon: Icon, label }: any) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
        isActive(to)
        ? 'text-ink dark:text-eggshell' 
        : 'text-slate-blue dark:text-denim active:bg-slate-blue/5'
      }`}
    >
      <Icon size={20} strokeWidth={2.5} className={`${isActive(to) ? 'scale-110 drop-shadow-sm' : ''}`} />
      <span className="text-[10px] font-black uppercase tracking-wider mt-1">{label}</span>
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-slate-blue/10 dark:border-white/10 z-[60] md:hidden flex justify-between items-end pb-safe-area-bottom shadow-2xl">
      
      <NavItem to="/" icon={LayoutDashboard} label="Home" />
      <NavItem to="/studio" icon={Image} label="Studio" />

      {/* AI Bot - Center Floating */}
      <div className="relative -top-6">
        <button 
          onClick={onChatToggle}
          className="size-14 bg-ink dark:bg-eggshell rounded-full flex items-center justify-center text-eggshell dark:text-ink shadow-2xl shadow-slate-blue/20 border-4 border-white dark:border-black active:scale-95 transition-transform"
        >
          <Bot size={24} strokeWidth={2.5} />
        </button>
      </div>

      <NavItem to="/exams" icon={GraduationCap} label="Exams" />

      <button
        onClick={onMenuToggle}
        className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-blue dark:text-denim active:bg-slate-blue/5"
      >
        <Menu size={20} strokeWidth={2.5} />
        <span className="text-[10px] font-black uppercase tracking-wider mt-1">Menu</span>
      </button>

    </div>
  );
};

export default MobileNav;
