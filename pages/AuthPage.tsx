
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome as Google } from 'lucide-react';

interface AuthPageProps {
  onAuthComplete: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 animate-in fade-in duration-300">
      <div className="w-full max-w-md perspective-1000 relative h-[500px]">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              <AuthCard 
                title="Sign In" 
                subtitle="Welcome back to ExamEdger" 
                buttonText="Login to Dashboard"
                toggleText="Don't have an account? Create one"
                onToggle={() => setIsLogin(false)}
                onSubmit={onAuthComplete}
              >
                <AuthInput icon={<Mail size={18} />} placeholder="Email Address" type="email" />
                <AuthInput icon={<Lock size={18} />} placeholder="Password" type="password" />
              </AuthCard>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              <AuthCard 
                title="Create Account" 
                subtitle="Join 100k+ students across India" 
                buttonText="Register Now"
                toggleText="Already have an account? Sign in"
                onToggle={() => setIsLogin(true)}
                onSubmit={onAuthComplete}
              >
                <AuthInput icon={<User size={18} />} placeholder="Full Name" type="text" />
                <AuthInput icon={<Mail size={18} />} placeholder="Email Address" type="email" />
                <AuthInput icon={<Lock size={18} />} placeholder="Create Password" type="password" />
              </AuthCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AuthCard = ({ title, subtitle, buttonText, toggleText, onToggle, children, onSubmit }: any) => (
  <div className="bg-white dark:bg-space border border-slate-blue/10 dark:border-white/10 rounded-huge p-10 flex flex-col justify-between h-full shadow-2xl">
    <div>
      <h2 className="text-4xl font-black tracking-tighter mb-2 text-ink dark:text-eggshell">{title}</h2>
      <p className="text-slate-blue dark:text-denim font-bold mb-8">{subtitle}</p>
      
      <div className="space-y-4">
        {children}
      </div>

      <button 
        onClick={onSubmit}
        className="w-full py-4 mt-8 bg-ink dark:bg-slate-blue text-eggshell dark:text-white rounded-xl font-black flex items-center justify-center gap-3 hover-fast active:scale-95 shadow-xl shadow-ink/10"
      >
        {buttonText} <ArrowRight size={20} />
      </button>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-blue/10 dark:bg-white/5" />
        <span className="text-[10px] font-black uppercase tracking-widest opacity-20 text-slate-blue dark:text-denim">or continue with</span>
        <div className="h-px flex-1 bg-slate-blue/10 dark:bg-white/5" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <SocialButton icon={<Google size={20} />} label="Google" />
        <SocialButton icon={<div className="font-black text-[10px]">Discord</div>} label="Discord" />
      </div>
    </div>

    <button 
      onClick={onToggle}
      className="mt-10 text-xs font-black uppercase tracking-widest text-slate-blue dark:text-denim hover:text-ink dark:hover:text-slate-blue hover-fast"
    >
      {toggleText}
    </button>
  </div>
);

const AuthInput = ({ icon, placeholder, type }: any) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-blue/30 dark:text-denim/30 group-focus-within:text-ink dark:group-focus-within:text-slate-blue transition-colors">
      {icon}
    </div>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full pl-12 pr-6 py-4 bg-eggshell/20 dark:bg-black/60 border border-slate-blue/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-slate-blue dark:focus:border-slate-blue text-sm font-bold text-ink dark:text-eggshell placeholder-slate-blue/30 dark:placeholder-denim/30 shadow-sm"
    />
  </div>
);

const SocialButton = ({ icon, label }: any) => (
  <button className="flex items-center justify-center gap-3 py-3 px-4 border border-slate-blue/10 dark:border-white/10 rounded-xl bg-white dark:bg-black/40 hover:bg-slate-blue/5 dark:hover:bg-card-hover hover-fast transition-all shadow-sm">
    <div className="text-slate-blue dark:text-denim">{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest text-slate-blue dark:text-denim">{label}</span>
  </button>
);

export default AuthPage;
