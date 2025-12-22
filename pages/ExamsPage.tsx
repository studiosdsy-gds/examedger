
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  Clock, 
  FileText,
  Filter,
  GraduationCap
} from 'lucide-react';
import { EXAMS } from '../data/examsData';
import { fetchLiveExamDates } from '../src/services/examService';
import { Link } from 'react-router-dom';

const ExamsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exams, setExams] = useState(EXAMS);

  useEffect(() => {
    const loadExams = async () => {
      const liveExams = await fetchLiveExamDates();
      setExams(liveExams);
    };
    loadExams();
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exam.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exam.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Engineering', 'Medical', 'Civil Services', 'Defense', 'Management', 'Law'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-ink dark:text-eggshell tracking-tighter">
            Exam Directory
          </h1>
          <p className="text-lg text-slate-blue dark:text-denim font-bold max-w-2xl">
            Complete information for all major Indian entrance examinations for 2026.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 sticky top-0 py-4 bg-eggshell/80 dark:bg-ink/80 backdrop-blur-xl z-20">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-blue dark:text-denim" size={20} />
          <input 
            type="text"
            placeholder="Search exams (e.g. JEE, UPSC)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-space rounded-2xl border-2 border-transparent focus:border-slate-blue/20 dark:focus:border-white/20 outline-none font-bold text-ink dark:text-eggshell placeholder:text-slate-blue/40 dark:placeholder:text-denim/40 shadow-sm transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-4 rounded-xl font-black uppercase tracking-wider text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat
                ? 'bg-ink dark:bg-eggshell text-eggshell dark:text-ink shadow-lg scale-105'
                : 'bg-white dark:bg-space text-slate-blue dark:text-denim hover:bg-slate-blue/5 dark:hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <Link 
            to={`/exams/${exam.id}`}
            key={exam.id}
            className="block h-full"
          >
            <motion.div
              layoutId={exam.id}
              whileHover={{ y: -5 }}
              className={`group bg-white dark:bg-space rounded-3xl p-6 md:p-8 border transition-all duration-300 relative overflow-hidden h-full flex flex-col ${
                exam.status === 'OPEN' 
                ? 'border-green-500/50 shadow-[0_0_30px_-5px_rgba(34,197,94,0.1)]' 
                : 'border-slate-blue/10 dark:border-white/10 hover:border-slate-blue/30 dark:hover:border-white/20 shadow-xl hover:shadow-2xl'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-lg bg-slate-blue/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-blue dark:text-denim mb-3">
                    {exam.type}
                  </span>
                  <h3 className="text-2xl font-black text-ink dark:text-eggshell tracking-tight mb-1 group-hover:text-slate-blue dark:group-hover:text-white transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-blue dark:text-denim opacity-60">
                    {exam.fullName}
                  </p>
                </div>
                {exam.status === 'OPEN' && (
                   <span className="flex h-3 w-3 relative">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                   </span>
                )}
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-blue dark:text-denim">
                   <div className="p-2 bg-slate-blue/5 dark:bg-white/5 rounded-lg">
                     <Clock size={16} />
                   </div>
                   <span>{exam.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-blue dark:text-denim">
                   <div className="p-2 bg-slate-blue/5 dark:bg-white/5 rounded-lg">
                     <FileText size={16} />
                   </div>
                   <span>{exam.mode}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-blue dark:text-denim">
                   <div className="p-2 bg-slate-blue/5 dark:bg-white/5 rounded-lg">
                     <Calendar size={16} />
                   </div>
                   <span className={`${exam.dates.examDate && exam.dates.examDate !== 'TBA' ? 'text-green-600 dark:text-green-400' : ''}`}>
                     {exam.dates.examDate ? `Exam: ${exam.dates.examDate}` : 'Date TBA'}
                   </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-blue/5 dark:border-white/5 mt-auto">
                <span className="text-xs font-black uppercase tracking-widest text-slate-blue dark:text-denim opacity-60">
                   View Details
                </span>
                <div className="h-10 w-10 rounded-full bg-slate-blue text-white dark:bg-eggshell dark:text-ink flex items-center justify-center group-hover:scale-110 transition-transform">
                   <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExamsPage;
