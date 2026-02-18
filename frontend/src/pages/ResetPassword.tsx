import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Brain, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api';

const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Identity keys do not match.');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Key must be at least 6 characters.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/resetpassword/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: formData.password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Key reconfiguration failed.');
            }

            toast.success('Neural link re-secured. Please log in.');
            navigate('/login');
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
                    <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">Re-secure Node</h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                        <Sparkles size={12} className="text-indigo-400" />
                        Key Reconfiguration Protocol
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/5 p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                                New Security Key
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                                    placeholder="MIN. 6 CHARACTERS"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                                Confirm Key
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                                    placeholder="REPEAT KEY"
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
                                    Complete Reset <ArrowRight size={14} />
                                </span>
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-white/5">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-xs font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                ABORT RE-SECURE
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
