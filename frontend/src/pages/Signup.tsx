import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User, Eye, EyeOff, Brain, Check, AlertCircle, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      setIsRegistered(true);
      setRegistrationMessage('Neural link established. Please verify your identity via email.');
      toast.success('Registration successful. Verify your email to proceed.');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed.';
      toast.error(errorMessage);
    }
  };

  const features = [
    { title: 'Neural Summarization', desc: 'Context-aware document processing.', icon: Brain },
    { title: 'Adaptive Learning', desc: 'AI paths tailored to your speed.', icon: Zap },
    { title: 'Global Sync', desc: 'Study across all devices instantly.', icon: Shield },
  ];

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl p-10 text-center shadow-2xl">
            <div className="inline-flex p-4 bg-indigo-500/20 rounded-2xl mb-6">
              <Mail className="h-10 w-10 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Identity Check</h2>
            <div className="space-y-4 mb-8">
              <p className="text-zinc-400 text-sm leading-relaxed">{registrationMessage}</p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-start gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-indigo-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                  Encryption link sent. Check your secure inbox (and spam) to activate your neural node.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
            >
              Back to Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Mesh Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:block space-y-12"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400">
              <Sparkles size={12} />
              Now in Private Beta
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-[0.9]">
              JOIN THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                NEURAL CORE
              </span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md">
              Initialize your account to access high-fidelity study orchestration and AI execution environments.
            </p>
          </div>

          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <f.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tight">{f.title}</h4>
                  <p className="text-zinc-600 font-bold text-xs uppercase tracking-tighter">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-6">
            <div className="p-1 bg-white/5 border border-white/5 rounded-3xl inline-flex items-center gap-4 pr-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
                <Check size={20} />
              </div>
              <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Security Protocol: AES-256 Validated</span>
            </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Create Record</h2>
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">New Researcher Onboarding</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm font-bold"
                    placeholder="FULL NAME"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm font-bold"
                    placeholder="EMAIL ADDRESS"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-xs font-bold"
                    placeholder="KEY"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="relative group">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-xs font-bold"
                    placeholder="CONFIRM"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start p-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="mt-1 h-3 w-3 bg-white/5 border-white/10 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-3 block text-[9px] font-bold text-zinc-500 uppercase tracking-tighter leading-normal">
                  I ACKNOWLEDGE THE <Link to="/terms" className="text-indigo-400">PROTOCOLS</Link> AND <Link to="/privacy" className="text-indigo-400">PRIVACY SHIELD</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <div className="animate-spin h-5 w-5 border-b-2 border-black rounded-full" /> : 'AUTHORIZE ACCOUNT'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Existing Pulse?</p>
              <Link to="/login" className="text-xs font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase flex items-center justify-center gap-2">
                RESUME SESSION <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
