
import React from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageSquare, Heart } from 'lucide-react';

export const AboutPage = () => (
  <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-5xl font-black tracking-tighter mb-8 text-ink dark:text-eggshell uppercase">Empowering India.</h2>
       <p className="text-xl text-slate-blue dark:text-denim/60 leading-relaxed font-semibold">
        ExamEdger was born out of a simple realization: Indian competitive exams are tough enough without the added stress of technical hurdles.
      </p>
    </div>
  </div>
);

export const ContactPage = () => (
  <div className="max-w-6xl mx-auto space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
    
    {/* Section 1: About Us / Mission */}
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 text-ink dark:text-eggshell uppercase">Reach Us</h2>
        <p className="text-xl text-slate-blue dark:text-denim/60 leading-relaxed font-semibold">
           We are building the future of exam preparation in India. Here is who we are and how you can find us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-space/40 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 space-y-4 shadow-sm hover:border-slate-blue/30 transition-colors">
          <Heart className="text-slate-blue dark:text-denim" size={32} />
          <h3 className="text-2xl font-bold text-ink dark:text-eggshell">Our Mission</h3>
          <p className="text-slate-blue dark:text-denim/60 leading-relaxed font-medium">
            To provide a zero-friction portal for students where they can manage every aspect of their exam preparation—from document optimization to performance tracking—in one unified space.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-space/40 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 space-y-4 shadow-sm hover:border-slate-blue/30 transition-colors">
          <MapPin className="text-slate-blue dark:text-denim" size={32} />
          <h3 className="text-2xl font-bold text-ink dark:text-eggshell">Our Reach</h3>
          <p className="text-slate-blue dark:text-denim/60 leading-relaxed font-medium">
            Based out of Bengaluru, we currently support over 50+ major national and state-level exams, serving a growing community of 100k+ aspirants across India.
          </p>
        </div>
      </div>
    </div>

    {/* Section 2: Contact Form & Info */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-slate-blue/5 dark:border-white/5">
      <div className="space-y-12">
        <div>
          <h3 className="text-4xl font-black tracking-tighter mb-6 text-ink dark:text-eggshell uppercase">Get in Touch</h3>
          <p className="text-xl text-slate-blue dark:text-denim/60 font-semibold">
            Have questions? We're here to help you clear every hurdle in your journey.
          </p>
        </div>

        <div className="space-y-8">
          <ContactItem icon={<Mail />} label="Email Us" val="support@examedger.com" />
          <ContactItem icon={<Phone />} label="Call Us" val="+91 80 4567 8910" />
          <ContactItem icon={<MapPin />} label="Visit Us" val="Indiranagar, Bengaluru, KA" />
        </div>

        <div className="flex gap-4 pt-8">
          {[Twitter, Linkedin, Github].map((Icon, i) => (
            <button key={i} className="size-12 bg-white dark:bg-space/40 rounded-2xl flex items-center justify-center text-slate-blue dark:text-denim hover:bg-ink dark:hover:bg-eggshell hover:text-eggshell dark:hover:text-ink transition-all border border-slate-blue/10 dark:border-slate-blue/20">
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-space/40 p-10 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 space-y-8 shadow-2xl">
         <h3 className="text-2xl font-black flex items-center gap-3 text-ink dark:text-eggshell">
           <MessageSquare className="text-slate-blue dark:text-denim" /> Send a Message
         </h3>
         <form className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40">Your Name</label>
               <input type="text" className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl px-5 py-4 focus:ring-1 focus:ring-slate-blue outline-none text-ink dark:text-eggshell font-bold" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40">Email Address</label>
               <input type="email" className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl px-5 py-4 focus:ring-1 focus:ring-slate-blue outline-none text-ink dark:text-eggshell font-bold" />
             </div>
           </div>
           <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40">Subject</label>
               <input type="text" className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl px-5 py-4 focus:ring-1 focus:ring-slate-blue outline-none text-ink dark:text-eggshell font-bold" />
           </div>
           <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-blue/40">Message</label>
               <textarea rows={5} className="w-full bg-eggshell/20 dark:bg-ink border border-slate-blue/10 dark:border-slate-blue/20 rounded-xl px-5 py-4 focus:ring-1 focus:ring-slate-blue outline-none text-ink dark:text-eggshell font-bold resize-none"></textarea>
           </div>
           <button className="w-full py-5 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-ink/10">
             Send Message
           </button>
         </form>
      </div>
    </div>
  </div>
);

const ContactItem = ({ icon, label, val }: any) => (
  <div className="flex gap-6 items-center group">
    <div className="size-16 bg-white dark:bg-space/40 rounded-3xl flex items-center justify-center text-slate-blue dark:text-denim border border-slate-blue/10 dark:border-slate-blue/20 group-hover:bg-ink dark:group-hover:bg-eggshell group-hover:text-eggshell dark:group-hover:text-ink transition-all shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-blue/30 dark:text-denim/30 mb-1">{label}</p>
      <p className="text-xl font-bold text-ink dark:text-eggshell group-hover:text-slate-blue transition-colors">{val}</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-space rounded-huge p-8 md:p-12 border border-slate-blue/10 dark:border-white/10 shadow-sm">
        <h1 className="text-4xl font-black text-ink dark:text-eggshell mb-6 tracking-tighter">Terms & Conditions</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-slate-blue dark:text-denim opacity-80 font-medium">
            Terms and conditions content will be updated shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-space rounded-huge p-8 md:p-12 border border-slate-blue/10 dark:border-white/10 shadow-sm">
        <h1 className="text-4xl font-black text-ink dark:text-eggshell mb-6 tracking-tighter">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-slate-blue dark:text-denim opacity-80 font-medium">
            Privacy policy content will be updated shortly.
          </p>
        </div>
      </div>
    </div>
  );
};
