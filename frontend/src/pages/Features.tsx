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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <h2 className="text-4xl font-bold tracking-tight">{feature.title}</h2>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3 text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                  <div className="relative group w-full max-w-md">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity`} />
                    <div className="relative aspect-square rounded-[3rem] bg-zinc-900 border border-white/5 p-8 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-500 shadow-2xl overflow-hidden backdrop-blur-sm">
                      {/* Visual Representation Placeholder */}
                      <feature.icon className="h-32 w-32 text-white/10 absolute -bottom-4 -right-4 rotate-12" />
                      <div className="space-y-4 w-full">
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
        </div>
      </section>

      {/* Secondary Features Grid */}
      <section className="py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for Excellence</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Every detail refined to ensure your cognitive resources are focused on learning, not navigating.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:bg-zinc-900 hover:border-white/10 transition-all cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={22} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Empower your <br />learning journey.</h2>
          <p className="text-zinc-400 text-xl mb-12">
            Experience the synergy of world-class AI tools in one unified workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="px-10 py-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all text-white"
            >
              Explore Plans
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 bg-[#050505] text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center space-x-2 text-white">
              <Brain className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-black tracking-tighter">EduMind</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <p className="text-xs opacity-50">© 2024 EduMind AI. Built for the modern learner.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
