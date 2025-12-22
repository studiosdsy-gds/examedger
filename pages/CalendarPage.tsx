
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';
import { EXAMS } from '../data/examsData';
import { fetchLiveExamDates } from '../src/services/examService';
import { Link } from 'react-router-dom';

interface CalendarPageProps {
  isDarkMode: boolean; // Kept for prop compatibility though context is better
  isLoggedIn: boolean;
  onLoginRequest: () => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ isDarkMode, isLoggedIn, onLoginRequest }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [exams, setExams] = useState(EXAMS);

  // Load live data
  useEffect(() => {
    const loadExams = async () => {
      const liveExams = await fetchLiveExamDates();
      setExams(liveExams);
    };
    loadExams();
  }, []);

  // Helper to standardise date strings to YYYY-MM-DD for comparison
  const formatDateKey = (date: Date) => {
    // Helper to format as YYYY-MM-DD using local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);

  // Map exams to dates
  const eventsByDate = exams.reduce((acc, exam) => {
    // Check all date fields
    const dateFields: { key: string, label: string, dateStr: string }[] = [
        { key: 'examDate', label: 'Exam Date', dateStr: exam.dates.examDate },
        { key: 'registrationEnd', label: 'Reg. End', dateStr: exam.dates.registrationEnd },
        { key: 'admitCardDate', label: 'Admit Card', dateStr: exam.dates.admitCardDate },
        { key: 'resultDate', label: 'Result', dateStr: exam.dates.resultDate },
    ];

    dateFields.forEach(({ label, dateStr }) => {
        if (dateStr && dateStr !== 'TBA') {
             // Handle simple dates YYYY-MM-DD
             if (!acc[dateStr]) acc[dateStr] = [];
             acc[dateStr].push({ ...exam, eventLabel: label });
        }
    });

    return acc;
  }, {} as Record<string, any[]>);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  // Get selected events
  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const selectedEvents = selectedDateKey ? (eventsByDate[selectedDateKey] || []) : [];

  return (
    <div className="flex flex-col lg:flex-row h-full gap-8 relative overflow-hidden pb-10">
      
      {/* Calendar Area */}
      <div className={`flex-1 transition-all duration-300 ${selectedDate ? 'lg:mr-[400px]' : ''}`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-ink dark:text-eggshell tracking-tighter mb-2">
              Exam Calendar
            </h1>
            <p className="text-slate-blue dark:text-denim font-bold opacity-80">
              Track important dates for 2026.
            </p>
          </div>
          <div className="flex items-center justify-between md:justify-start gap-4 bg-white dark:bg-space p-2 rounded-2xl shadow-sm border border-slate-blue/10 dark:border-white/10 w-full md:w-auto">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-blue/5 rounded-xl transition-colors flex-shrink-0">
              <ChevronLeft className="text-slate-blue dark:text-denim" />
            </button>
            <span className="font-black text-xl flex-1 text-center md:flex-none md:w-40 text-ink dark:text-eggshell whitespace-nowrap">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={handleNextMonth} className="p-2 hover:bg-slate-blue/5 rounded-xl transition-colors flex-shrink-0">
              <ChevronRight className="text-slate-blue dark:text-denim" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-white dark:bg-space rounded-[2rem] p-8 shadow-xl border border-slate-blue/10 dark:border-white/10">
          <div className="grid grid-cols-7 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-black text-slate-blue/40 dark:text-denim/40 uppercase tracking-widest text-xs py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square md:aspect-auto md:h-[110px]" />
            ))}
            {Array.from({ length: days }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dateKey = formatDateKey(date);
              const events = eventsByDate[dateKey] || [];
              const isSelected = selectedDate && formatDateKey(selectedDate) === dateKey;
              const isToday = formatDateKey(new Date()) === dateKey;

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square md:aspect-auto md:h-[110px] rounded-2xl border flex flex-col items-center justify-start py-2 relative overflow-hidden transition-all ${
                    isSelected 
                      ? 'bg-slate-blue text-white border-slate-blue ring-4 ring-slate-blue/20 z-10'
                      : isToday
                        ? 'bg-slate-blue/5 border-slate-blue text-slate-blue' 
                        : (events.some(e => e.eventLabel.includes('Exam')) ? 'md:bg-eggshell/20 md:dark:bg-black/20 bg-red-100 border-red-200 text-red-700' :
                           events.some(e => e.eventLabel.includes('Admit')) ? 'md:bg-eggshell/20 md:dark:bg-black/20 bg-yellow-100 border-yellow-200 text-yellow-800' :
                           events.some(e => e.eventLabel.includes('Result')) ? 'md:bg-eggshell/20 md:dark:bg-black/20 bg-green-100 border-green-200 text-green-800' :
                           events.some(e => e.eventLabel.includes('Reg')) ? 'md:bg-eggshell/20 md:dark:bg-black/20 bg-blue-100 border-blue-200 text-blue-800' :
                           'bg-eggshell/20 dark:bg-black/20 border-transparent hover:border-slate-blue/20 text-ink dark:text-eggshell')
                  }`}
                >
                  <span className={`text-sm font-black ${isSelected ? 'text-white' : ''} ${isToday && !isSelected ? 'text-slate-blue' : ''}`}>{day}</span>
                  
                  {/* Events Display */}
                  <div className="w-full mt-1 px-1">
                    {/* Desktop View: Exam Names */}
                    <div className="hidden md:flex flex-col gap-1">
                      {events.slice(0, 3).map((event, idx) => (
                        <div 
                          key={`${event.id}-${idx}`}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate text-left ${
                            isSelected 
                              ? 'bg-white/20 text-white' 
                              : idx % 2 === 0 ? 'bg-slate-blue/10 text-slate-blue' : 'bg-red-400/10 text-red-500'
                          }`}
                        >
                          {event.name}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className={`text-[9px] font-black px-1.5 text-left ${isSelected ? 'text-white/60' : 'text-slate-blue/40'}`}>
                          +{events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4 items-center justify-center md:justify-start px-4">
             <div className="flex items-center gap-2">
               <div className="size-3 rounded-full bg-red-100 border border-red-200" />
               <span className="text-xs font-bold text-slate-blue dark:text-denim">Exam Date</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="size-3 rounded-full bg-blue-100 border border-blue-200" />
               <span className="text-xs font-bold text-slate-blue dark:text-denim">Registration</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="size-3 rounded-full bg-yellow-100 border border-yellow-200" />
               <span className="text-xs font-bold text-slate-blue dark:text-denim">Admit Card</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="size-3 rounded-full bg-green-100 border border-green-200" />
               <span className="text-xs font-bold text-slate-blue dark:text-denim">Result</span>
             </div>
          </div>
        </div>
      </div>

      {/* Sidebar Details Panel */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full lg:w-[400px] bg-white dark:bg-black z-50 lg:z-0 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-slate-blue/10 dark:border-white/10 lg:absolute lg:h-full lg:rounded-l-3xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-blue/10 dark:border-white/10 flex items-center justify-between bg-slate-blue/5 dark:bg-white/5">
              <div>
                <h2 className="text-2xl font-black text-ink dark:text-eggshell">
                  {selectedDate.getDate()} {selectedDate.toLocaleString('default', { month: 'long' })}
                </h2>
                <p className="text-slate-blue dark:text-denim font-bold text-xs uppercase tracking-widest">
                  {selectedDate.toLocaleString('default', { weekday: 'long' })}
                </p>
              </div>
              <button 
                onClick={() => setSelectedDate(null)}
                className="p-2 bg-white dark:bg-black rounded-full shadow-sm hover:scale-110 transition-transform"
              >
                <X size={20} className="text-ink dark:text-eggshell" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event, idx) => (
                  <div 
                    key={`${event.id}-${idx}`} 
                    className="p-5 rounded-2xl bg-eggshell/50 dark:bg-white/5 border border-slate-blue/10 dark:border-white/10 group hover:border-slate-blue/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                        event.eventLabel.includes('Exam') ? 'bg-red-100 text-red-600' : 
                        event.eventLabel.includes('Admit') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {event.eventLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-blue dark:text-denim opacity-60">
                         {event.type}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-black text-ink dark:text-eggshell mb-1 leading-tight">
                      {event.name}
                    </h3>
                    <p className="text-xs text-slate-blue dark:text-denim font-bold line-clamp-1 mb-4">
                      {event.fullName}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        to={`/exams/${event.id}`}
                        className="flex items-center justify-center gap-2 py-2 rounded-xl bg-ink dark:bg-eggshell text-eggshell dark:text-ink text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        Details <ArrowRight size={12} />
                      </Link>
                      {event.officialWebsite && (
                        <a 
                           href={event.officialWebsite}
                           target="_blank"
                           rel="noreferrer"
                           className="flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-blue/20 dark:border-white/20 text-slate-blue dark:text-denim text-xs font-black uppercase tracking-wider hover:bg-slate-blue/5 transition-colors"
                        >
                          Website <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-50">
                   <div className="size-16 bg-slate-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                     <CalendarIcon size={32} className="text-slate-blue" />
                   </div>
                   <p className="font-bold text-slate-blue dark:text-denim">No events scheduled for this day.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;