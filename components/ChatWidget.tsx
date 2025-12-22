import { useState, useRef, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { X, Send, Bot, Shield, Lock, Info } from 'lucide-react';
import { supabase } from '../src/services/supabaseClient';
import { generateSessionKey, encryptMessage, decryptMessage } from '../src/utils/crypto';
import { getAIResponse } from '../src/services/ai';
import '../src/components/SecureChat.css'; // Utilizing the styles we created

interface ChatWidgetProps {
    isOpen: boolean;
    onToggle: (open: boolean) => void;
    isDashboard: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  encrypted?: boolean;
}

const ChatWidget: FC<ChatWidgetProps> = ({ isOpen, onToggle, isDashboard }) => {

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Logic for Desktop "Drawer" mode (pushes content) vs Mobile/Other "Popup" mode
    // Drawer only if: Dashboard + Not Mobile
    const isDrawer = isDashboard && !isMobile;

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Secure Session Initialized. Keys in RAM only.', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sessionKey, setSessionKey] = useState<CryptoKey | null>(null);
    const [sessionId, setSessionId] = useState<string>('');
    const sessionIdRef = useRef(''); // Ref for cleanup access

    // --- SECURE SESSION LOGIC ---
    useEffect(() => {
        const initSession = async () => {
          try {
            const key = await generateSessionKey();
            setSessionKey(key);
            const newSessionId = self.crypto.randomUUID();
            setSessionId(newSessionId);
            sessionIdRef.current = newSessionId;
          } catch (err) {
            console.error("Failed to initialize secure session", err);
          }
        };
        initSession();
    
        const handleUnload = () => {
           // Use ref to get the current sessionId during unmount/unload
           if (sessionIdRef.current) {
             const idToDelete = sessionIdRef.current;
             // Use navigator.sendBeacon ideally, but Supabase fetch might work if sync
             // For reliable unload, we'd use a small sync fetch or beacon, but here we try standard
             supabase.from('ephemeral_chats').delete().eq('session_id', idToDelete).then();
           }
        };
    
        window.addEventListener('unload', handleUnload);
        return () => {
          window.removeEventListener('unload', handleUnload);
        };
      }, []); // Empty deps ensuring run once on mount

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || !sessionKey || !sessionId) return;
        
        const text = inputValue;
        setInputValue('');
        setIsLoading(true);

        const userMsg: Message = { 
            id: self.crypto.randomUUID(), 
            text, 
            sender: 'user', 
            encrypted: true 
        };
        setMessages(prev => [...prev, userMsg]);

        try {
             // 1. Encrypt & Store User Msg
            const encryptedUser = await encryptMessage(text, sessionKey);
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                // Fire & Forget storage
                supabase.from('ephemeral_chats').insert({
                    user_id: user.id,
                    session_id: sessionId,
                    content_encrypted: encryptedUser,
                    is_user_message: true
                }).then(({ error }) => {
                    if (error) console.error("Supabase Insert Error:", error.message, error.details || '');
                });
            } else {
                console.warn("Secure Chat: User not logged in, skipping DB insert.");
            }


            // 2. Call AI
            const responseText = await getAIResponse(text);
            const aiText = Array.isArray(responseText) ? responseText[0] : (responseText?.toString() || "No response");

            // 3. Encrypt & Store AI Msg
            const encryptedAi = await encryptMessage(aiText, sessionKey);
            
            if (user) {
                supabase.from('ephemeral_chats').insert({
                    user_id: user.id,
                    session_id: sessionId,
                    content_encrypted: encryptedAi,
                    is_user_message: false
                }).then();
            }

            // 4. Update UI
            const botMsg: Message = { 
                id: self.crypto.randomUUID(), 
                text: aiText, 
                sender: 'bot', 
                encrypted: true 
            };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error(error);
            const errorMsg: Message = { id: Date.now().toString(), text: "Error: Could not secure connection.", sender: 'bot' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatMessage = (text: string) => {
        const regex = /(\[\/[^\]]+\])/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (part.match(/^\[\/[^\]]+\]$/)) {
                const path = part.slice(1, -1); 
                return (
                    <Link 
                        key={index} 
                        to={path} 
                        className="text-slate-blue dark:text-denim underline decoration-dotted underline-offset-4 hover:text-ink dark:hover:text-white font-bold mx-1"
                    >
                        Go to Tool
                    </Link>
                );
            }
            return part;
        });
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for Mobile or Non-Dashboard (where it behaves as popup) */}
                        {(!isDrawer) && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => onToggle(false)}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[95]"
                            />
                        )}

                        {/* Panel */}
                        <motion.div
                            initial={isDrawer ? { x: '100%' } : { opacity: 0, y: 20, scale: 0.9 }}
                            animate={isDrawer ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
                            exit={isDrawer ? { x: '100%' } : { opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className={`fixed flex flex-col bg-white dark:bg-black border-slate-blue/10 dark:border-white/10 shadow-2xl z-[100] overflow-hidden
                                ${isDrawer 
                                    ? 'top-0 right-0 h-full w-[400px] border-l' 
                                    : 'bottom-4 md:bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-[350px] h-[60vh] md:h-[500px] rounded-3xl border'
                                }
                            `}
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-slate-blue/10 dark:border-white/10 flex items-center justify-between bg-slate-blue/5 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-blue/10 dark:bg-white/10 text-slate-blue dark:text-white rounded-lg relative">
                                        <Bot size={20} strokeWidth={1.5} />
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white dark:border-black p-[2px]">
                                            <Shield size={8} className="text-white fill-current" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-ink dark:text-eggshell flex items-center gap-2">
                                            AI Copilot
                                            <span className="secure-badge !px-1.5 !py-0.5 !text-[8px] !static !shadow-none !translate-y-0">Beta</span>
                                        </h3>
                                        <p className="text-[10px] uppercase font-bold text-slate-blue/60 flex items-center gap-1">
                                            <Lock size={10} /> Zero-Knowledge
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onToggle(false)}
                                    className="p-2 hover:bg-red-50 text-slate-blue dark:text-denim hover:text-red-500 rounded-lg transition-colors"
                                >
                                    <X size={20} strokeWidth={1.5} />
                                </button>
                            </div>


                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-eggshell/20 dark:bg-black/20">
                                {messages.map((msg) => (
                                    <div 
                                        key={msg.id} 
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm font-medium relative group ${
                                            msg.sender === 'user' 
                                                ? 'bg-ink dark:bg-eggshell text-eggshell dark:text-ink rounded-tr-none shadow-lg' 
                                                : 'bg-white dark:bg-white/10 text-ink dark:text-eggshell border border-slate-blue/10 dark:border-white/10 rounded-tl-none shadow-sm'
                                        }`}>
                                            {/* Use the formatter for bot messages, or all messages securely */}
                                            {formatMessage(msg.text)}
                                            
                                            {msg.encrypted && (
                                                <div className="absolute -bottom-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[9px] text-slate-blue">
                                                    <Lock size={8} /> Encrypted
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-white/10 p-4 rounded-xl rounded-tl-none border border-slate-blue/10 dark:border-white/10">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 bg-slate-blue/40 rounded-full animate-bounce" />
                                                <div className="w-1.5 h-1.5 bg-slate-blue/40 rounded-full animate-bounce delay-75" />
                                                <div className="w-1.5 h-1.5 bg-slate-blue/40 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white dark:bg-black border-t border-slate-blue/10 dark:border-white/10">
                                <div className="mb-2 text-[10px] text-center text-slate-blue/40 flex items-center justify-center gap-1">
                                    <Info size={10} /> Data is purged on tab close.
                                </div>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder={sessionKey ? "Ask secure question..." : "Initializing keys..."}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        disabled={isLoading || !sessionKey}
                                        className="w-full pl-4 pr-12 py-3 bg-slate-blue/5 dark:bg-white/5 rounded-xl border border-transparent focus:border-slate-blue/30 focus:outline-none text-sm font-medium text-ink dark:text-eggshell placeholder:text-slate-blue/40 dark:placeholder:text-white/30 disabled:opacity-50"
                                    />
                                    <button 
                                        onClick={handleSend}
                                        disabled={isLoading || !sessionKey}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-blue dark:text-white hover:scale-110 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Trigger Button - Conditionally Positioned & Visible */}
            {/* Hidden on Mobile (md:flex) because Mobile has Nav Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggle(!isOpen)}
                className={`fixed z-[90] p-3 bg-white dark:bg-black border border-slate-blue/10 dark:border-white/20 text-slate-blue dark:text-white rounded-xl shadow-xl hidden md:flex items-center justify-center group 
                    ${isDashboard 
                        ? 'top-5 right-5 md:top-6 md:right-8'  // Dashboard: Top Right (Desktop)
                        : 'bottom-6 right-6'                   // Others: Bottom Right
                    }
                    ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
            >
                <div className="relative">
                     <Bot size={24} strokeWidth={1.5} />
                     <div className="absolute -top-1 -right-1 bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black" />
                </div>
            </motion.button>
        </>
    );
};

export default ChatWidget;
