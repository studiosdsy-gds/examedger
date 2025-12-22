import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Camera, Loader2, Check } from 'lucide-react';
import { supabase } from '../src/services/supabaseClient';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    profile: any;
    onUpdate: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, profile, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'password'>('details');
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState(profile?.full_name || '');
    // Password state
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passMessage, setPassMessage] = useState({ type: '', text: '' });

    if (!isOpen) return null;

    const handleUpdateName = async () => {
        if (!fullName.trim() || fullName === profile?.full_name) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', user.id);
            
            if (error) throw error;
            onUpdate();
            onClose();
        } catch (e: any) {
            alert('Error updating name: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword.length < 6) {
            setPassMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPassMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setPassMessage({ type: 'success', text: 'Password updated successfully!' });
            setNewPassword('');
            setConfirmPassword('');
        } catch (e: any) {
            setPassMessage({ type: 'error', text: e.message });
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setLoading(true);
        try {
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('user-uploads')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('user-uploads')
                .getPublicUrl(filePath);

            await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            onUpdate();
        } catch (error: any) {
            alert('Error updating avatar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                     {/* Backdrop */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                    />
                    
                    {/* Modal */}
                    <div className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white dark:bg-space rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border border-slate-blue/10 dark:border-white/10 flex flex-col max-h-[90vh]"
                        >
                             {/* Header */}
                             <div className="flex items-center justify-between p-4 border-b border-slate-blue/5 dark:border-white/5">
                                <h3 className="text-lg font-black text-ink dark:text-eggshell tracking-tight">Edit Profile</h3>
                                <button onClick={onClose} className="p-2 hover:bg-slate-blue/5 dark:hover:bg-white/5 rounded-full transition-colors text-slate-blue dark:text-denim">
                                    <X size={20} />
                                </button>
                             </div>

                             {/* Tabs */}
                             <div className="flex border-b border-slate-blue/5 dark:border-white/5">
                                 <button
                                    onClick={() => setActiveTab('details')}
                                    className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'details' ? 'bg-slate-blue/5 dark:bg-white/5 text-ink dark:text-eggshell border-b-2 border-slate-blue dark:border-white' : 'text-slate-blue dark:text-denim hover:bg-slate-blue/5 dark:hover:bg-white/5'}`}
                                 >
                                     Details
                                 </button>
                                 <button
                                    onClick={() => setActiveTab('password')}
                                    className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === 'password' ? 'bg-slate-blue/5 dark:bg-white/5 text-ink dark:text-eggshell border-b-2 border-slate-blue dark:border-white' : 'text-slate-blue dark:text-denim hover:bg-slate-blue/5 dark:hover:bg-white/5'}`}
                                 >
                                     Security
                                 </button>
                             </div>

                             {/* Content */}
                             <div className="p-6 overflow-y-auto">
                                {activeTab === 'details' ? (
                                    <div className="space-y-6">
                                        {/* Avatar Edit */}
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="relative group">
                                               <div className="size-24 rounded-full bg-slate-blue/10 dark:bg-white/10 flex items-center justify-center overflow-hidden border-2 border-slate-blue/20 dark:border-white/20">
                                                   {profile?.avatar_url ? (
                                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                                   ) : (
                                                        <div className="text-3xl font-black text-slate-blue dark:text-denim opacity-50">
                                                            {(profile?.full_name || 'U').charAt(0).toUpperCase()}
                                                        </div>
                                                   )}
                                               </div>
                                               <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                                                    <Camera className="text-white" size={20} />
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                                               </label>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-blue dark:text-denim uppercase tracking-wider opacity-60">Tap to Change Photo</p>
                                        </div>

                                        {/* Name Edit */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-ink dark:text-eggshell uppercase tracking-wider">Full Name</label>
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-blue/40" size={16} />
                                                    <input 
                                                        type="text" 
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        className="w-full pl-9 pr-4 py-3 bg-slate-blue/5 dark:bg-black/20 border border-slate-blue/10 dark:border-white/10 rounded-xl text-sm font-bold text-ink dark:text-eggshell focus:outline-none focus:border-slate-blue dark:focus:border-white transition-colors"
                                                        placeholder="Enter your name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                         
                                        <button 
                                            onClick={handleUpdateName}
                                            disabled={loading || !fullName.trim() || fullName === profile?.full_name}
                                            className="w-full py-3 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={16} /> : <span className="flex items-center gap-2">Save Changes <Check size={14} /></span>}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="bg-slate-blue/5 dark:bg-white/5 p-4 rounded-xl">
                                             <h4 className="text-sm font-black text-ink dark:text-eggshell mb-1">Password Management</h4>
                                             <p className="text-xs font-medium text-slate-blue dark:text-denim opacity-70">
                                                 Set a new password to login with your email address. If you authenticated via Google/Discord, this creates a specific password for your account.
                                             </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-ink dark:text-eggshell uppercase tracking-wider">New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-blue/40" size={16} />
                                                    <input 
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full pl-9 pr-4 py-3 bg-slate-blue/5 dark:bg-black/20 border border-slate-blue/10 dark:border-white/10 rounded-xl text-sm font-bold text-ink dark:text-eggshell focus:outline-none focus:border-slate-blue dark:focus:border-white transition-colors"
                                                        placeholder="Min 6 characters"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-ink dark:text-eggshell uppercase tracking-wider">Confirm Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-blue/40" size={16} />
                                                    <input 
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full pl-9 pr-4 py-3 bg-slate-blue/5 dark:bg-black/20 border border-slate-blue/10 dark:border-white/10 rounded-xl text-sm font-bold text-ink dark:text-eggshell focus:outline-none focus:border-slate-blue dark:focus:border-white transition-colors"
                                                        placeholder="Re-enter password"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {passMessage.text && (
                                            <div className={`p-3 rounded-xl text-xs font-bold ${passMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                                {passMessage.text}
                                            </div>
                                        )}

                                        <button 
                                            onClick={handleUpdatePassword}
                                            disabled={loading || !newPassword || !confirmPassword}
                                            className="w-full py-3 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Update Password'}
                                        </button>
                                    </div>
                                )}
                             </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditProfileModal;
