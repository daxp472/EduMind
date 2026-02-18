import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'Neural Tools', path: '/ai-tools/summarizer' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Analytics', path: '/analytics/learning' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/help' },
        { name: 'API Status', path: '#' },
        { name: 'Community', path: '/community' },
        { name: 'Research', path: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '#' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy', path: '/privacy' },
      ]
    }
  ];

  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter">EDUMIND</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-500">Intelligence Accelerated</span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Architecting the future of cognition. Leveraging neural networks to provide
              high-fidelity educational tools for the modern scholar.
            </p>

            <div className="flex space-x-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-zinc-400 hover:text-white transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-zinc-400 hover:text-white transition-colors duration-200 text-xs font-bold"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Waitlist
            </h3>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button className="absolute right-2 top-2 p-1 text-indigo-400 hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
              <Sparkles size={10} className="text-amber-500" />
              Join 10k+ researchers
            </div>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
          {[
            { label: 'Network', value: 'support@edumind.ai', icon: Mail },
            { label: 'Inbound', value: '+1 (555) NEURAL', icon: Phone },
            { label: 'Hq', value: 'Silicon Valley, CA', icon: MapPin },
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/5 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">{item.label}</p>
                <p className="text-xs font-bold text-zinc-300">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-white/5 gap-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            &copy; {currentYear} EduMind Labs <span className="w-1 h-1 bg-zinc-800 rounded-full" /> All protocols secured
          </p>
          <div className="flex gap-8">
            {['Status', 'Security', 'Compliance'].map((text, i) => (
              <a key={i} href="#" className="text-[10px] font-bold text-zinc-600 hover:text-white uppercase tracking-tighter transition-colors">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
