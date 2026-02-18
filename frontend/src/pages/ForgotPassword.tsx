import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Brain, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error('Identity required.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to dispatch recovery link.');
            }

            setSubmitted(true);
            toast.success('Recovery protocol initiated.');
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'System malfunction.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Mesh Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/20 mb-6"
                    >
                        <Brain className="h-8 w-8 text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">Recover Access</h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                        <Sparkles size={12} className="text-indigo-400" />
                        Neural Node Retrieval
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/5 p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                        >
                            <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400">
                                <Mail className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Identity Broadcast Sent</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                A recovery pulse was dispatched to <strong>{email}</strong>. Check your secure inbox.
                            </p>
                            <Link
                                to="/login"
                                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Return to Session
                            </Link>
                        </motion.div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                                    Identity Verified Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                                        placeholder="register@university.edu"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Dispatch Pulse <ArrowRight size={14} />
                                    </span>
                                )}
                            </button>

                            <div className="text-center pt-4 border-t border-white/5">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center text-xs font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    ABORT OPERATION
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
