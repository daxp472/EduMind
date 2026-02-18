import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CircleCheck as CheckCircle, Sparkles, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Communication established. Our team will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Digital Correspondence',
      details: 'support@edumind.ai',
      description: 'Encrypted communication line'
    },
    {
      icon: Phone,
      title: 'Direct Link',
      details: '+1 (555) 123-4567',
      description: 'Standard protocol hours'
    },
    {
      icon: MapPin,
      title: 'Hingepoint',
      details: 'San Francisco, CA',
      description: 'Innovation District Base'
    },
    {
      icon: Clock,
      title: 'Active Priority',
      details: '24/7 Monitoring',
      description: 'AI-assisted response unit'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I initialize EduMind?',
      answer: 'Access is granted immediately after protocol verification. Onboarding is completed in under 300 seconds.'
    },
    {
      question: 'Is there a trial phase available?',
      answer: 'Affirmative. We offer a 30-day sandbox environment with full system access. No credentials required for entry.'
    },
    {
      question: 'What domains does EduMind cover?',
      answer: 'Our AI is trained across all academic disciplines, from fundamental science to advanced cognitive research.'
    },
    {
      question: 'How is data integrity maintained?',
      answer: 'We utilize enterprise-grade neural encryption and strict privacy shielding for all user information.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-purple-300">Open Channels</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Establish <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Connection
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Have inquiries about the EduMind architecture? Our neural support team is standing by
              to facilitate your integration and success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center space-x-4 mb-10">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                    <MessageSquare className="h-7 w-7 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Secure Dispatch</h2>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">Transmission Protocol</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                        Full Identity
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                        Return Channel
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
                        placeholder="contact@domain.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                      Objective Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-white appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium cursor-pointer"
                      >
                        <option value="" className="bg-zinc-900">SELECT CLASSIFICATION</option>
                        <option value="general" className="bg-zinc-900 uppercase">General Inquiry</option>
                        <option value="support" className="bg-zinc-900 uppercase">Technical Support</option>
                        <option value="billing" className="bg-zinc-900 uppercase">Billing Infrastructure</option>
                        <option value="partnership" className="bg-zinc-900 uppercase">Neural Partnership</option>
                        <option value="feedback" className="bg-zinc-900 uppercase">System Feedback</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-600">
                        <Zap size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                      Information Content
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none font-medium"
                      placeholder="Detail your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-3 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Initialize Dispatch</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">
                  Contact Matrix
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex flex-col items-start p-8 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-indigo-500/20">
                        <info.icon className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">
                          {info.title}
                        </h3>
                        <p className="text-indigo-300 font-bold text-sm mb-2">{info.details}</p>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 opacity-50" />
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">SLA Guarantee</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We maintain a typical response latency of <span className="text-indigo-300 font-bold">120-240 minutes</span> during operational hours.
                  Our AI guard is active 24/7 for critical system fails.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              Knowledge Base
            </h2>
            <p className="text-lg text-zinc-500 font-medium">
              Automated responses to high-frequency inquiries.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all group"
            >
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight flex items-center gap-3">
                <span className="text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                {faq.question}
              </h3>
              <p className="text-zinc-500 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-2 group px-8 py-4 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
            Access Terminal Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
