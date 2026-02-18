import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Target, Users, ArrowRight, Sparkles, Zap, Play, ChevronRight, Star, Globe, Cpu } from 'lucide-react';
import { useRef } from 'react';

const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Brain,
      title: 'Neural Summarizer',
      description: 'Our proprietary AI extracts core concepts from complex documents in seconds.',
      color: 'from-blue-500 to-indigo-600',
      delay: 0.1
    },
    {
      icon: Target,
      title: 'Adaptive Mastery',
      description: 'Quizzes that pinpoint your knowledge gaps and help you bridge them.',
      color: 'from-purple-500 to-pink-600',
      delay: 0.2
    },
    {
      icon: Cpu,
      title: 'Study Architect',
      description: 'Generate precision schedules that balance your life and learning goals.',
      color: 'from-emerald-500 to-teal-600',
      delay: 0.3
    },
    {
      icon: Sparkles,
      title: 'Flashcard Forge',
      description: 'Convert any lecture or text into optimized active recall materials.',
      color: 'from-orange-500 to-amber-600',
      delay: 0.4
    }
  ];

  const floatingIcons = [
    { Icon: Brain, x: "10%", y: "20%", size: 40, color: "text-blue-400" },
    { Icon: Sparkles, x: "85%", y: "15%", size: 32, color: "text-purple-400" },
    { Icon: Zap, x: "75%", y: "70%", size: 48, color: "text-amber-400" },
    { Icon: Target, x: "15%", y: "75%", size: 36, color: "text-rose-400" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Floating Icons */}
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              className={`absolute hidden lg:block ${item.color} opacity-20`}
              initial={{ x: item.x, y: item.y }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ left: item.x, top: item.y }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            style={{ y: y1, opacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">New: Institutional Tier Live</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
              Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">Smarter</span>.<br />
              Master <span className="italic font-serif font-light text-white/90">Anything</span>.
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              The only AI-powered learning companion that adapts to your unique neuro-profile.
              Summarize, quiz, and plan with the world's most advanced intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/signup"
                className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(79,70,229,0.3)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-3 tracking-widest uppercase text-xs">
                  Begin Initialization
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/features"
                className="group px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-xl text-white font-black rounded-2xl hover:bg-white/10 transition-all flex items-center shadow-2xl"
              >
                <span className="flex items-center gap-3 tracking-widest uppercase text-xs text-zinc-300 group-hover:text-white transition-colors">
                  <Play className="h-4 w-4 fill-white translate-y-[1px]" />
                  System Blueprint
                </span>
              </Link>
            </div>

            {/* Trusted By */}
            <div className="mt-24 pt-12 border-t border-white/5 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10">Neural Node Connectivity</p>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-1000">
                <div className="text-xl md:text-2xl font-serif font-black italic tracking-tighter">HARVARD</div>
                <div className="text-xl md:text-2xl font-sans font-black tracking-[-0.1em]">STANFORD</div>
                <div className="text-xl md:text-2xl font-mono font-bold uppercase">MIT_LABS</div>
                <div className="text-xl md:text-2xl font-serif font-bold tracking-widest">OXFORD</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-32 relative bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
                Neural <span className="text-indigo-500">Framework</span>
              </h2>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed">Integrated tools that execute in parallel to build your personal knowledge architecture.</p>
            </div>
            <Link to="/features" className="group flex items-center text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
              Protocol Specs
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="group relative p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] hover:border-indigo-500/50 transition-all cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{feature.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8">{feature.description}</p>
                <div className="w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-700 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Dashboard Preview Section */}
      <section className="py-40 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/5 blur-[180px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-zinc-900/40 border border-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-10">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-2xl border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="ps-4">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1">12K+ Verified Nodes</p>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                  Execute at <br />
                  <span className="text-indigo-500">Peak Capacity.</span>
                </h2>
                <p className="text-zinc-400 text-xl font-medium mb-12 leading-relaxed">
                  "EduMind re-architected how I process information. The high-fidelity summaries and adaptive loops are essential for complex system mastery."
                </p>
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
                    <Users className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-black text-white uppercase tracking-tight">Sarah Jenkins</p>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Medical Resident, Johns Hopkins</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ rotate: 10, y: 50, opacity: 0 }}
                whileInView={{ rotate: -5, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden lg:block"
              >
                <div className="bg-zinc-900/80 rounded-[2.5rem] border border-white/10 p-6 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-[2.5rem]" />
                  <div className="flex items-center justify-between mb-8 px-2 relative z-10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-white/5 border border-white/10" />
                      <div className="w-3 h-3 rounded-full bg-white/5 border border-white/10" />
                    </div>
                    <div className="h-6 w-40 bg-white/5 border border-white/10 rounded-full" />
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="h-24 w-full bg-indigo-500/10 rounded-2xl border border-indigo-500/20 p-6">
                      <div className="h-2 w-1/2 bg-indigo-400/40 rounded-full mb-4" />
                      <div className="h-2 w-3/4 bg-indigo-400/20 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-40 bg-white/5 rounded-3xl border border-white/5" />
                      <div className="h-40 bg-white/5 rounded-3xl border border-white/5" />
                    </div>
                  </div>
                </div>
                {/* Decorators */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-600/10 blur-3xl rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">Evolve?</span>
            </h2>
            <p className="text-zinc-500 text-xl font-medium mb-16 max-w-2xl mx-auto">
              Join the next generation of accelerated learners. Unlock your neural potential today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-[0_0_50px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                Access System
              </Link>
              <Link
                to="/pricing"
                className="px-12 py-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center text-zinc-300 hover:text-white"
              >
                Tier Analysis
              </Link>
            </div>
            <p className="mt-12 text-zinc-700 text-[10px] font-black uppercase tracking-widest">No credit card required • Infinite potential</p>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 bg-[#050505] text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-2 text-white">
              <Brain className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-black tracking-tighter">EduMind</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium">
              <Link to="/features" className="hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Globe size={12} className="mr-1" />
              <span>Available Globally</span>
            </div>
          </div>
          <div className="mt-8 text-center text-xs opacity-50">
            © 2024 EduMind AI. Built with passion for the curious mind.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
