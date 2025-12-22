
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Globe, 
  Info, 
  CheckCircle2, 
  ShieldAlert, 
  Layout, 
  Camera, 
  FileText, 
  CalendarDays,
  ExternalLink,
  ShoppingBag,
  BookMarked
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { EXAMS } from '../data/examsData';
import { fetchLiveExamDates } from '../src/services/examService';

const ExamDetailsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { t } = useTranslation();
  const [exam, setExam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'dos' | 'guides' | 'news' | 'tools'>('details');

  useEffect(() => {
    const loadExam = async () => {
      // Find initial exam from static data
      const staticExam = EXAMS.find(e => e.id === examId);
      if (staticExam) {
          // Fetch live data to update dates
          const liveExams = await fetchLiveExamDates();
          const liveExam = liveExams.find((e: any) => e.id === examId);
          setExam(liveExam || staticExam);
      }
    };
    loadExam();
  }, [examId]);

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold text-slate-blue dark:text-denim animate-pulse">Loading Exam Details...</div>
      </div>
    );
  }

  const DateCard = ({ label, val }: any) => (
    <div className="p-8 bg-eggshell/40 dark:bg-black/40 rounded-xl border border-slate-blue/10 dark:border-white/10 text-center shadow-lg">
      <span className="text-[10px] uppercase font-black text-slate-blue/40 dark:text-denim/40 block mb-2 tracking-widest">{label}</span>
      <span className="text-xl font-black text-ink dark:text-eggshell">{val || 'TBA'}</span>
    </div>
  );

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

  return (
    <div className="space-y-6 pb-32 animate-in fade-in duration-300">
      <Link 
        to="/exams"
        className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] text-slate-blue dark:text-denim hover:text-ink dark:hover:text-slate-blue transition-colors"
      >
        <ArrowLeft size={14} /> {t('directory') || 'DIRECTORY'}
      </Link>
      
      <div className="bg-white dark:bg-space rounded-huge border border-slate-blue/10 dark:border-white/10 overflow-hidden shadow-2xl">
        
        {/* Header Section */}
        <div className="p-10 border-b border-slate-blue/10 dark:border-white/5 bg-slate-blue/[0.03] dark:bg-black/20">
           <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-blue/40 dark:text-denim/40">
                {exam.type}
              </span>
              <h1 className="text-5xl font-black tracking-tighter text-ink dark:text-eggshell notranslate">
                {exam.name}
              </h1>
              <p className="text-xl text-slate-blue dark:text-denim font-bold opacity-80 notranslate">
                {exam.fullName}
              </p>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-10 py-4 bg-eggshell/20 dark:bg-black/20 border-b border-slate-blue/10 dark:border-white/5">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {(['details', 'dos', 'guides', 'news', 'tools'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-ink dark:bg-slate-blue text-eggshell dark:text-white shadow-lg' 
                  : 'text-slate-blue dark:text-denim hover:bg-slate-blue/5 dark:hover:bg-white/5'
                }`}
              >
                {tab === 'dos' ? (t('examDayDos') || 'Exam Day DOs') : (t(tab) || tab.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-10 min-h-[500px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'details' && (
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                 <div className="space-y-12">
                    <DetailSection title={t('timeline') || 'Key Dates'} icon={<CalendarDays size={20}/>}>
                      <div className="grid grid-cols-2 gap-4">
                        <DateCard label="Exam Date" val={exam.dates.examDate} />
                        <DateCard label="Result" val={exam.dates.resultDate} />
                        <DateCard label="Reg. Start" val={exam.dates.registrationStart} />
                        <DateCard label="Reg. End" val={exam.dates.registrationEnd} />
                      </div>
                    </DetailSection>
                    
                    <DetailSection title={t('checklist') || 'Exam Checklist'} icon={<ShoppingBag size={20}/>}>
                      <div className="p-8 bg-eggshell/40 dark:bg-black/40 rounded-xl border border-slate-blue/10 dark:border-white/10">
                        <ul className="space-y-4">
                          {exam.thingsToCarry?.map((it: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 font-bold text-ink/80 dark:text-eggshell/80">
                              <CheckCircle2 size={16} className="text-slate-blue" />
                              {it}
                            </li>
                          )) || <p>No specific checklist available.</p>}
                        </ul>
                      </div>
                    </DetailSection>

                    <div className="p-8 bg-slate-blue/5 dark:bg-black/40 rounded-xl border border-slate-blue/10 dark:border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                         <Info size={18} className="text-slate-blue" />
                         <h4 className="font-black text-ink dark:text-eggshell">{t('protocolNote') || 'Protocol Note'}</h4>
                      </div>
                      <p className="text-sm text-slate-blue dark:text-denim leading-relaxed font-bold italic">
                        {exam.dressCode || 'Follow standard exam dress code.'}
                      </p>
                    </div>
                 </div>

                 <div className="space-y-12">
                    <DetailSection title={t('officialInfo') || 'Official Info'} icon={<Globe size={20}/>}>
                      <a href={exam.officialWebsite} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-8 bg-eggshell dark:bg-slate-blue text-ink dark:text-white rounded-huge font-black text-2xl hover-fast shadow-xl hover:scale-[1.01] active:scale-95 group transition-all">
                        {t('visitWebsite') || 'Visit Official Website'}
                        <ExternalLink className="group-hover:rotate-12 transition-transform" />
                      </a>
                    </DetailSection>

                    <DetailSection title={t('quickSpecs') || 'Quick Specs'} icon={<Info size={20}/>}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <SpecItem label="Mode" val={exam.mode} />
                         <SpecItem label="Total Marks" val={exam.totalMarks?.toString()} />
                         <SpecItem label="Duration" val={exam.duration} />
                         <SpecItem label="File Limit" val={exam.fileSizeLimit} />
                      </div>
                    </DetailSection>

                    <div className="p-8 bg-white/5 dark:bg-black/40 rounded-huge border border-slate-blue/10 dark:border-white/10">
                       <h4 className="font-black text-lg mb-4">{t('overview') || 'Overview'}</h4>
                       <p className="text-sm text-slate-blue dark:text-denim leading-relaxed font-semibold">
                         {exam.description}
                       </p>
                    </div>
                 </div>
               </div>
            )}
            
            {activeTab === 'dos' && (
              <>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <h3 className="text-2xl font-black flex items-center gap-3">
                        <CheckCircle2 className="text-green-500" /> {t('examDayDos') || 'Exam Day DOs'}
                      </h3>
                      <div className="space-y-4">
                        {exam.dos?.map((item: string, i: number) => (
                          <div key={i} className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl font-bold">
                            {item}
                          </div>
                        )) || <p>No DOs data.</p>}
                      </div>
                   </div>
                   <div className="space-y-8">
                      <h3 className="text-2xl font-black flex items-center gap-3">
                        <ShieldAlert className="text-red-500" /> {t('criticalDonts') || 'Critical DONTs'}
                      </h3>
                      <div className="space-y-4">
                        {exam.donts?.map((item: string, i: number) => (
                          <div key={i} className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl font-bold">
                            {item}
                          </div>
                        )) || <p>No DONTs data.</p>}
                      </div>
                   </div>
                 </div>

                 {/* Community Section */}
                 <div className="pt-12 mt-12 border-t border-slate-blue/10 dark:border-white/5 space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-ink dark:text-eggshell">
                        <span className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                           <Globe size={24} />
                        </span>
                        {t('communityInsights') || 'Community Insights'}
                      </h3>
                      <button className="px-4 py-2 bg-slate-blue text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-slate-blue/90 transition-colors">
                         + Add Tip
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                       {/* Mock Community Posts */}
                       {(exam.communityPosts || []).map((post: any, i: number) => (
                         <div key={i} className="p-6 bg-white dark:bg-black/40 border border-slate-blue/10 dark:border-white/10 rounded-xl relative group">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="size-8 rounded-full bg-black flex items-center justify-center font-black text-xs text-white">
                                {post.user.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-ink dark:text-eggshell">{post.user}</p>
                                <p className="text-[10px] font-bold text-slate-blue uppercase tracking-wider opacity-60">{post.role}</p>
                              </div>
                              {post.verified && (
                                <span className="ml-auto text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1">
                                  <CheckCircle2 size={10} /> Verified
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-slate-blue dark:text-denim leading-relaxed">
                              "{post.tip}"
                            </p>
                         </div>
                       ))}
                    </div>
                 </div>
              </>
            )}

            {activeTab === 'guides' && (
                  <div className="space-y-12">
                     <div className="space-y-6">
                       <h3 className="text-2xl font-black flex items-center gap-3">
                         <Globe className="text-slate-blue" /> {t('officialQuickLinks') || 'Official Quick Links'}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {exam.prominentLinks?.map((link: any, i: number) => (
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
                          <BookMarked className="text-slate-blue" /> {t('preparationRoadmap') || 'Preparation Roadmap'}
                        </h3>
                        <span className="text-xs font-black px-4 py-2 bg-slate-blue/10 rounded-full">15+ {t('daysFound') || 'Resources Found'}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                         {exam.guides?.map((guide: any, i: number) => (
                           <a 
                             key={i} 
                             href={guide.url} 
                             target="_blank" 
                             rel="noreferrer"
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
                       <Layout className="text-slate-blue" /> {t('latestUpdates') || 'Latest Updates'}
                    </h3>
                    <div className="space-y-4">
                      {exam.news?.map((item: any, i: number) => (
                        <div key={i} className="p-6 bg-white dark:bg-black/40 border border-slate-blue/10 dark:border-white/10 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-blue/30 transition-all">
                           <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-blue bg-slate-blue/5 px-2 py-1 rounded-md">{item.source || 'News'}</span>
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
                       desc={`Recommended for ${exam.name}: 3.5cm x 4.5cm, 20kb-50kb.`} 
                       action="Launch Studio"
                    />
                    <ToolActionCard 
                       icon={<FileText size={32} />} 
                       title="PDF Toolkit" 
                       desc={`Compress marksheet. Limit: ${exam.fileSizeLimit}.`} 
                       action="Open Tools"
                    />
                    <ToolActionCard 
                       icon={<CalendarDays size={32} />} 
                       title="Date Stamper" 
                       desc="Automatically add the date of photograph as required." 
                       action="Stamp Image"
                    />
                  </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
