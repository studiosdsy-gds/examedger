
import React from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageSquare, Heart } from 'lucide-react';

export const AboutPage = () => (
  <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-5xl font-black tracking-tighter mb-8 text-ink dark:text-eggshell uppercase">Empowering India's Next Generation.</h2>
      <p className="text-xl text-slate-blue dark:text-denim/60 leading-relaxed font-semibold">
        ExamEdger was born out of a simple realization: Indian competitive exams are tough enough without the added stress of technical hurdles.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-8 bg-white dark:bg-space/40 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 space-y-4 shadow-sm">
        <Heart className="text-slate-blue dark:text-denim" size={32} />
        <h3 className="text-2xl font-bold text-ink dark:text-eggshell">Our Mission</h3>
        <p className="text-slate-blue dark:text-denim/60 leading-relaxed font-medium">
          To provide a zero-friction portal for students where they can manage every aspect of their exam preparation—from document optimization to performance tracking—in one unified space.
        </p>
      </div>
      <div className="p-8 bg-white dark:bg-space/40 rounded-huge border border-slate-blue/10 dark:border-slate-blue/20 space-y-4 shadow-sm">
        <MapPin className="text-slate-blue dark:text-denim" size={32} />
        <h3 className="text-2xl font-bold text-ink dark:text-eggshell">Our Reach</h3>
        <p className="text-slate-blue dark:text-denim/60 leading-relaxed font-medium">
          Based out of Bengaluru, we currently support over 50+ major national and state-level exams, serving a growing community of 100k+ aspirants across India.
        </p>
      </div>
    </div>

    <div className="space-y-6">
      <h3 className="text-3xl font-black text-ink dark:text-eggshell">Our Team</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="text-center group">
            <div className="aspect-square bg-slate-blue/5 dark:bg-white/5 rounded-huge mb-4 overflow-hidden relative group-hover:scale-105 transition-transform duration-500 border border-slate-blue/10 dark:border-white/10">
               <img src={`https://picsum.photos/400/400?random=${i}&grayscale`} alt="Team" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-bold text-sm text-ink dark:text-eggshell">Team Member {i}</p>
            <p className="text-xs text-slate-blue/40 dark:text-denim/40 font-black uppercase tracking-widest">Co-Founder / Dev</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ContactPage = () => (
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="space-y-12">
      <div>
        <h2 className="text-5xl font-black tracking-tighter mb-6 text-ink dark:text-eggshell uppercase">Get in Touch</h2>
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
