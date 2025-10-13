import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Rocket, Star } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying out EduMind',
      features: [
        '5 AI summaries per month',
        '3 quiz generations',
        'Basic progress tracking',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited AI interactions',
        'No advanced analytics',
        'No priority support'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Student',
      icon: Zap,
      price: { monthly: 9.99, annual: 7.99 },
      description: 'Ideal for individual learners',
      features: [
        'Unlimited AI summaries',
        'Unlimited quiz generation',
        'Advanced progress analytics',
        'AI tutor chat support',
        'Study schedule optimization',
        'Note organization tools',
        'Priority email support'
      ],
      limitations: [],
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Pro',
      icon: Crown,
      price: { monthly: 19.99, annual: 15.99 },
      description: 'For serious learners and professionals',
      features: [
        'Everything in Student',
        'Advanced AI models',
        'Custom study plans',
        'Collaboration tools',
        'Export capabilities',
        'Integration with LMS',
        'Phone support',
        'Custom AI training'
      ],
      limitations: [],
      popular: false,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Institution',
      icon: Rocket,
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'For schools and organizations',
      features: [
        'Everything in Pro',
        'Bulk user management',
        'Advanced admin controls',
        'Custom branding',
        'Dedicated support manager',
        'SLA guarantees',
        'On-premise deployment',
        'Custom integrations'
      ],
      limitations: [],
      popular: false,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a student discount?',
      answer: 'Yes! Students with valid .edu email addresses get 50% off any paid plan. Contact support for verification.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for institutional accounts.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.'
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learning Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Unlock the full potential of AI-powered learning with plans designed 
              for every student, educator, and institution.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                } hover:shadow-2xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {typeof plan.price.monthly === 'number' ? (
                      <>
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                        <span className="text-lg font-medium text-gray-500">/month</span>
                      </>
                    ) : (
                      plan.price.monthly
                    )}
                  </div>
                  {isAnnual && typeof plan.price.annual === 'number' && plan.price.annual > 0 && (
                    <p className="text-sm text-gray-500">
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center space-x-3 opacity-60">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : 
                   plan.name === 'Institution' ? 'Contact Sales' : 
                   'Start Free Trial'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduMind?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare our features with traditional learning methods
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-900 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 text-gray-900 font-semibold">Traditional Learning</th>
                  <th className="text-center py-4 px-6 text-blue-600 font-semibold">EduMind AI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Personalization</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">24/7 Availability</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Instant Feedback</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Adaptive Learning</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Scalability</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing FAQs
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our pricing and plans
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your AI-Powered Learning Journey
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of students who are already learning smarter, not harder, with EduMind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;