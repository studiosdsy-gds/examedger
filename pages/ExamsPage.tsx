
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXAMS } from '../data/examsData';
import { 
  Search, 
  Calendar, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  ShieldAlert, 
  ListChecks, 
  ShoppingBag, 
  Globe, 
  History, 
  Shirt, 
  Smartphone,
  MessageCircle,
  Clock,
  Layout,
  Info,
  CheckCircle2,
  BookMarked,
  Wrench,
  Camera,
  FileText,
  CalendarDays
} from 'lucide-react';
import { Exam } from '../types';

type ExamTab = 'details' | 'dos' | 'guides' | 'news' | 'tools';

const ExamsPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DONE' | 'UPCOMING' | 'POSTPONED'>('ALL');
  const [activeTab, setActiveTab] = useState<ExamTab>('details');

  const filteredExams = EXAMS.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exam.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || exam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedExam) {
    return (
      <div className="space-y-6 pb-32 animate-in fade-in duration-300">
        <button 
          onClick={() => { setSelectedExam(null); setActiveTab('details'); }} 
          className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] text-slate-blue dark:text-denim hover:text-ink dark:hover:text-slate-blue transition-colors"
        >
          <ArrowLeft size={14} /> DIRECTORY
        </button>

        <div className="bg-white dark:bg-space rounded-huge border border-slate-blue/10 dark:border-white/10 overflow-hidden shadow-2xl">
          {/* Header Section */}
          <div className="p-10 border-b border-slate-blue/10 dark:border-white/5 bg-slate-blue/[0.03] dark:bg-black/20">
             <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-blue/40 dark:text-denim/40">
                  {selectedExam.type}
                </span>
                <h2 className="text-5xl font-black tracking-tighter text-ink dark:text-eggshell notranslate">
                  {selectedExam.name}
                </h2>
                <p className="text-xl text-slate-blue dark:text-denim font-bold opacity-80 notranslate">
                  {selectedExam.fullName}
                </p>
             </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-10 py-4 bg-eggshell/20 dark:bg-black/20 border-b border-slate-blue/10 dark:border-white/5">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {(['details', 'dos', 'guides', 'news', 'tools'] as ExamTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                    ? 'bg-ink dark:bg-slate-blue text-eggshell dark:text-white shadow-lg' 
                    : 'text-slate-blue dark:text-denim hover:bg-slate-blue/5 dark:hover:bg-white/5'
                  }`}
                >
                  {tab.replace('dos', 'Dos & Donts')}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-10 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                       <DetailSection title="Timeline" icon={<CalendarDays size={20}/>}>
                         <div className="grid grid-cols-2 gap-4">
                           <DateCard label="EXAM" val={selectedExam.dates.examDate} />
                           <DateCard label="RESULT" val={selectedExam.dates.resultDate} />
                         </div>
                       </DetailSection>
                       
                       <DetailSection title="Checklist" icon={<ShoppingBag size={20}/>}>
                         <div className="p-8 bg-eggshell/40 dark:bg-black/40 rounded-xl border border-slate-blue/10 dark:border-white/10">
                           <ul className="space-y-4">
                             {selectedExam.thingsToCarry.map((it, i) => (
                               <li key={i} className="flex items-center gap-3 font-bold text-ink/80 dark:text-eggshell/80">
                                 <CheckCircle2 size={16} className="text-slate-blue" />
                                 {it}
                               </li>
                             ))}
                           </ul>
                         </div>
                       </DetailSection>

                       <div className="p-8 bg-slate-blue/5 dark:bg-black/40 rounded-xl border border-slate-blue/10 dark:border-white/10">
                         <div className="flex items-center gap-3 mb-4">
                            <Info size={18} className="text-slate-blue" />
                            <h4 className="font-black text-ink dark:text-eggshell">Protocol Note</h4>
                         </div>
                         <p className="text-sm text-slate-blue dark:text-denim leading-relaxed font-bold italic">
                           {selectedExam.dressCode}
                         </p>
                       </div>
                    </div>

                    <div className="space-y-12">
                       <DetailSection title="Official Info" icon={<Globe size={20}/>}>
                         <a href={selectedExam.officialWebsite} target="_blank" className="w-full flex items-center justify-between p-8 bg-eggshell dark:bg-slate-blue text-ink dark:text-white rounded-huge font-black text-2xl hover-fast shadow-xl hover:scale-[1.01] active:scale-95 group transition-all">
                           Visit Website 
                           <ExternalLink className="group-hover:rotate-12 transition-transform" />
                         </a>
                       </DetailSection>

                       <DetailSection title="Quick Specs" icon={<Info size={20}/>}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SpecItem label="Mode" val={selectedExam.mode} />
                            <SpecItem label="Total Marks" val={selectedExam.totalMarks.toString()} />
                            <SpecItem label="Duration" val={selectedExam.duration} />
                            <SpecItem label="Limit" val={selectedExam.fileSizeLimit} />
                         </div>
                       </DetailSection>

                       <div className="p-8 bg-white/5 dark:bg-black/40 rounded-huge border border-slate-blue/10 dark:border-white/10">
                          <h4 className="font-black text-lg mb-4">Overview</h4>
                          <p className="text-sm text-slate-blue dark:text-denim leading-relaxed font-semibold">
                            {selectedExam.description}
                          </p>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'dos' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <h3 className="text-2xl font-black flex items-center gap-3">
                         <CheckCircle2 className="text-green-500" /> Exam Day Dos
                       </h3>
                       <div className="space-y-4">
                         {selectedExam.dos.map((item, i) => (
                           <div key={i} className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl font-bold">
                             {item}
                           </div>
                         ))}
                       </div>
                    </div>
                    <div className="space-y-8">
                       <h3 className="text-2xl font-black flex items-center gap-3">
                         <ShieldAlert className="text-red-500" /> Critical Donts
                       </h3>
                       <div className="space-y-4">
                         {selectedExam.donts.map((item, i) => (
                           <div key={i} className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl font-bold">
                             {item}
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'guides' && (
                  <div className="space-y-12">
                     <div className="space-y-6">
                       <h3 className="text-2xl font-black flex items-center gap-3">
                         <Globe className="text-slate-blue" /> Official Quick Links
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedExam.prominentLinks.map((link, i) => (
                            <a 
                              key={i} 
                              href={link.url}
                              className="p-6 bg-slate-blue/5 dark:bg-slate-blue/10 border border-slate-blue/20 rounded-xl flex items-center justify-between group hover:bg-slate-blue hover:text-white transition-all shadow-sm"
                            >
                               <span className="font-bold text-sm tracking-wide">{link.title}</span>
                               <ExternalLink size={16} />
                            </a>
                          ))}
                       </div>
                     </div>

                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black flex items-center gap-3">
                          <BookMarked className="text-slate-blue" /> Preparation Roadmap
                        </h3>
                        <span className="text-xs font-black px-4 py-2 bg-slate-blue/10 rounded-full">15+ GUIDES FOUND</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                         {selectedExam.guides.map((guide, i) => (
                           <a 
                             key={i} 
                             href={guide.url} 
                             target="_blank" 
                             className="p-6 bg-white dark:bg-black/40 border border-slate-blue/10 dark:border-white/10 rounded-xl flex items-center justify-between group hover:border-slate-blue dark:hover:bg-card-hover hover-fast transition-all"
                           >
                             <div>
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-blue/30 dark:text-denim/30 mb-1 block">
                                 {guide.source}
                               </span>
                               <h4 className="font-bold text-sm line-clamp-1 group-hover:text-ink dark:group-hover:text-slate-blue transition-colors">{guide.title}</h4>
                             </div>
                             <ExternalLink size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                           </a>
                         ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'news' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                       <Layout className="text-slate-blue" /> Latest Updates
                    </h3>
                    <div className="space-y-4">
                      {selectedExam.news.map((item, i) => (
                        <div key={i} className="p-6 bg-white dark:bg-black/40 border border-slate-blue/10 dark:border-white/10 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-blue/30 transition-all">
                           <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-blue bg-slate-blue/5 px-2 py-1 rounded-md">{item.source}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-blue/40 dark:text-denim/40">{item.date}</span>
                              </div>
                              <h4 className="text-lg font-black text-ink dark:text-eggshell group-hover:text-slate-blue transition-colors leading-tight">
                                {item.title}
                              </h4>
                           </div>
                           <button className="px-6 py-2 bg-slate-blue/5 text-slate-blue font-black text-[10px] uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                             Read More
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'tools' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ToolActionCard 
                       icon={<Camera size={32} />} 
                       title="Photo Studio" 
                       desc={`Recommended for ${selectedExam.name}: 3.5cm x 4.5cm, 20kb-50kb.`} 
                       action="LAUNCH STUDIO"
                    />
                    <ToolActionCard 
                       icon={<FileText size={32} />} 
                       title="PDF Toolkit" 
                       desc={`Compress marksheet. Limit: ${selectedExam.fileSizeLimit}.`} 
                       action="OPEN TOOLS"
                    />
                    <ToolActionCard 
                       icon={<CalendarDays size={32} />} 
                       title="Date Stamper" 
                       desc="Automatically add the date of photograph as required." 
                       action="STAMP IMAGE"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-32">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tighter mb-4 text-ink dark:text-eggshell uppercase">Exam Directory</h2>
          <p className="text-lg text-slate-blue dark:text-denim font-bold">Comprehensive dossiers for 50+ major competitive exams.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" placeholder="Search exams..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-6 pr-6 py-4 bg-white dark:bg-space border border-slate-blue/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-slate-blue text-sm font-bold w-full md:w-64 shadow-sm text-ink dark:text-eggshell placeholder-slate-blue/30 dark:placeholder-denim/30"
          />
          <div className="flex bg-slate-blue/5 dark:bg-space p-1 rounded-xl border border-slate-blue/10 dark:border-white/10 shadow-sm">
             {['ALL', 'UPCOMING', 'DONE'].map(f => <button key={f} onClick={() => setStatusFilter(f as any)} className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${statusFilter === f ? 'bg-ink dark:bg-slate-blue text-eggshell dark:text-white shadow-sm' : 'text-slate-blue dark:text-denim opacity-60 hover:opacity-100'}`}>{f}</button>)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredExams.map(exam => (
            <motion.div layout key={exam.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedExam(exam)} className="bg-white dark:bg-space border border-slate-blue/10 dark:border-white/10 rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover-fast dark:hover:bg-card-hover transition-all hover:shadow-lg">
              <div>
                <div className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-4 text-slate-blue dark:text-denim">{exam.type}</div>
                <h3 className="text-2xl font-black mb-2 leading-tight text-ink dark:text-eggshell">{exam.name}</h3>
                <p className="text-xs text-slate-blue dark:text-denim font-bold line-clamp-2">{exam.fullName}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-blue/10 dark:border-white/5 flex items-center justify-between">
                <span className="text-sm font-black text-ink dark:text-eggshell">{exam.dates.examDate}</span>
                <div className="size-10 bg-slate-blue/5 dark:bg-black/60 rounded-lg flex items-center justify-center group-hover:bg-slate-blue group-hover:text-white transition-colors shadow-sm"><ArrowRight size={18} strokeWidth={2.5} /></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ToolActionCard = ({ icon, title, desc, action }: any) => (
  <div className="p-10 bg-white dark:bg-black/40 border border-slate-blue/10 dark:border-white/10 rounded-huge flex flex-col justify-between group hover:bg-card-hover hover-fast transition-all">
     <div>
       <div className="mb-6 opacity-40 group-hover:text-slate-blue transition-colors">
         {icon}
       </div>
       <h4 className="text-2xl font-black mb-2 text-ink dark:text-eggshell">{title}</h4>
       <p className="text-sm text-slate-blue dark:text-denim font-bold leading-relaxed mb-6">
         {desc}
       </p>
     </div>
     <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform text-slate-blue">
       {action} <ArrowRight size={14} />
     </button>
  </div>
);

const DateCard = ({ label, val }: any) => (
  <div className="p-8 bg-eggshell/40 dark:bg-black/40 rounded-xl border border-slate-blue/10 dark:border-white/10 text-center shadow-lg">
    <span className="text-[10px] uppercase font-black text-slate-blue/40 dark:text-denim/40 block mb-2 tracking-widest">{label}</span>
    <span className="text-xl font-black text-ink dark:text-eggshell">{val}</span>
  </div>
);

const SpecItem = ({ label, val }: any) => (
  <div className="p-4 bg-eggshell/20 dark:bg-black/40 rounded-xl border border-slate-blue/5 dark:border-white/5 flex flex-col">
    <span className="text-[10px] font-black text-slate-blue/40 uppercase tracking-widest mb-1">{label}</span>
    <span className="font-bold text-sm">{val}</span>
  </div>
);

const DetailSection = ({ title, icon, children }: any) => (
  <div className="space-y-6">
    <h3 className="text-xl font-black flex items-center gap-4 text-ink dark:text-eggshell">
      <span className="p-3 bg-slate-blue/5 dark:bg-space rounded-xl text-slate-blue dark:text-slate-blue shadow-sm border border-slate-blue/10 dark:border-white/5">
        {icon}
      </span> 
      {title}
    </h3>
    {children}
  </div>
);

export default ExamsPage;
