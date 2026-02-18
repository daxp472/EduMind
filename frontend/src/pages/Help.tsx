import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Video, FileText, Headphones, Mail, Phone, Clock, CircleCheck as CheckCircle, ArrowRight, Play, Sparkles, Zap, Search as SearchIcon } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const helpCategories = [
    {
      icon: BookOpen,
      title: 'Core Initialization',
      description: 'Master the fundamental startup protocols.',
      articles: 12,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: MessageCircle,
      title: 'Neural Engine',
      description: 'Optimize AI-powered learning modules.',
      articles: 8,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: FileText,
      title: 'Node Maintenance',
      description: 'Manage identity nodes and credit flow.',
      articles: 6,
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Conflict Resolution',
      description: 'Resolve system anomalies in real-time.',
      articles: 10,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const popularArticles = [
    {
      title: 'Initializing Your First Neural Summary',
      category: 'Core Initialization',
      readTime: '3 min read',
      views: '2.1k pulses'
    },
    {
      title: 'Neural Engine Synthesis Optimization',
      category: 'Neural Engine',
      readTime: '5 min read',
      views: '1.8k pulses'
    },
    {
      title: 'Identity Node Credential Security',
      category: 'Node Maintenance',
      readTime: '4 min read',
      views: '1.5k pulses'
    },
    {
      title: 'Managing Credit Allocation Modules',
      category: 'Node Maintenance',
      readTime: '2 min read',
      views: '1.2k pulses'
    },
    {
      title: 'Resolving AI Pulse Latency',
      category: 'Conflict Resolution',
      readTime: '6 min read',
      views: '900 pulses'
    }
  ];

  const videos = [
    {
      title: 'EduMind Architecture Overview',
      duration: '5:32',
      thumbnail: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop'
    },
    {
      title: 'AI Synthesis Protocol Walkthrough',
      duration: '3:48',
      thumbnail: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop'
    },
    {
      title: 'Optimizing Study Vectors',
      duration: '7:12',
      thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop'
    }
  ];

  const supportOptions = [
    {
      icon: Mail,
      title: 'Digital Dispatch',
      description: 'Secure communication channel.',
      response: 'Latence: < 4 hours',
      action: 'Initialize Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Interface',
      description: 'Real-time human assist grid.',
      response: 'Active 24/7',
      action: 'Start Link'
    },
    {
      icon: Phone,
      title: 'Voice Relay',
      description: 'Direct auditory connect.',
      response: 'Standard Protocol Hours',
      action: 'Initialize Call'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Headphones className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-indigo-300">Support Matrix</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              Knowledge <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Interface
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Find solutions, technical manuals, and support resources to optimize your
              interaction with the EduMind AI Architecture.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <SearchIcon size={20} className="text-indigo-400 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search Knowledge Base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-14 pr-6 py-6 bg-white/[0.03] border border-white/10 rounded-3xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-xl transition-all text-lg font-black uppercase tracking-tight"
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-500">Node Search</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-24 relative bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
              Archive Index
            </h2>
            <p className="text-lg text-zinc-500 font-medium">
              Information packets organized by operational domain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-500 h-full backdrop-blur-md">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-black`}>
                    <category.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-zinc-500 mb-8 leading-relaxed text-sm font-medium">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{category.articles} packets</span>
                    <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Articles List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-indigo-500" />
                Priority Access
              </h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-5 p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                      <FileText className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <span className="text-indigo-500/80">{article.category}</span>
                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <span>{article.readTime}</span>
                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-zinc-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Video Tutorials */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center gap-3">
                <Video className="h-6 w-6 text-purple-500" />
                Neural Training
              </h2>
              <div className="space-y-6">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer group"
                  >
                    <div className="relative h-48">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play size={24} className="ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-6 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-[10px] font-black text-white">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors uppercase tracking-tight">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
              Transmission Links
            </h2>
            <p className="text-lg text-zinc-500 font-medium">
              Direct channels to our technical and human support units.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-indigo-500/20 transition-all group"
              >
                <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform group-hover:bg-indigo-500/20">
                  <option.icon size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">
                  {option.title}
                </h3>
                <p className="text-zinc-500 mb-6 text-sm font-medium">
                  {option.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-8">
                  <Clock size={12} className="text-indigo-500" />
                  <span>{option.response}</span>
                </div>
                <button className="w-full py-4 px-6 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">
                  {option.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Status & Updates */}
      <section className="py-32 relative overflow-hidden bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-white/10 p-12 overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 group-hover:w-full group-hover:opacity-5 transition-all duration-700" />

            <div className="flex items-center space-x-6 mb-10 relative">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle size={30} className="text-emerald-500 animate-pulse" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">System Health</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <p className="text-emerald-500 text-xs font-black uppercase tracking-widest">All neural nodes operational</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 group-hover:border-emerald-500/30 transition-all">
                <div className="text-3xl font-black text-white mb-1 tracking-tighter">99.9%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Service Uptime</div>
              </div>
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 group-hover:border-emerald-500/30 transition-all">
                <div className="text-3xl font-black text-white mb-1 tracking-tighter">&lt; 2s</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Synapse Latency</div>
              </div>
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 group-hover:border-emerald-500/30 transition-all">
                <div className="text-3xl font-black text-white mb-1 tracking-tighter">0</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Anomalies</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Help;
