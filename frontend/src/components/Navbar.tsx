import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain, User, Settings, LogOut, Home, BookOpen, BarChart3, FileText, Target, Calendar, MessageSquare, ChevronDown, Sparkles, Users, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features', icon: Target },
    {
      name: 'AI Tools',
      path: '/ai-tools/summarizer',
      icon: Brain,
      dropdown: [
        { name: 'AI Summarizer', path: '/ai-tools/summarizer', icon: FileText },
        { name: 'Quiz Generator', path: '/ai-tools/quiz-generator', icon: Target },
        { name: 'AI Tutor', path: '/ai-tools/tutor', icon: MessageSquare },
        { name: 'Study Planner', path: '/ai-tools/study-planner', icon: Calendar },
        { name: 'Flashcard Generator', path: '/ai-tools/flashcards', icon: BookOpen },
        { name: 'Essay Analyzer', path: '/ai-tools/essay-analyzer', icon: FileText },
        { name: 'Concept Mapper', path: '/ai-tools/concept-mapper', icon: Brain },
        { name: 'Language Tutor', path: '/ai-tools/language-tutor', icon: MessageSquare },
        { name: 'Math Solver', path: '/ai-tools/math-solver', icon: Target },
        { name: 'Research Assistant', path: '/ai-tools/research-assistant', icon: Search },
      ]
    },
    {
      name: 'Study',
      path: '/study/rooms',
      icon: BookOpen,
      dropdown: [
        { name: 'Study Rooms', path: '/study/rooms', icon: Home },
        { name: 'Study Groups', path: '/study/groups', icon: Users },
        { name: 'Study Timer', path: '/study/timer', icon: Target },
        { name: 'Study Goals', path: '/study/goals', icon: Target },
        { name: 'Calendar', path: '/study/calendar', icon: Calendar },
        { name: 'Materials', path: '/study/materials', icon: FileText },
        { name: 'Notes', path: '/study/notes', icon: FileText },
      ]
    },
    {
      name: 'Community',
      path: '/community',
      icon: Users,
      dropdown: [
        { name: 'Study Community', path: '/community', icon: Users },
        { name: 'Study Buddies', path: '/community/buddies', icon: Users },
        { name: 'Discussion Forums', path: '/community/forums', icon: MessageSquare },
        { name: 'Study Events', path: '/community/events', icon: Calendar },
        { name: 'Leaderboards', path: '/community/leaderboards', icon: BarChart3 },
      ]
    },
    {
      name: 'Resources',
      path: '/resources/library',
      icon: FileText,
      dropdown: [
        { name: 'Library', path: '/resources/library', icon: FileText },
        { name: 'Courses', path: '/resources/courses', icon: BookOpen },
        { name: 'Tutorials', path: '/resources/tutorials', icon: Target },
        { name: 'Templates', path: '/resources/templates', icon: FileText },
        { name: 'AI Models', path: '/resources/ai-models', icon: Brain },
      ]
    },
    {
      name: 'Analytics',
      path: '/analytics/learning',
      icon: BarChart3,
      dropdown: [
        { name: 'Learning Analytics', path: '/analytics/learning', icon: BarChart3 },
        { name: 'Progress Reports', path: '/analytics/reports', icon: BarChart3 },
        { name: 'Performance Insights', path: '/analytics/insights', icon: BarChart3 },
        { name: 'Learning Paths', path: '/analytics/learning-paths', icon: BarChart3 },
      ]
    },
    { name: 'Pricing', path: '/pricing', icon: Sparkles },
    { name: 'About', path: '/about', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
      ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-2'
      : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="p-2.5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-indigo-500/20"
              >
                <Brain className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors">
                  EDUMIND
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-500">Neural Academy</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${location.pathname.startsWith(item.path.split('/').slice(0, 2).join('/'))
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className={`h-3 w-3 ml-1 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </Link>

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className={`absolute left-0 mt-2 bg-zinc-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 py-3 overflow-hidden ${item.dropdown.length > 6 ? 'w-[450px] grid grid-cols-2' : 'w-56'}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={`flex items-center space-x-3 px-4 py-2.5 text-xs font-bold transition-all relative z-10 ${location.pathname === dropdownItem.path
                            ? 'text-white bg-white/5'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          <dropdownItem.icon className="h-4 w-4 text-indigo-400" />
                          <span className="truncate">{dropdownItem.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="h-6 w-[1px] bg-white/10 mx-4" />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-3 p-1.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-[10px] font-black group-hover:scale-105 transition-transform">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-zinc-300 mr-2">{user.name.split(' ')[0]}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-zinc-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 py-3 overflow-hidden"
                    >
                      {[
                        { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
                        { icon: User, label: 'Profile Settings', path: '/profile' },
                        { icon: Settings, label: 'Preferences', path: '/settings' },
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="flex items-center space-x-3 px-4 py-3 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                          onClick={() => setProfileOpen(false)}
                        >
                          <item.icon className="h-4 w-4 text-indigo-400" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                      <div className="h-[1px] bg-white/10 my-2 mx-4" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 w-full text-left transition-all"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white px-4 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-xl border border-white/5 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 top-[72px] bg-[#050505]/95 backdrop-blur-2xl z-40 md:hidden border-t border-white/5 overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-8">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 text-lg font-black tracking-tight text-white"
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-indigo-500" />
                    <span>{item.name}</span>
                  </Link>
                  {item.dropdown && (
                    <div className="grid grid-cols-1 gap-3 pl-8">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className="text-sm font-bold text-zinc-500 hover:text-indigo-400 py-1 flex items-center space-x-3"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                          <span>{dropdownItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-8 border-t border-white/5 space-y-6">
                {user ? (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Active Account</p>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center font-black">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/dashboard" className="block text-zinc-400 font-bold hover:text-white" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    <Link to="/profile" className="block text-zinc-400 font-bold hover:text-white" onClick={() => setIsOpen(false)}>Profile</Link>
                    <button onClick={handleLogout} className="text-red-500 font-bold uppercase text-xs tracking-widest pt-4">Sign Out</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-center font-black text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/signup"
                      className="px-6 py-4 rounded-2xl bg-white text-black text-center font-black shadow-xl shadow-indigo-500/20"
                      onClick={() => setIsOpen(false)}
                    >
                      JOIN
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
