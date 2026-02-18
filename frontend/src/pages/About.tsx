import { motion } from 'framer-motion';
import { Brain, Target, Users, Lightbulb, Globe, Heart, Sparkles } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Pushing the boundaries of AI technology to create revolutionary learning experiences'
    },
    {
      icon: Users,
      title: 'Student-Centric',
      description: 'Every feature is designed with the learner\'s success and well-being at the forefront'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making quality education accessible to students worldwide, regardless of background'
    },
    {
      icon: Heart,
      title: 'Ethical AI',
      description: 'Responsible AI development that respects privacy and promotes inclusive learning'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former AI researcher at MIT with 15+ years in educational technology',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer specializing in machine learning and natural language processing',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of Learning Sciences',
      bio: 'Educational psychologist with expertise in cognitive learning theories',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'David Park',
      role: 'Head of Product',
      bio: 'Product leader with a track record of building user-loved educational products',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'EduMind was born from a vision to democratize personalized education'
    },
    {
      year: '2021',
      title: 'First AI Model',
      description: 'Launched our first AI-powered summarization engine'
    },
    {
      year: '2022',
      title: '10K+ Users',
      description: 'Reached our first major milestone of active learners'
    },
    {
      year: '2023',
      title: 'Series A',
      description: 'Secured $15M in funding to accelerate AI development'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Serving 50,000+ students across 25 countries'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '25', label: 'Countries' },
    { number: '1M+', label: 'Notes Processed' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-indigo-300">Our Identity</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Architecting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Future of Learning
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed">
              We're on a mission to revolutionize education through artificial intelligence,
              making personalized learning accessible to every student, everywhere.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
                <div className="text-3xl md:text-4xl font-black text-indigo-400 mb-2 group-hover:scale-110 transition-transform tracking-tighter">
                  {stat.number}
                </div>
                <div className="text-zinc-500 text-xs font-black uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-black tracking-tight text-white uppercase tracking-tighter">Strategic Mission</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                To democratize personalized education by harnessing the power of artificial intelligence,
                ensuring every student has access to tools that adapt to their unique learning style and pace.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                We believe that technology should enhance human potential, not replace it. Our AI-powered
                platform empowers students to learn more effectively while maintaining the human connection.
              </p>
              <div className="flex items-center space-x-6 p-6 rounded-3xl bg-white/5 border border-white/5">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-1">Impact Goal</h3>
                  <p className="text-indigo-300 font-medium">Transform 1 million learning journeys by 2025</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 text-white overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full flex items-center justify-center">
                  <Brain className="h-12 w-12 text-indigo-500/50" />
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Our Vision</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  A world where every student has access to personalized, AI-enhanced education
                  that adapts to their needs, accelerates their learning, and unlocks their full potential.
                </p>
                <div className="mt-10 flex gap-4">
                  <div className="h-1 w-20 bg-indigo-500 rounded-full" />
                  <div className="h-1 w-8 bg-indigo-500/30 rounded-full" />
                  <div className="h-1 w-4 bg-indigo-500/10 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              Core Directives
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              The principles that guide every neural optimization and architectural decision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:bg-indigo-500/20">
                  <value.icon size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              The Architects
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Passionate educators, technologists, and researchers working together to transform learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0a0a0a] p-6 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group text-center"
              >
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-[2rem] mx-auto object-cover relative group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 relative overflow-hidden bg-zinc-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/[0.03] blur-[150px] rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
              Development Log
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Key milestones in our mission to transform education through AI
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent hidden md:block" />
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                    } justify-center`}
                >
                  <div className={`md:w-5/12 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all group">
                      <div className="text-4xl font-black text-indigo-500/30 group-hover:text-indigo-400 transition-colors mb-2 tracking-tighter">{milestone.year}</div>
                      <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{milestone.title}</h3>
                      <p className="text-zinc-500 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full border-4 border-[#050505] hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
              Join the Mission
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Be part of the educational revolution. Together, we can make personalized learning accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
                Start Session
              </button>
              <button className="px-10 py-5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                Integrate as Talent
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
