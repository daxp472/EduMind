import { motion } from 'framer-motion';
import { Brain, FileText, Target, ChartBar as BarChart3, MessageSquare, BookOpen, Clock, Lightbulb, Users, Shield, Zap, Sparkles } from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms adapt to your unique learning style and pace',
      features: [
        'Personalized study recommendations',
        'Adaptive difficulty adjustments',
        'Learning pattern analysis',
        'Custom content generation'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Smart Note Summarization',
      description: 'Transform lengthy documents and notes into digestible, key-point summaries',
      features: [
        'PDF and document processing',
        'Key concept extraction',
        'Multi-format support',
        'Instant summary generation'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Target,
      title: 'Adaptive Quiz Engine',
      description: 'Dynamic quiz generation that evolves based on your performance and knowledge gaps',
      features: [
        'Auto-generated questions',
        'Difficulty scaling',
        'Performance tracking',
        'Weak area identification'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your learning progress with detailed performance metrics',
      features: [
        'Progress visualization',
        'Time tracking',
        'Performance trends',
        'Goal achievement metrics'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: '24/7 AI Tutor',
      description: 'Always-available intelligent tutoring system'
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'AI-optimized study schedules for maximum retention'
    },
    {
      icon: Lightbulb,
      title: 'Concept Mapping',
      description: 'Visual knowledge graphs and concept relationships'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Study groups and peer interaction features'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Enterprise-grade security for your data'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for instant results'
    }
  ];

  const benefits = [
    {
      stat: '3x Faster',
      label: 'Learning Speed',
      description: 'Students learn concepts 3 times faster with AI assistance'
    },
    {
      stat: '95%',
      label: 'Retention Rate',
      description: 'Higher information retention with personalized learning'
    },
    {
      stat: '50%',
      label: 'Time Saved',
      description: 'Reduce study time while improving comprehension'
    },
    {
      stat: '24/7',
      label: 'Availability',
      description: 'Round-the-clock AI support whenever you need help'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Cutting-Edge AI Technology
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Features That Transform
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                How You Learn
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the comprehensive suite of AI-powered tools designed to revolutionize 
              your educational experience and accelerate your learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <feature.icon className="h-20 w-20 text-blue-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and features designed to support every aspect of your learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results That Matter
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Real impact on learning outcomes backed by data and student success stories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl"
              >
                <div className="text-4xl font-bold mb-2">{benefit.stat}</div>
                <div className="text-blue-200 font-semibold mb-2">{benefit.label}</div>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience the Future of Learning?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already transforming their education with EduMind's AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;