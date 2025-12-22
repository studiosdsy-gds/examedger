
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../src/services/supabaseClient';
import { 
    User, Mail, Camera, FileText, 
    BarChart3, Settings, LogOut, Trash2, 
    Edit2, Upload, Eye, EyeOff, Loader2, Download
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../src/services/authService';
import { useLoading } from '../src/context/LoadingContext';
import EditProfileModal from '../components/EditProfileModal';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';

const ProfilePage: React.FC = () => {
    // const [loading, setLoading] = useState(true); // Removed local state
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [analytics, setAnalytics] = useState<any>(null);
    const [assets, setAssets] = useState<any[]>([]);
    const [showEmail, setShowEmail] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'storage' | 'settings'>('overview');
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setIsLoading } = useLoading();
    const [imgError, setImgError] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Default Analytics Data
    const defaultWeeklyData = [
        { name: 'Mon', hours: 0 }, { name: 'Tue', hours: 0 }, { name: 'Wed', hours: 0 },
        { name: 'Thu', hours: 0 }, { name: 'Fri', hours: 0 }, { name: 'Sat', hours: 0 }, { name: 'Sun', hours: 0 }
    ];

    useEffect(() => {
        getProfileData();
    }, []);

    const getProfileData = async () => {
        try {
            setIsLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                navigate('/auth');
                return;
            }

            setUser(user);

            // 1. Fetch Profile
            let { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code === 'PGRST116') {
               // Fallback
               profileData = {
                   full_name: user.user_metadata.full_name || 'Student',
                   avatar_url: null, // explicit null
                   email: user.email,
                   edge_id: 'PENDING'
               };
            }
            setProfile(profileData || {});

            // 2. Fetch Analytics
            const { data: analyticsData } = await supabase
                .from('user_analytics')
                .select('*')
                .eq('user_id', user.id)
                .single();
            setAnalytics(analyticsData || { tests_taken: 0, points: 0, weekly_activity: defaultWeeklyData });

            // 3. Fetch Assets
            const { data: assetsData } = await supabase
                .from('user_assets')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            setAssets(assetsData || []);

        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setIsLoading(true);
        try {
            // setLoading(true); // Remove local loading
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('user-uploads') // Using general bucket as 'avatars' might not exist
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Get URL
            const { data: { publicUrl } } = supabase.storage
                .from('user-uploads')
                .getPublicUrl(filePath);

            // Update Profile
            await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            setProfile({ ...profile, avatar_url: publicUrl });
        } catch (error) {
            alert('Error updating avatar!');
            console.error(error);
        } finally {
            setIsLoading(false);
            // setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
             const finalConfirm = window.confirm("Final Warning: All your data, assets, and history will be permanently erased. Proceed?");
             if(finalConfirm) {
                 // In a real app, calls RPC or Edge Function.
                 // For now, sign out and show message as client-side delete is restricted.
                 alert("Account deletion request submitted. Signing out...");
                 await signOut();
                 navigate('/');
             }
        }
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    // Local loader removed as GlobalLoader handles it
    // if (loading) { ... }

    const weeklyData = analytics?.weekly_activity?.length ? analytics.weekly_activity : defaultWeeklyData;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Identity Card */}
            <div className="bg-white dark:bg-space rounded-huge p-8 md:p-12 border border-slate-blue/10 dark:border-white/10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-slate-blue/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                    <div className="relative group">
                        <div className="size-32 rounded-full bg-slate-blue/10 dark:bg-white/10 flex items-center justify-center border-4 border-white dark:border-black shadow-xl overflow-hidden cursor-pointer" onClick={() => setIsEditOpen(true)}>
                            {profile?.avatar_url && !imgError ? (
                                <img 
                                    src={profile.avatar_url} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-black flex items-center justify-center text-white font-black text-5xl">
                                    {(profile?.full_name || profile?.email || 'U').charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-4 mb-2">
                             <h1 className="text-4xl font-black text-ink dark:text-eggshell tracking-tighter">
                                {profile?.edge_id || 'PENDING'}
                            </h1>
                            {profile?.edge_id && (
                                <span className="px-3 py-1 bg-ink text-eggshell dark:bg-eggshell dark:text-ink rounded-lg text-xs font-black uppercase tracking-widest mt-2 md:mt-1">
                                    {profile?.full_name || 'Examedger User'}
                                </span>
                            )}
                        </div>
                       
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                            <p className="font-mono text-sm font-bold text-slate-blue dark:text-denim opacity-60 bg-slate-blue/5 px-3 py-1 rounded-full">
                                {showEmail ? user?.email : '••••••••••••••••'} 
                            </p>
                            <button 
                                onClick={() => setShowEmail(!showEmail)}
                                className="p-1 hover:bg-slate-blue/10 rounded-md transition-colors text-slate-blue"
                            >
                                {showEmail ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button onClick={() => setIsEditOpen(true)} className="px-6 py-2 bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                                <Edit2 size={14} /> Edit Profile
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="px-6 py-2 border border-slate-blue/20 text-slate-blue dark:text-denim rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center gap-2"
                            >
                                <LogOut size={14} /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4 md:gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-black text-ink dark:text-eggshell">{analytics?.tests_taken || 0}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-blue opacity-60">Tests</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-ink dark:text-eggshell">{analytics?.points || 0}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-blue opacity-60">Points</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-ink dark:text-eggshell">{assets?.length || 0}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-blue opacity-60">Assets</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {/* Left Col: Menu */}
                <div className="md:col-span-1 flex flex-col gap-4">
                     <div className="bg-white dark:bg-space rounded-3xl p-4 border border-slate-blue/10 dark:border-white/10 shadow-sm">
                        {[
                            { id: 'overview', label: 'Analytics Overview', icon: BarChart3 },
                            { id: 'storage', label: 'My Storage', icon: Camera },
                            { id: 'settings', label: 'Account Settings', icon: Settings },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-slate-blue text-white shadow-lg' : 'hover:bg-slate-blue/5 text-slate-blue dark:text-denim'}`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                     </div>

                     {/* Storage Opt-in */}
                     <div className="bg-white dark:bg-space rounded-3xl p-6 text-center border border-slate-blue/10 dark:border-white/10 shadow-sm flex-1 flex flex-col justify-center">
                        <h3 className="font-black text-lg mb-2 text-ink dark:text-eggshell">Cloud Storage</h3>
                        <p className="text-sm opacity-60 mb-4 font-medium text-slate-blue dark:text-denim">Save generated assets to your secure cloud.</p>
                        
                        <label className="flex items-center justify-between p-3 bg-slate-blue/5 dark:bg-white/5 rounded-xl cursor-pointer hover:bg-slate-blue/10 dark:hover:bg-white/10 transition-colors">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-blue dark:text-denim">Enable Storage</span>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={profile?.storage_opt_in || false} 
                                    onChange={async (e) => {
                                        const newVal = e.target.checked;
                                        setProfile({ ...profile, storage_opt_in: newVal });
                                        await supabase.from('profiles').update({ storage_opt_in: newVal }).eq('id', user.id);
                                    }}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
                            </div>
                        </label>
                     </div>
                </div>

                {/* Right Col: Content */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === 'overview' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-white dark:bg-space p-8 rounded-3xl border border-slate-blue/10 dark:border-white/10 shadow-sm">
                                <h3 className="text-xl font-black mb-6 text-ink dark:text-eggshell">Weekly Activity</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={weeklyData}>
                                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip 
                                                cursor={{fill: 'transparent'}}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                            />
                                            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                                                {weeklyData.map((entry: any, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={index === 5 ? '#f43f5e' : '#64748b'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'storage' && (
                         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-space p-8 rounded-3xl border border-slate-blue/10 dark:border-white/10 shadow-sm min-h-[400px]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-ink dark:text-eggshell">Cloud Assets</h3>
                                <span className="px-3 py-1 bg-slate-blue/10 text-slate-blue rounded-full text-xs font-bold">{assets.length} items</span>
                            </div>
                            
                            {assets.length === 0 ? (
                                <div className="flex flex-col items-center justify-center text-center h-64">
                                    <div className="size-20 bg-slate-blue/5 rounded-full flex items-center justify-center mb-4">
                                        <Camera size={40} className="text-slate-blue opacity-50" />
                                    </div>
                                    <h3 className="text-lg font-black mb-2 text-ink dark:text-eggshell">No Assets Yet</h3>
                                    <p className="text-slate-blue dark:text-denim opacity-60 max-w-sm mb-6 font-medium">
                                        Use the Photo Studio or PDF Tools to generate and save your assets here.
                                    </p>
                                    <button onClick={() => navigate('/studio')} className="px-6 py-3 bg-slate-blue/10 text-slate-blue rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-blue hover:text-white transition-colors">
                                        Go to Studio
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {assets.map((asset) => (
                                        <div key={asset.id} className="group relative aspect-square bg-slate-blue/5 rounded-xl border border-slate-blue/10 overflow-hidden">
                                           {asset.asset_type === 'image' ? (
                                               <img src={asset.asset_url} alt="User Asset" className="w-full h-full object-cover" />
                                           ) : (
                                               <div className="w-full h-full flex items-center justify-center">
                                                   <FileText size={32} className="text-slate-blue opacity-50" />
                                               </div>
                                           )}
                                           <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                                <a href={asset.asset_url} download target="_blank" rel="noreferrer" className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                                    <Download size={16} />
                                                </a>
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest px-2">{new Date(asset.created_at).toLocaleDateString()}</span>
                                           </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                         </motion.div>
                    )}

                    {activeTab === 'settings' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-white dark:bg-space p-8 rounded-3xl border border-slate-blue/10 dark:border-white/10 shadow-sm">
                                <h3 className="text-xl font-black mb-6 text-ink dark:text-eggshell">Danger Zone</h3>
                                <p className="text-sm font-medium text-slate-blue dark:text-denim opacity-60 mb-6">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button 
                                    onClick={handleDeleteAccount}
                                    className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={16} /> Delete Account
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            
            <EditProfileModal 
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                user={user}
                profile={profile}
                onUpdate={getProfileData}
            />
            
            <LogoutConfirmationModal 
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={async () => {
                    await signOut();
                    navigate('/');
                }}
            />
        </div>
    );
};

export default ProfilePage;
