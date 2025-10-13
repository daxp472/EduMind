import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, FileText, Clock } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, educational institution)',
        'Usage data to improve our AI models and personalize your learning experience',
        'Learning progress and performance data to track your educational journey',
        'Technical information (IP address, browser type, device information) for security and optimization',
        'Communication preferences and support interactions'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Personalizing your learning experience with AI-powered recommendations',
        'Providing customer support and responding to your inquiries',
        'Improving our platform and developing new features',
        'Sending important updates about your account and our services',
        'Ensuring platform security and preventing fraud',
        'Complying with legal obligations and enforcing our terms of service'
      ]
    },
    {
      title: 'Information Sharing and Disclosure',
      content: [
        'We never sell your personal information to third parties',
        'We may share anonymized, aggregated data for research and educational purposes',
        'We may disclose information when required by law or to protect our rights',
        'Service providers who help us operate our platform are bound by strict confidentiality agreements',
        'In case of a business transfer, user information may be transferred as part of the assets'
      ]
    },
    {
      title: 'Data Security and Protection',
      content: [
        'Industry-standard AES-256 encryption for data in transit and at rest',
        'Regular security audits and penetration testing',
        'Secure data centers with 24/7 monitoring and access controls',
        'Multi-factor authentication and access logging for our team',
        'Regular backups and disaster recovery procedures',
        'Compliance with SOC 2 Type II and ISO 27001 standards'
      ]
    },
    {
      title: 'Your Rights and Choices',
      content: [
        'Access and download your personal data at any time',
        'Request correction of inaccurate or incomplete information',
        'Delete your account and all associated data',
        'Opt-out of non-essential communications and marketing',
        'Control privacy settings and data sharing preferences',
        'Request a copy of this privacy policy in accessible formats'
      ]
    },
    {
      title: 'Data Retention',
      content: [
        'Account data is retained as long as your account is active',
        'Learning progress data is kept to maintain continuity of your educational experience',
        'Deleted accounts are purged from our systems within 30 days',
        'Billing records may be retained for up to 7 years as required by law',
        'Anonymous usage data may be retained indefinitely for research purposes'
      ]
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'We build privacy protection into every feature from the ground up'
    },
    {
      icon: Lock,
      title: 'Secure by Default',
      description: 'Your data is encrypted and protected with the highest security standards'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear, understandable policies about how we handle your information'
    },
    {
      icon: Users,
      title: 'User Control',
      description: 'You decide what data to share and can modify or delete it anytime'
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
              Privacy{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're committed to protecting your privacy and being transparent about 
              how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: March 1, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Version 3.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide how we handle your personal information
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Compliance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              International Compliance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We comply with major privacy regulations worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 bg-blue-50 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">GDPR</h3>
              <p className="text-gray-600">
                Full compliance with the European Union's General Data Protection Regulation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6 bg-purple-50 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">CCPA</h3>
              <p className="text-gray-600">
                California Consumer Privacy Act compliance for California residents
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-green-50 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">FERPA</h3>
              <p className="text-gray-600">
                Educational privacy protections under the Family Educational Rights and Privacy Act
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our privacy team is here to help you understand how we protect your information 
              and exercise your privacy rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Contact Privacy Team
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all">
                Download Policy PDF
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20 text-sm opacity-75">
              <p>
                For privacy-related inquiries, contact us at:{' '}
                <a href="mailto:privacy@edumind.ai" className="underline hover:no-underline">
                  privacy@edumind.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;