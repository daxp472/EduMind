import { motion } from 'framer-motion';
import { FileText, Scale, Shield, Clock } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using EduMind ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These Terms of Service constitute a legally binding agreement between you and EduMind Inc.`
    },
    {
      title: 'Description of Service',
      content: `EduMind is an AI-powered educational platform that provides personalized learning tools, including but not limited to note summarization, quiz generation, progress tracking, and AI tutoring services. Our services are designed to enhance your learning experience through artificial intelligence and machine learning technologies.`
    },
    {
      title: 'User Accounts and Registration',
      content: `To access certain features of our Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities under your account.`
    },
    {
      title: 'Acceptable Use Policy',
      content: `You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service: (a) to violate any applicable laws or regulations; (b) to transmit any harmful, offensive, or inappropriate content; (c) to interfere with the Service's operation; (d) to attempt to gain unauthorized access to any systems; or (e) to use the Service for any commercial purpose without our prior written consent.`
    },
    {
      title: 'Intellectual Property Rights',
      content: `The Service and its original content, features, and functionality are owned by EduMind Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You retain ownership of any content you submit to the Service, but grant us a license to use, display, and distribute such content as necessary to provide the Service.`
    },
    {
      title: 'AI-Generated Content',
      content: `Our Service uses artificial intelligence to generate summaries, quizzes, explanations, and other educational content. While we strive for accuracy, AI-generated content may contain errors or inaccuracies. You should verify important information from authoritative sources. We do not guarantee the accuracy, completeness, or reliability of AI-generated content.`
    },
    {
      title: 'Subscription and Payment Terms',
      content: `Certain features of our Service require payment. Subscription fees are charged in advance on a recurring basis. You authorize us to charge your payment method for applicable fees. All fees are non-refundable except as required by law or as specifically stated in our refund policy. We may change our fees at any time with 30 days' notice.`
    },
    {
      title: 'Privacy and Data Protection',
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy. We implement appropriate security measures to protect your personal information.`
    },
    {
      title: 'Educational Use and Academic Integrity',
      content: `Our Service is designed to enhance learning and should be used as a study aid. You are responsible for ensuring that your use of our Service complies with your educational institution's academic integrity policies. We encourage the ethical use of AI tools in education and recommend transparency about AI assistance when required by your institution.`
    },
    {
      title: 'Service Availability and Modifications',
      content: `We strive to provide reliable service but cannot guarantee uninterrupted access. We may modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice. We may also update these Terms from time to time, and continued use of the Service constitutes acceptance of modified Terms.`
    },
    {
      title: 'Disclaimer of Warranties',
      content: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.`
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law, EduMind Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use of the Service. Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding the claim.`
    },
    {
      title: 'Indemnification',
      content: `You agree to defend, indemnify, and hold harmless EduMind Inc., its affiliates, officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from your use of the Service or violation of these Terms.`
    },
    {
      title: 'Termination',
      content: `You may terminate your account at any time by following the instructions in your account settings. We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.`
    },
    {
      title: 'Governing Law and Dispute Resolution',
      content: `These Terms shall be governed by and construed in accordance with the laws of Delaware, USA, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, except that either party may seek injunctive relief in court.`
    },
    {
      title: 'Contact Information',
      content: `If you have any questions about these Terms of Service, please contact us at legal@edumind.ai or write to us at: EduMind Inc., 123 Innovation Street, San Francisco, CA 94105, USA.`
    }
  ];

  const highlights = [
    {
      icon: Scale,
      title: 'Fair Use',
      description: 'Use our AI tools ethically and in compliance with academic integrity policies'
    },
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'Your personal information and learning data are protected by industry-standard security'
    },
    {
      icon: FileText,
      title: 'Content Rights',
      description: 'You retain ownership of your content while granting us license to provide our services'
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
              Terms of{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              These terms govern your use of EduMind's AI-powered learning platform. 
              Please read them carefully to understand your rights and obligations.
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

      {/* Key Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Points to Remember
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important highlights from our terms of service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
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
              Questions About Our Terms?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our legal team is available to help you understand these terms 
              and how they apply to your use of EduMind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Contact Legal Team
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all">
                Download Terms PDF
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20 text-sm opacity-75">
              <p>
                For legal inquiries, contact us at:{' '}
                <a href="mailto:legal@edumind.ai" className="underline hover:no-underline">
                  legal@edumind.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;