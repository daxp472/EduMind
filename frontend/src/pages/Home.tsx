import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Target, Users, TrendingUp, Clock, Award, Lightbulb } from 'lucide-react';

const Home = () => {
  const quickActions = [
    {
      icon: BookOpen,
      title: 'Summarize Notes',
      description: 'Transform your notes into concise summaries',
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard'
    },
    {
      icon: Target,
      title: 'Generate Quiz',
      description: 'Create adaptive quizzes from your content',
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning analytics',
      color: 'from-green-500 to-green-600',
      link: '/dashboard'
    },
    {
      icon: Brain,
      title: 'AI Tutor',
      description: 'Get personalized learning assistance',
      color: 'from-orange-500 to-orange-600',
      link: '/dashboard'
    }
  ];

  const recentFeatures = [
    {
      icon: Lightbulb,
      title: 'Smart Study Plans',
      description: 'AI-generated study schedules based on your goals'
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Optimized learning sessions for maximum retention'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Track milestones and celebrate your progress'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Background Animated Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <section className="mb-24 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Lightbulb className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-indigo-300">Cognitive Hub</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic">
              Welcome back, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Architect.
              </span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed mb-12">
              The neural platform is ready for your next session. Execute complex study protocols with precision.
            </p>
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Access Interface</span>
            </Link>
          </motion.div>
        </section>

        {/* Quick Actions / Core Tools */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-16 px-2">
            <h2 className="text-2xl font-black uppercase tracking-widest text-zinc-500">Core Protocols</h2>
            <div className="h-px flex-1 mx-10 bg-gradient-to-r from-indigo-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={action.link}>
                  <div className="h-full p-10 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl hover:border-indigo-500/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-zinc-900/60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="relative">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
          <div className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-10 md:p-20 backdrop-blur-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                  Latest <span className="text-indigo-500">Neural</span> <br />Innovations
                </h2>
                <div className="space-y-10">
                  {recentFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-8 group">
                      <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                        <feature.icon className="h-7 w-7 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{feature.title}</h3>
                        <p className="text-zinc-500 font-medium leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="aspect-video bg-zinc-900/80 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl skew-y-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                  <div className="flex items-center space-x-3 mb-10">
                    <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="space-y-6">
                    <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                    <div className="h-4 w-full bg-white/5 rounded-full" />
                    <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                    <div className="grid grid-cols-2 gap-6 pt-6">
                      <div className="h-32 bg-indigo-500/10 rounded-3xl border border-indigo-500/20" />
                      <div className="h-32 bg-indigo-500/10 rounded-3xl border border-indigo-500/20" />
                    </div>
                  </div>
                </div>
                {/* Visual Glows */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-600/10 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;