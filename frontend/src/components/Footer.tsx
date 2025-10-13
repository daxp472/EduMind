import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'AI Tools', path: '/ai-tools/summarizer' },
        { name: 'Study Tools', path: '/study/rooms' },
        { name: 'Analytics', path: '/analytics/learning' },
        { name: 'Pricing', path: '/pricing' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Help Center', path: '/help' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">EduMind</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Revolutionizing education with AI-powered learning tools. Enhance your study experience
              with intelligent assistance, personalized content, and advanced analytics.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Newsletter - Optional */}
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-2">Stay updated with our latest features</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email Us</p>
                <a href="mailto:support@edumind.ai" className="text-gray-200 hover:text-white transition-colors">
                  support@edumind.ai
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Call Us</p>
                <a href="tel:+15551234567" className="text-gray-200 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Visit Us</p>
                <p className="text-gray-200">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} EduMind. All rights reserved. Powered by AI innovation.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
