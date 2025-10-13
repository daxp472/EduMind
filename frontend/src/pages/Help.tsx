import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, MessageCircle, Video, FileText, Headphones, Mail, Phone, Clock, CircleCheck as CheckCircle, ArrowRight, Play } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const helpCategories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using EduMind',
      articles: 12,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'AI Features',
      description: 'Master our AI-powered learning tools',
      articles: 8,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FileText,
      title: 'Account & Billing',
      description: 'Manage your account and subscription',
      articles: 6,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Video,
      title: 'Troubleshooting',
      description: 'Resolve common issues quickly',
      articles: 10,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const popularArticles = [
    {
      title: 'How to Create Your First AI Summary',
      category: 'Getting Started',
      readTime: '3 min read',
      views: '2.1k views'
    },
    {
      title: 'Understanding AI Quiz Generation',
      category: 'AI Features',
      readTime: '5 min read',
      views: '1.8k views'
    },
    {
      title: 'Setting Up Your Learning Goals',
      category: 'Getting Started',
      readTime: '4 min read',
      views: '1.5k views'
    },
    {
      title: 'Managing Your Subscription',
      category: 'Account & Billing',
      readTime: '2 min read',
      views: '1.2k views'
    },
    {
      title: 'Troubleshooting AI Response Issues',
      category: 'Troubleshooting',
      readTime: '6 min read',
      views: '900 views'
    }
  ];

  const videos = [
    {
      title: 'EduMind Platform Overview',
      duration: '5:32',
      thumbnail: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop'
    },
    {
      title: 'AI Summarization Tutorial',
      duration: '3:48',
      thumbnail: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop'
    },
    {
      title: 'Creating Effective Study Plans',
      duration: '7:12',
      thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop'
    }
  ];

  const supportOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed help via email',
      response: 'Usually within 4 hours',
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      response: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with an expert',
      response: 'Mon-Fri, 8am-6pm PST',
      action: 'Call Now'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Can We{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Help You?
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers, tutorials, and support resources to get the most out of EduMind's 
              AI-powered learning platform.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for help articles, tutorials, or guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find help articles organized by topic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                    <ArrowRight className="h-5 w-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Articles List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Most Popular Articles
              </h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Video Tutorials */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Video Tutorials
              </h2>
              <div className="space-y-6">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                        <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-gray-800 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Personal Assistance?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our support team is here to help with any questions or issues you might have
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                  <Clock className="h-4 w-4" />
                  <span>{option.response}</span>
                </div>
                <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  {option.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Status & Updates */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
                <p className="text-green-600 font-medium">All systems operational</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">&lt; 2s</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
                <div className="text-sm text-gray-600">Active Issues</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Help;