import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, FileText, Clock, Zap } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: 'Data Collection Matrix',
      content: [
        'Personal information provided during session initialization (identity, return channel, academic node)',
        'Neural usage data to optimize AI response models and personalize the learning trajectory',
        'Academic progress metrics and performance analytics to track educational milestones',
        'Technical metadata (protocol address, terminal type, hardware identifiers) for security optimization',
        'Communication preferences and support unit interactions'
      ]
    },
    {
      title: 'Neural Information Processing',
      content: [
        'Personalizing learning vectors with AI-enhanced recommendations',
        'Facilitating technical support and responding to system inquiries',
        'Optimizing platform architecture and developing next-gen features',
        'Dispatching critical updates regarding account status and service protocols',
        'Ensuring architectural integrity and preventing unauthorized access',
        'Complying with legal directives and enforcing service terms'
      ]
    },
    {
      title: 'Information Distribution Pulse',
      content: [
        'EduMind maintains a zero-distribution policy to third-party entities',
        'Anonymized, aggregated data sets may be utilized for academic research',
        'Information may be disclosed under legal mandate or to protect corporate assets',
        'Infrastructure partners are bound by strict neural confidentiality protocols',
        'User data is prioritized during organizational restructuring'
      ]
    },
    {
      title: 'Encryption & Safeguards',
      content: [
        'Enterprise-grade AES-256 encryption for data at rest and in transit',
        'Continuous security audits and vulnerability assessments',
        'Secure-tier data centers with 24/7 kinetic and digital monitoring',
        'Multi-factor auth and privileged access management',
        'Redundant backup systems and disaster recovery protocols',
        'Alignment with global SOC 2 and ISO security standards'
      ]
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Architectural Privacy',
      description: 'Privacy protection is embedded within the core engine source'
    },
    {
      icon: Lock,
      title: 'Secure Default',
      description: 'High-tier encryption is the standard operational state'
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      description: 'Clear documentation of all neural data processing'
    },
    {
      icon: Users,
      title: 'User Sovereignty',
      description: 'The user maintains absolute control over their data stack'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Shield className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-indigo-300">Privacy Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Data <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Sovereignty
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
              We're committed to protecting your digital identity through advanced encryption
              and transparent information handling.
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs font-black uppercase tracking-widest text-zinc-500">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <Clock className="h-4 w-4 text-indigo-500" />
                <span>Active: March 2024</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <FileText className="h-4 w-4 text-purple-500" />
                <span>Protocol v3.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-24 relative bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <principle.icon className="h-7 w-7 text-indigo-400" />
                </div>
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 hover:border-indigo-500/30 transition-all relative group"
              >
                <div className="absolute top-8 right-8 text-6xl font-black text-white/[0.02] select-none group-hover:text-indigo-500/[0.05] transition-colors">
                  0{index + 1}
                </div>
                <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
                  <Zap className="h-5 w-5 text-indigo-500" />
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-4 group/item">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                      <p className="text-zinc-400 leading-relaxed font-medium group-hover/item:text-zinc-200 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Compliance */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">
              Compliance Matrix
            </h2>
            <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto">
              Alignment with global privacy standards and regional legal frameworks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['GDPR', 'CCPA', 'FERPA'].map((reg, index) => (
              <motion.div
                key={reg}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-10 bg-white/5 border border-white/5 rounded-[2.5rem] text-center hover:bg-white/10 transition-all group"
              >
                <h3 className="text-2xl font-black text-indigo-400 mb-4 group-hover:scale-110 transition-transform">{reg}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed px-4">
                  Full alignment with standard {reg} directives for data integrity and user rights.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 opacity-30" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
              Inquiry <br /> Link
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our privacy units are available to resolve any data sovereignty concerns
              or protocol inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-2xl">
                Contact Privacy Team
              </button>
              <button className="px-10 py-5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                Download Archive (PDF)
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
