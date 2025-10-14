import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain, User, Settings, LogOut, Home, BookOpen, Users, BarChart3, FileText, Target, Calendar, MessageSquare, Search } from 'lucide-react';
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
    { name: 'Home', path: '/home', icon: Home },
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
    { name: 'Pricing', path: '/pricing', icon: Target },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm' 
        : 'bg-white/80 backdrop-blur-md border-b border-blue-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
              >
                <Brain className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduMind
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    location.pathname.startsWith(item.path.split('/').slice(0, 2).join('/'))
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.dropdown && <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>}
                </Link>

                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.path}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                          location.pathname === dropdownItem.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <dropdownItem.icon className="h-4 w-4" />
                        <span>{dropdownItem.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {user ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-t-lg"
                        onClick={() => setProfileOpen(false)}
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname.startsWith(item.path.split('/').slice(0, 2).join('/'))
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                  {item.dropdown && (
                    <div className="pl-8 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            location.pathname === dropdownItem.path
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <dropdownItem.icon className="h-4 w-4" />
                          <span>{dropdownItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {user ? (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {user.name}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;