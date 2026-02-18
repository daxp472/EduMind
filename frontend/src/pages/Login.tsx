import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Brain, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success('Access Granted. Welcome back.');
      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">
            Initialize Access
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
            <Sparkles size={12} className="text-indigo-400" />
            Neural Academy Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/5 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Identity (Email)
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
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-white/[0.07] transition-all font-medium"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Security Key
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
                  className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-white/[0.07] transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                />
                <div className="w-4 h-4 rounded-md border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors mr-2">
                  <div className="w-2 h-2 rounded-sm bg-indigo-500 opacity-0 group-focus-within:opacity-100" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter hover:text-zinc-300 transition-colors">Remember Pulse</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-tighter"
              >
                Reset Access?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center py-4 px-4 border border-transparent text-xs font-black uppercase tracking-widest rounded-2xl text-black bg-white hover:bg-zinc-200 focus:outline-none transition-all transform active:scale-95 disabled:opacity-50 disabled:transform-none shadow-xl shadow-white/5"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Establish Connection <ArrowRight size={14} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">New Researcher?</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-xs font-black text-white px-6 py-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all hover:gap-3"
            >
              Register Account <ArrowRight size={14} className="text-indigo-500" />
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">
          End-to-End Encrypted Session
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
