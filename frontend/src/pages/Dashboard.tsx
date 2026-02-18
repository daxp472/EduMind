import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Clock, Award, FileText, Calendar, ArrowUpRight, Zap, Sparkles, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Study Hours',
      value: '24.5',
      trend: '+12%',
      trendUp: true,
      icon: Clock,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      label: 'Quizzes Passed',
      value: '18',
      trend: '+25%',
      trendUp: true,
      icon: Target,
      color: 'from-purple-500 to-pink-600'
    },
    {
      label: 'AI Summaries',
      value: '142',
      trend: '+8%',
      trendUp: true,
      icon: FileText,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      label: 'Learning Streak',
      value: '7 Days',
      trend: 'Flame on!',
      trendUp: true,
      icon: Award,
      color: 'from-orange-500 to-amber-600'
    }
  ];

  const aiTools = [
    {
      title: 'Summarizer',
      description: 'Condense any lecture or document.',
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-400',
      link: '/ai-tools/summarizer'
    },
    {
      title: 'Quiz Forge',
      description: 'Generate adaptive mastery tests.',
      icon: Target,
      color: 'bg-purple-500/10 text-purple-400',
      link: '/ai-tools/quiz-generator'
    },
    {
      title: 'AI Planner',
      description: 'Intelligent study sync & scheduling.',
      icon: Calendar,
      color: 'bg-emerald-500/10 text-emerald-400',
      link: '/ai-tools/study-planner'
    }
  ];

  const recentActivity = [
    {
      type: 'summary',
      title: 'Advanced Thermodynamics Summary',
      time: '14 mins ago',
      color: 'text-blue-400'
    },
    {
      type: 'quiz',
      title: 'Modern History Quiz - 92% Score',
      time: '3 hours ago',
      color: 'text-purple-400'
    },
    {
      type: 'planner',
      title: 'Week 4 Schedule Generated',
      time: 'Yesterday',
      color: 'text-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Dynamic Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 text-indigo-400 mb-2">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Student Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Welcome back, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                {user?.name || 'Academic'}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-end"
          >
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 flex items-center space-x-6 backdrop-blur-md">
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">AI Usage (Free Tier)</p>
                <p className="text-xl font-black">12/25 <span className="text-sm font-medium text-zinc-400">Requests</span></p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-indigo-500 flex items-center justify-center">
                <Zap size={18} className="text-indigo-500" />
              </div>
            </div>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900 transition-colors group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} className="text-white" />
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </div>
              </div>
              <p className="text-zinc-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Quick Launch Panel */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Quick Launch</h2>
                <Link to="/features" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors border-b border-indigo-400/30">View All Tools</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aiTools.map((tool, index) => (
                  <Link
                    to={tool.link}
                    key={index}
                    className="group relative p-6 bg-zinc-900 border border-white/5 rounded-[2rem] hover:border-indigo-500/50 transition-all overflow-hidden"
                  >
                    <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <tool.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 flex items-center">
                      {tool.title}
                      <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{tool.description}</p>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 blur-2xl rounded-full group-hover:bg-indigo-500/10 transition-colors" />
                  </Link>
                ))}
                <button className="p-6 bg-zinc-900 border border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 transition-all">
                  <Plus size={24} className="mb-2" />
                  <span className="text-xs font-bold">New Workflow</span>
                </button>
              </div>
            </section>

            {/* Progress Chart Placeholder */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Cognitive Progress</h2>
                <div className="flex space-x-2">
                  <div className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold">WEEKLY</div>
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] p-8 h-64 flex items-end justify-between gap-4">
                {[40, 60, 45, 90, 65, 80, 50].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`flex-1 rounded-t-xl bg-gradient-to-t ${i === 3 ? 'from-indigo-600 to-purple-600' : 'from-zinc-800 to-zinc-700'} relative group`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Activity & Achievements */}
          <div className="space-y-10">
            <section className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8">
              <h2 className="text-xl font-bold mb-8 flex items-center">
                <Clock size={20} className="mr-3 text-indigo-400" />
                Pulse
              </h2>
              <div className="space-y-8">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex space-x-4 relative">
                    {act.type !== 'last' && i !== recentActivity.length - 1 && (
                      <div className="absolute left-2.5 top-8 bottom-[-20px] w-px bg-zinc-800" />
                    )}
                    <div className={`w-5 h-5 rounded-full bg-[#050505] border-2 border-zinc-800 z-10 flex items-center justify-center`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${act.color.replace('text', 'bg')}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-200">{act.title}</h4>
                      <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <Award className="mb-4 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Alpha Scholar</h3>
                <p className="text-indigo-100 text-xs leading-relaxed mb-6">
                  You are in the top 5% of users this week. Keep up the intensity to unlock the "Polymath" badge.
                </p>
                <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold transition-colors">
                  Claim Rewards
                </button>
              </div>
              <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
