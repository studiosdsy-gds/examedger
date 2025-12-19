
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  FileCheck, 
  Zap, 
  History, 
  BarChart3, 
  Lock,
  ArrowRight,
  Target,
  Clock,
  LayoutGrid,
  GraduationCap,
  Camera,
  BookOpen,
  Megaphone,
  Compass,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface DashboardProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, onLogin, setActiveTab, isDarkMode }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quick' | 'personal'>('quick');

  const statsData = [
    { name: 'Mon', hours: 4 }, { name: 'Tue', hours: 6 }, { name: 'Wed', hours: 5.5 },
    { name: 'Thu', hours: 8 }, { name: 'Fri', hours: 7.2 }, { name: 'Sat', hours: 9 },
    { name: 'Sun', hours: 3 },
  ];

  const accuracyData = [
    { name: 'Physics', value: 85 }, { name: 'Chemistry', value: 72 },
    { name: 'Maths', value: 91 }, { name: 'Aptitude', value: 65 },
  ];

  const chartAccent = isDarkMode ? '#0ea5e9' : '#1d2d44';
  const gridColor = isDarkMode ? '#1e1e1e' : '#748cab20';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4 text-ink dark:text-eggshell">
            Dashboard
            <span className="text-[10px] font-black bg-slate-blue/10 dark:bg-white/5 px-3 py-1 rounded-full uppercase border border-slate-blue/20 dark:border-white/10 tracking-widest">
              v2.5 Pro
            </span>
          </h2>
          <p className="text-slate-blue dark:text-denim mt-1 font-bold text-sm">Welcome back, your journey to success continues here.</p>
        </div>
        
        <div className="flex bg-slate-blue/5 dark:bg-white/[0.03] p-1 rounded-xl border border-slate-blue/10 dark:border-white/10 shadow-sm self-start">
          <button 
            onClick={() => setActiveSubTab('quick')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black transition-all duration-200 uppercase tracking-widest ${activeSubTab === 'quick' ? 'bg-slate-blue text-white shadow-lg' : 'text-slate-blue dark:text-denim hover:text-ink dark:hover:text-eggshell'}`}
          >
            <LayoutGrid size={16} strokeWidth={2.5} />
            Quick Access
          </button>
          <button 
            onClick={() => setActiveSubTab('personal')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black transition-all duration-200 uppercase tracking-widest ${activeSubTab === 'personal' ? 'bg-slate-blue text-white shadow-lg' : 'text-slate-blue dark:text-denim hover:text-ink dark:hover:text-eggshell'}`}
          >
            <Target size={16} strokeWidth={2.5} />
            Personal Dashboard
          </button>
        </div>
      </div>

      {activeSubTab === 'quick' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <QuickCard 
            icon={<GraduationCap />}
            title="Explore Exams"
            desc="Browse details for over 50+ major national competitive examinations in India."
            action="Open Exams"
            onClick={() => setActiveTab('exams')}
          />

          <QuickCard 
            icon={<FileCheck />}
            title="PDF Optimizer"
            desc="Compress and resize your admit cards or certificates in seconds."
            action="Open Tools"
            onClick={() => setActiveTab('pdftools')}
          />

          <QuickCard 
            icon={<Zap />}
            title="Daily Flash"
            desc="A 5-minute summary of all critical news for UPSC and Banking today."
            action="Read Capsule"
            onClick={() => setActiveTab('currentaffairs')}
          />

          <QuickCard 
            icon={<Camera />}
            title="Photo Studio"
            desc="Perfect your passport photos for any official application form."
            action="Launch"
            onClick={() => setActiveTab('photostudio')}
          />

          <QuickCard 
            icon={<BookOpen />}
            title="Study Guides"
            desc="Curated strategies and syllabus breakdown from toppers."
            action="Explore"
            onClick={() => setActiveTab('guides')}
          />

          {/* Daily Briefing Card - Styled as per screenshot */}
          <div className="bg-white dark:bg-space p-8 text-ink dark:text-eggshell rounded-huge relative overflow-hidden shadow-sm group border border-slate-blue/10 dark:border-white/5 flex flex-col justify-between transition-all hover:bg-card-hover min-h-[380px]">
            <div>
              <h3 className="text-2xl font-black mb-1 flex items-center gap-3">
                <Megaphone size={24} className="text-slate-blue" />
                Daily Briefing
              </h3>
              <p className="text-[10px] text-slate-blue dark:text-denim/60 font-black uppercase tracking-widest mb-6">Top 5 mission-critical updates today</p>
              
              <div className="space-y-4">
                {[
                  { tag: 'WBCS', title: 'Prelims 2025 exam date is officially set', time: '2h ago' },
                  { tag: 'SSC', title: 'CGL Tier 1 Results are expected to be', time: '5h ago' },
                  { tag: 'UPSC', title: 'Mains DAF II portal is now open for', time: '10h ago' },
                  { tag: 'BANK', title: 'SBI PO Prelims admit cards are now', time: '1d ago' },
                ].map((news, i) => (
                  <div key={i} className="flex gap-3 group/item cursor-pointer">
                    <div className="w-0.5 bg-slate-blue/20 group-hover/item:bg-slate-blue transition-colors rounded-full shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[9px] font-black text-slate-blue uppercase tracking-[0.2em]">{news.tag}</span>
                        <span className="text-[9px] text-slate-blue/30 dark:text-denim/30 font-bold">• {news.time}</span>
                      </div>
                      <p className="text-[13px] font-bold leading-tight group-hover/item:text-slate-blue transition-colors line-clamp-1">
                        {news.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('currentaffairs')}
              className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-slate-blue hover:translate-x-1 transition-transform flex items-center gap-2"
            >
              READ ALL <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh]">
          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-20">
              <div className="size-24 bg-slate-blue/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-slate-blue/10 dark:border-white/10 shadow-sm"><Lock size={40} strokeWidth={1.5} className="text-slate-blue dark:text-denim" /></div>
              <div className="max-w-xl space-y-4">
                <h2 className="text-4xl font-black tracking-tight uppercase">Login Required</h2>
                <p className="text-lg text-slate-blue dark:text-denim/60 font-semibold">Your personal performance tracking and accuracy analytics are private to you.</p>
              </div>
              <button onClick={onLogin} className="px-10 py-4 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-4 hover-fast shadow-xl hover:scale-[1.02] active:scale-95">Launch Your Dashboard <ArrowRight size={18} /></button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatSmall label="Avg Accuracy" val="82.4%" icon={<BarChart3 />} trend="+4.2%" />
                <StatSmall label="Tests Taken" val="15" icon={<FileCheck />} trend="3 new" />
                <StatSmall label="Points" val="2,450" icon={<Zap />} trend="+150" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-space p-8 rounded-huge border border-slate-blue/10 dark:border-white/5 shadow-sm min-h-[380px]">
                  <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Study Intensity</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={statsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis dataKey="name" stroke={chartAccent} fontSize={10} tickLine={false} />
                        <YAxis stroke={chartAccent} fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', border: `1px solid ${gridColor}`, borderRadius: '0.75rem' }} />
                        <Area 
                          type="monotone" 
                          dataKey="hours" 
                          stroke={chartAccent} 
                          fill={chartAccent} 
                          fillOpacity={0.1} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white dark:bg-space p-8 rounded-huge border border-slate-blue/10 dark:border-white/5 shadow-sm min-h-[380px]">
                  <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Subject Accuracy</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={accuracyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis dataKey="name" stroke={chartAccent} fontSize={10} tickLine={false} />
                        <YAxis stroke={chartAccent} fontSize={10} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', border: `1px solid ${gridColor}`, borderRadius: '0.75rem' }} />
                        <Bar 
                          dataKey="value" 
                          fill={chartAccent} 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const QuickCard = ({ icon, title, desc, action, onClick }: any) => (
  <button onClick={onClick} className="p-8 text-left rounded-huge border border-slate-blue/10 dark:border-white/5 bg-white dark:bg-space flex flex-col justify-between group hover:bg-card-hover transition-all min-h-[380px]">
    <div>
      <div className="size-11 bg-slate-blue/5 dark:bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-blue group-hover:text-white transition-colors duration-200 border border-slate-blue/10 dark:border-white/10">
        {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      </div>
      <h3 className="text-2xl font-black mb-3 text-ink dark:text-eggshell tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-blue dark:text-denim/60 font-bold leading-relaxed">{desc}</p>
    </div>
    <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-blue group-hover:translate-x-1 transition-transform">
      {action} <ArrowRight size={14} strokeWidth={3} />
    </div>
  </button>
);

const StatSmall = ({ label, val, icon, trend }: any) => (
  <div className="bg-white dark:bg-space p-6 rounded-huge border border-slate-blue/10 dark:border-white/5 group hover:bg-card-hover shadow-sm transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-slate-blue/5 dark:bg-white/5 rounded-lg group-hover:bg-slate-blue group-hover:text-white transition-colors">
        {React.cloneElement(icon, { size: 16, strokeWidth: 2.5 })}
      </div>
      <span className="text-[9px] font-black px-2 py-1 bg-slate-blue/10 text-slate-blue rounded-md">{trend}</span>
    </div>
    <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1 text-slate-blue dark:text-denim">{label}</p>
    <p className="text-2xl font-black">{val}</p>
  </div>
);

export default Dashboard;
