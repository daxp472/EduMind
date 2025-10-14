import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Search, Filter, Clock, User, Star, BookOpen, Video, Code, Check } from 'lucide-react';

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  // Mock data for tutorials
  const tutorials = [
    {
      id: 1,
      title: 'How to Use the AI Summarizer',
      description: 'Learn how to effectively use our AI-powered text summarization tool to save time on studying.',
      category: 'ai-tools',
      level: 'beginner',
      duration: '8 min',
      views: 1240,
      rating: 4.8,
      instructor: 'EduMind Team',
      isWatched: true,
      thumbnail: ''
    },
    {
      id: 2,
      title: 'Creating Effective Study Plans',
      description: 'Master the art of creating personalized study schedules that maximize your learning efficiency.',
      category: 'study-tips',
      level: 'intermediate',
      duration: '12 min',
      views: 890,
      rating: 4.6,
      instructor: 'Dr. Sarah Williams',
      isWatched: false,
      thumbnail: ''
    },
    {
      id: 3,
      title: 'Advanced Quiz Generation Techniques',
      description: 'Learn how to create custom quizzes with our AI tool for more effective self-testing.',
      category: 'ai-tools',
      level: 'advanced',
      duration: '15 min',
      views: 650,
      rating: 4.7,
      instructor: 'Prof. Michael Chen',
      isWatched: true,
      thumbnail: ''
    },
    {
      id: 4,
      title: 'Note-Taking Strategies for Visual Learners',
      description: 'Discover techniques specifically designed for visual learners to enhance retention.',
      category: 'study-tips',
      level: 'beginner',
      duration: '10 min',
      views: 1420,
      rating: 4.9,
      instructor: 'Emma Davis',
      isWatched: false,
      thumbnail: ''
    },
    {
      id: 5,
      title: 'Using Flashcards for Language Learning',
      description: 'Maximize your language learning with our AI-powered flashcard generation tool.',
      category: 'ai-tools',
      level: 'intermediate',
      duration: '7 min',
      views: 2100,
      rating: 4.5,
      instructor: 'Maria Rodriguez',
      isWatched: true,
      thumbnail: ''
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => 
    (activeCategory === 'all' || tutorial.category.toLowerCase() === activeCategory.toLowerCase()) &&
    (activeLevel === 'all' || tutorial.level === activeLevel) &&
    (tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tutorial.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-tools': return <Code className="h-5 w-5 text-blue-600" />;
      case 'study-tips': return <BookOpen className="h-5 w-5 text-green-600" />;
      default: return <Video className="h-5 w-5 text-purple-600" />;
    }
  };

  // Get level badge color
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Tutorials</h1>
              <p className="text-lg text-gray-600">
                Step-by-step guides to help you master EduMind's features and study techniques
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tutorials..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select 
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="ai-tools">AI Tools</option>
                  <option value="study-tips">Study Tips</option>
                  <option value="productivity">Productivity</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Level:</span>
                <select 
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={activeLevel}
                  onChange={(e) => setActiveLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tutorials</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-green-600">24,560</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Duration</p>
                <p className="text-2xl font-bold text-purple-600">9.2 min</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold text-orange-600">4.7</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Star className="h-6 w-6 text-orange-600 fill-current" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tutorials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'All Tutorials' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tutorials`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <div 
                key={tutorial.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                  {tutorial.isWatched && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Watched
                    </div>
                  )}
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{tutorial.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{tutorial.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-gray-100 rounded">
                      {getCategoryIcon(tutorial.category)}
                    </div>
                    <span className="text-sm text-gray-600">{tutorial.instructor}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadge(tutorial.level)}`}>
                    {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{tutorial.views} views</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Watch Tutorial
                    <Play className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tutorial Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Mastering AI Tools</h3>
                  <p className="text-gray-600 mb-4">
                    A comprehensive path to learn all AI-powered tools in EduMind.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">6 tutorials • 45 min</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Start Learning →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Techniques Mastery</h3>
                  <p className="text-gray-600 mb-4">
                    Learn evidence-based study methods to improve retention and recall.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">8 tutorials • 62 min</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Start Learning →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tutorials;