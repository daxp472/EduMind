import { motion } from 'framer-motion';
import { Brain, FileText, Target, ChartBar as BarChart3, MessageSquare, Clock, Shield, Sparkles, Cpu, Layers, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms adapt to your unique learning style and pace.',
      features: [
        'Personalized study recommendations',
        'Adaptive difficulty adjustments',
        'Learning pattern analysis',
        'Custom content generation'
      ],
      color: 'from-blue-500 to-indigo-600',
      delay: 0.1
    },
    {
      icon: FileText,
      title: 'Smart Note Summarization',
      description: 'Transform lengthy documents and notes into digestible, key-point summaries.',
      features: [
        'PDF and document processing',
        'Key concept extraction',
        'Multi-format support',
        'Instant summary generation'
      ],
      color: 'from-emerald-500 to-teal-600',
      delay: 0.2
    },
    {
      icon: Target,
      title: 'Adaptive Quiz Engine',
      description: 'Dynamic quiz generation that evolves based on your performance and knowledge gaps.',
      features: [
        'Auto-generated questions',
        'Difficulty scaling',
        'Performance tracking',
        'Weak area identification'
      ],
      color: 'from-purple-500 to-pink-600',
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your learning progress with detailed performance metrics.',
      features: [
        'Progress visualization',
        'Time tracking',
        'Performance trends',
        'Goal achievement metrics'
      ],
      color: 'from-orange-500 to-amber-600',
      delay: 0.4
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: 'Contextual AI Chat',
      description: 'Ask deep questions about your study materials and get instant, cited answers.',
      color: 'bg-blue-500/10 text-blue-400'
    },
    {
      icon: Clock,
      title: 'Dynamic Scheduling',
      description: 'Automated study calendars that adjust based on your real-world progress.',
      color: 'bg-purple-500/10 text-purple-400'
    },
    {
      icon: Cpu,
      title: 'Cross-Tool Intelligence',
      description: 'Your summaries automatically generate flashcards and quizzes.',
      color: 'bg-emerald-500/10 text-emerald-400'
    },
    {
      icon: Layers,
      title: 'Knowledge Vault',
      description: 'A centralized, searchable database of everything you have ever learned.',
      color: 'bg-amber-500/10 text-amber-400'
    },
    {
      icon: Shield,
      title: 'Privacy-Locked',
      description: 'Your notes and data are encrypted and never used to train public models.',
      color: 'bg-rose-500/10 text-rose-400'
    },
    {
      icon: MousePointer2,
      title: 'One-Click Workflow',
      description: 'Seamless transitions between reading, summarizing, and testing.',
      color: 'bg-indigo-500/10 text-indigo-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold tracking-widest uppercase text-indigo-300">Infinite Possibilities</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                Powerful Tools for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                  Limitless Mind
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                We've engineered a seamless ecosystem of AI tools that communicate with each other
                to streamline your path to mastery.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Features Showcase */}
        <section className="py-24 relative">
          <div className="space-y-40">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                <div className="flex-1 space-y-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shadow-indigo-500/10`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight uppercase tracking-widest">{feature.title}</h2>
                  <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3 text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                        <span className="text-sm font-black uppercase tracking-wider">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                  <div className="relative group w-full max-w-md">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity`} />
                    <div className="relative aspect-square rounded-[3rem] bg-zinc-900 border border-white/5 p-8 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-500 shadow-2xl overflow-hidden backdrop-blur-sm">
                      <feature.icon className="h-32 w-32 text-white/10 absolute -bottom-4 -right-4 rotate-12" />
                      <div className="space-y-4 w-full relative z-10">
                        <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                        <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                        <div className="pt-4 grid grid-cols-3 gap-2">
                          <div className="h-8 rounded-lg bg-indigo-500/20" />
                          <div className="h-8 rounded-lg bg-purple-500/20" />
                          <div className="h-8 rounded-lg bg-emerald-500/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Secondary Features Grid */}
        <section className="py-32">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Designed for <span className="text-indigo-500">Excellence</span></h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">Every detail refined to ensure your cognitive resources are focused on learning, not navigating.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:bg-zinc-900 hover:border-indigo-500/30 transition-all cursor-default backdrop-blur-3xl"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-2xl`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[180px] rounded-full" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">Empower your <br /><span className="text-indigo-500">Neural Net.</span></h2>
            <p className="text-zinc-500 text-xl font-medium mb-16 max-w-2xl mx-auto">
              Experience the synergy of world-class AI tools in one unified workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-[0_0_50px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95 text-white"
              >
                Start Training
              </Link>
              <Link
                to="/pricing"
                className="px-12 py-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-zinc-300 hover:text-white"
              >
                Analysis
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;
