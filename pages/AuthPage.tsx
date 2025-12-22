
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome as Google, BookOpen, Zap, BarChart3, X } from 'lucide-react';
import { signInWithGoogle, signInWithDiscord, signUpWithEmail, signInWithEmail } from '../src/services/authService';

interface AuthPageProps {
  onAuthComplete: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthComplete }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        if (isLogin) {
            const { error } = await signInWithEmail(formData.email, formData.password);
            if (error) throw error;
        } else {
            const { error } = await signUpWithEmail(formData.email, formData.password);
            if (error) throw error;
        }
        onAuthComplete();
    } catch (error: any) {
        alert(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden z-[200] flex items-center justify-center p-4 md:p-0 bg-eggshell/80 dark:bg-ink/80 backdrop-blur-md">
      <div className="relative w-full max-w-[1200px] h-auto min-h-[500px] md:h-[80vh] grid md:grid-cols-2 gap-0 bg-white dark:bg-space rounded-3xl shadow-2xl overflow-hidden border border-slate-blue/10 dark:border-white/5">
        
        {/* Close Button */}
        <button 
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 z-50 p-2 bg-black/5 dark:bg-white/10 text-ink dark:text-eggshell rounded-full hover:rotate-90 transition-all hover:bg-red-50 hover:text-red-500"
        >
            <X size={24} />
        </button>

        {/* Left Side (Desktop Only) - Features */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-blue/5 dark:bg-white/5 relative z-20">
            <div>
                <h1 className="text-4xl font-display font-black text-ink dark:text-eggshell mb-2 tracking-tighter">
                    ExamEdger <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent font-iceland">
  IN
</span>
                </h1>
                <p className="text-lg font-bold text-slate-blue dark:text-denim mb-12">
                   Master your exams with precision and strategy.
                </p>
                
                <div className="space-y-8">
                    <FeatureItem 
                        icon={<BookOpen size={24} />} 
                        title="Structured Guides" 
                        desc="Access comprehensive syllabus breakdowns and study materials." 
                    />
                    <FeatureItem 
                        icon={<Zap size={24} />} 
                        title="Live Updates" 
                        desc="Stay ahead with real-time notifications for critical dates." 
                    />
                    <FeatureItem 
                        icon={<BarChart3 size={24} />} 
                        title="Smart Analytics" 
                        desc="Detailed performance tracking to identify weak spots." 
                    />
                </div>
            </div>

            <div className="text-xs font-bold text-slate-blue/40 dark:text-denim/40 uppercase tracking-widest">
                © 2025 ExamEdger India
            </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="relative w-full h-full flex flex-col z-10 min-h-[500px]">
           <div className="relative w-full h-full perspective-1000">
             <AnimatePresence mode="wait">
               {isLogin ? (
                 <motion.div
                   key="login"
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ x: 20, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0 w-full h-full p-6 md:p-16 flex flex-col justify-center bg-white dark:bg-space"
                 >
                   <AuthFormContent
                     title="Sign In"
                     subtitle="Enter your Edge ID or Email."
                     buttonText={loading ? "Loading..." : "Login"}
                     toggleText="New here? Create Account"
                     onToggle={() => setIsLogin(false)}
                     onSubmit={handleSubmit}
                   >
                     <AuthInput 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         icon={<Mail size={20} />} 
                         placeholder="Email or Edge ID" 
                         type="text" 
                     />
                     <AuthInput 
                         name="password"
                         value={formData.password}
                         onChange={handleChange}
                         icon={<Lock size={20} />} 
                         placeholder="Password" 
                         type="password" 
                     />
                   </AuthFormContent>
                 </motion.div>
               ) : (
                 <motion.div
                   key="signup"
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ x: 20, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0 w-full h-full p-6 md:p-16 flex flex-col justify-center bg-white dark:bg-space"
                 >
                   <AuthFormContent
                     title="Create Account"
                     subtitle="Join thousands of aspirants today."
                     buttonText={loading ? "Creating..." : "Sign Up"}
                     toggleText="Have an account? Login"
                     onToggle={() => setIsLogin(true)}
                     onSubmit={handleSubmit}
                   >
                     <AuthInput 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         icon={<Mail size={20} />} 
                         placeholder="Email Address" 
                         type="email" 
                     />
                     <AuthInput 
                         name="password"
                         value={formData.password}
                         onChange={handleChange}
                         icon={<Lock size={20} />} 
                         placeholder="Create Password" 
                         type="password" 
                     />
                   </AuthFormContent>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>

      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }: any) => (
    <div className="flex items-start gap-4">
        <div className="p-3 bg-white dark:bg-black rounded-xl text-slate-blue dark:text-white shadow-sm shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="font-black text-ink dark:text-eggshell text-lg mb-1">{title}</h3>
            <p className="font-medium text-slate-blue dark:text-denim text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const AuthFormContent = ({ title, subtitle, buttonText, toggleText, onToggle, children, onSubmit }: any) => (
    <div className="flex flex-col h-full max-w-md mx-auto justify-center w-full">
        <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 text-ink dark:text-eggshell">{title}</h2>
            <p className="text-slate-blue dark:text-denim font-bold text-sm md:text-base">{subtitle}</p>
        </div>
        
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {children}
        </div>

        <button 
            onClick={onSubmit}
            className="w-full py-4 bg-ink dark:bg-white text-eggshell dark:text-black rounded-xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-ink/10 dark:shadow-white/5"
        >
            {buttonText} <ArrowRight size={20} />
        </button>

        <div className="mt-6 md:mt-8 mb-4 md:mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-blue/10 dark:bg-white/5" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-30 text-slate-blue dark:text-denim">or</span>
            <div className="h-px flex-1 bg-slate-blue/10 dark:bg-white/5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <SocialButton 
                icon={<Google size={20} />} 
                label="Google" 
                onClick={async () => {
                    const { error } = await signInWithGoogle();
                    if (error) alert(error.message);
                }}
            />
            <SocialButton 
                icon={<div className="font-black text-[10px]">Discord</div>} 
                label="Discord" 
                onClick={async () => {
                    const { error } = await signInWithDiscord();
                    if (error) alert(error.message);
                }}
            />
        </div>

        <button 
            onClick={onToggle}
            className="mt-auto pt-6 md:pt-8 text-center text-xs font-black uppercase tracking-widest text-slate-blue dark:text-denim hover:text-ink dark:hover:text-white transition-colors"
        >
            {toggleText}
        </button>
    </div>
);

const AuthInput = ({ icon, placeholder, type, value, onChange, name }: any) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-blue/30 dark:text-denim/30 group-focus-within:text-ink dark:group-focus-within:text-slate-blue transition-colors">
      {icon}
    </div>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-6 py-4 bg-slate-blue/5 dark:bg-black/40 border border-slate-blue/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-slate-blue dark:focus:border-white text-sm font-bold text-ink dark:text-eggshell placeholder-slate-blue/30 dark:placeholder-denim/30 transition-all"
    />
  </div>
);

const SocialButton = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-blue/10 dark:border-white/10 rounded-xl bg-white dark:bg-black/40 hover:bg-slate-blue/5 dark:hover:bg-white/5 transition-all">
    <div className="text-slate-blue dark:text-denim">{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest text-slate-blue dark:text-denim">{label}</span>
  </button>
);

export default AuthPage;
