import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Circle as HelpCircle, BookOpen, Settings, CreditCard, Shield } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'general', name: 'General', icon: BookOpen },
    { id: 'features', name: 'Features', icon: Settings },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield }
  ];

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'What is EduMind and how does it work?',
      answer: 'EduMind is an AI-powered learning platform that personalizes your educational experience. It uses advanced machine learning algorithms to understand your learning style, pace, and preferences, then adapts content and study plans accordingly. Our AI can summarize notes, generate quizzes, provide tutoring support, and track your progress to optimize your learning journey.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Who can benefit from using EduMind?',
      answer: 'EduMind is designed for learners of all levels - from elementary students to graduate students, professionals seeking to upskill, and educators looking to enhance their teaching methods. Whether you\'re studying for exams, learning new skills, or teaching others, our AI tools can adapt to your specific needs and goals.'
    },
    {
      id: 3,
      category: 'features',
      question: 'How accurate is the AI summarization feature?',
      answer: 'Our AI summarization feature maintains 95%+ accuracy by using advanced natural language processing models trained on millions of academic texts. The AI identifies key concepts, main ideas, and important details while preserving the original meaning. You can also provide feedback to help the AI learn your preferences for even more personalized summaries.'
    },
    {
      id: 4,
      category: 'features',
      question: 'Can I use EduMind for any subject?',
      answer: 'Yes! EduMind supports all subjects and academic disciplines. Our AI has been trained on a vast corpus of knowledge spanning STEM fields, humanities, social sciences, languages, and professional skills. The platform adapts its approach based on the subject matter and your specific learning goals.'
    },
    {
      id: 5,
      category: 'features',
      question: 'How does the adaptive quiz system work?',
      answer: 'Our adaptive quiz system uses AI to analyze your performance in real-time and adjusts question difficulty accordingly. If you\'re answering questions correctly, it presents more challenging material. If you\'re struggling, it provides easier questions and additional explanations. This ensures you\'re always learning at the optimal difficulty level.'
    },
    {
      id: 6,
      category: 'features',
      question: 'Is the AI tutor available 24/7?',
      answer: 'Yes, our AI tutor is available round-the-clock to answer your questions, provide explanations, and offer study guidance. Unlike human tutors, there are no scheduling constraints - you can get help whenever you need it, whether it\'s early morning or late at night.'
    },
    {
      id: 7,
      category: 'billing',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 30-day free trial that gives you full access to all features. No credit card is required to start your trial. This allows you to experience the full power of our AI learning tools and see how they can transform your educational experience before making a commitment.'
    },
    {
      id: 8,
      category: 'billing',
      question: 'Can I change my subscription plan?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time through your account settings. Plan changes take effect immediately for upgrades, while downgrades will take effect at the start of your next billing cycle. Any unused portion of your current plan will be prorated.'
    },
    {
      id: 9,
      category: 'billing',
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students with valid .edu email addresses are eligible for a 50% discount on any paid plan. Additionally, we offer special institutional pricing for schools and universities. Contact our sales team for more information about educational discounts and bulk pricing.'
    },
    {
      id: 10,
      category: 'billing',
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied with EduMind for any reason within your first 30 days, we\'ll provide a full refund, no questions asked. For annual subscriptions, refunds are prorated based on usage.'
    },
    {
      id: 11,
      category: 'privacy',
      question: 'How secure is my data?',
      answer: 'We take data security extremely seriously. All your data is encrypted in transit and at rest using industry-standard AES-256 encryption. We comply with GDPR, CCPA, and other privacy regulations. Our servers are hosted in secure data centers with 24/7 monitoring, and we undergo regular security audits.'
    },
    {
      id: 12,
      category: 'privacy',
      question: 'Do you share my personal information?',
      answer: 'No, we never sell or share your personal information with third parties. Your learning data is used solely to improve your educational experience within the platform. We may use anonymized, aggregated data for research and platform improvements, but individual user data remains completely private.'
    },
    {
      id: 13,
      category: 'privacy',
      question: 'Can I delete my account and data?',
      answer: 'Yes, you have complete control over your data. You can delete your account and all associated data at any time through your account settings. Once deleted, your personal information is permanently removed from our systems within 30 days (except where required by law for billing records).'
    },
    {
      id: 14,
      category: 'general',
      question: 'How do I get started with EduMind?',
      answer: 'Getting started is easy! Simply sign up for a free account, complete our 5-minute onboarding questionnaire to help us understand your learning goals, and start exploring our AI tools. Our intuitive interface and helpful tutorials will guide you through each feature.'
    },
    {
      id: 15,
      category: 'features',
      question: 'Can I use EduMind offline?',
      answer: 'Currently, EduMind requires an internet connection to access our AI features, as the processing happens on our secure cloud servers. However, you can access previously generated summaries, downloaded materials, and saved progress offline. We\'re working on offline capabilities for future releases.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find quick answers to common questions about EduMind's features, 
              pricing, and how our AI-powered learning platform works.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <category.icon className="h-5 w-5" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-white rounded-2xl shadow-lg">
                  {filteredFAQs.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {filteredFAQs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => toggleItem(faq.id)}
                            className="w-full px-6 py-6 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900 pr-4">
                                {faq.question}
                              </h3>
                              <ChevronDown
                                className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                                  openItems.includes(faq.id) ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {openItems.includes(faq.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6">
                                  <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No results found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search terms or browse different categories.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Can't find the answer you're looking for? Our friendly support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Contact Support
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;