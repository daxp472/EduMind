import { useState } from 'react';
import { motion } from 'framer-motion';
import { Route, MapPin, CheckCircle, Clock, Star, ArrowRight, Play, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const learningPaths = [
    {
      id: 1,
      title: 'Complete Calculus Mastery',
      category: 'Mathematics',
      description: 'Master calculus from basics to advanced applications',
      difficulty: 'Advanced',
      duration: '12 weeks',
      modules: 8,
      completedModules: 5,
      progress: 62,
      rating: 4.8,
      enrolled: 1247,
      prerequisites: ['Algebra', 'Trigonometry'],
      skills: ['Derivatives', 'Integrals', 'Applications', 'Series'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      category: 'Physics',
      description: 'Build strong foundation in classical and modern physics',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      modules: 6,
      completedModules: 3,
      progress: 50,
      rating: 4.6,
      enrolled: 892,
      prerequisites: ['Basic Math'],
      skills: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Waves'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      category: 'Computer Science',
      description: 'Learn ML algorithms, data processing, and model building',
      difficulty: 'Advanced',
      duration: '16 weeks',
      modules: 10,
      completedModules: 2,
      progress: 20,
      rating: 4.9,
      enrolled: 2156,
      prerequisites: ['Python Programming', 'Statistics'],
      skills: ['Supervised Learning', 'Neural Networks', 'Deep Learning', 'NLP'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Spanish Fluency Journey',
      category: 'Languages',
      description: 'Achieve conversational fluency in Spanish',
      difficulty: 'Beginner',
      duration: '20 weeks',
      modules: 12,
      completedModules: 8,
      progress: 67,
      rating: 4.7,
      enrolled: 3421,
      prerequisites: ['None'],
      skills: ['Grammar', 'Vocabulary', 'Conversation', 'Culture'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Organic Chemistry Mastery',
      category: 'Chemistry',
      description: 'Master organic chemistry reactions and mechanisms',
      difficulty: 'Advanced',
      duration: '14 weeks',
      modules: 9,
      completedModules: 1,
      progress: 11,
      rating: 4.5,
      enrolled: 567,
      prerequisites: ['General Chemistry'],
      skills: ['Reactions', 'Mechanisms', 'Synthesis', 'Spectroscopy'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      title: 'Cell Biology Deep Dive',
      category: 'Biology',
      description: 'Explore cellular processes and molecular biology',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      modules: 5,
      completedModules: 0,
      progress: 0,
      rating: 4.4,
      enrolled: 734,
      prerequisites: ['Basic Biology'],
      skills: ['Cell Structure', 'Metabolism', 'Genetics', 'Signaling'],
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: learningPaths.length },
    { id: 'Mathematics', name: 'Mathematics', count: 1 },
    { id: 'Physics', name: 'Physics', count: 1 },
    { id: 'Computer Science', name: 'Computer Science', count: 1 },
    { id: 'Languages', name: 'Languages', count: 1 },
    { id: 'Chemistry', name: 'Chemistry', count: 1 },
    { id: 'Biology', name: 'Biology', count: 1 }
  ];

  const filteredPaths = learningPaths.filter(path => 
    activeCategory === 'all' || path.category === activeCategory
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'Advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const startPath = (pathId) => {
    toast.success('Learning path started! Check your dashboard for progress.');
  };

  const continuePath = (pathId) => {
    toast.success('Continuing where you left off...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
              <Route className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learning Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow structured, AI-curated learning journeys designed to take you from beginner to expert
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Learning Paths Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPaths.map((path) => (
            <div key={path.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Path Header */}
              <div className={`h-32 bg-gradient-to-r ${path.color} p-6 text-white relative overflow-hidden`}>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                  <p className="text-sm opacity-90">{path.description}</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <Route className="h-24 w-24" />
                </div>
              </div>

              {/* Path Content */}
              <div className="p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{path.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${path.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {path.completedModules}/{path.modules} modules completed
                  </div>
                </div>

                {/* Path Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{path.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600">{path.rating} ({path.enrolled})</span>
                  </div>
                </div>

                {/* Difficulty and Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">{path.category}</span>
                </div>

                {/* Prerequisites */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Prerequisites:</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.prerequisites.map((prereq, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills you'll learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {path.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{path.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex space-x-3">
                  {path.progress > 0 ? (
                    <button
                      onClick={() => continuePath(path.id)}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      <span>Continue</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => startPath(path.id)}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Path</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedPath(path)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Path Details Modal */}
        {selectedPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedPath.title}</h2>
                <button
                  onClick={() => setSelectedPath(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Path Overview */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Path Overview</h3>
                    <p className="text-gray-700 mb-4">{selectedPath.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedPath.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedPath.modules}</div>
                        <div className="text-sm text-gray-600">Modules</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Your Progress</span>
                        <span className="text-blue-600 font-semibold">{selectedPath.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`bg-gradient-to-r ${selectedPath.color} h-3 rounded-full transition-all duration-300`}
                          style={{ width: `${selectedPath.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Prerequisites */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.prerequisites.map((prereq, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Skills You'll Master</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module Breakdown */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Modules</h3>
                  <div className="space-y-3">
                    {Array.from({ length: selectedPath.modules }, (_, index) => {
                      const moduleNumber = index + 1;
                      const isCompleted = moduleNumber <= selectedPath.completedModules;
                      const isCurrent = moduleNumber === selectedPath.completedModules + 1;
                      const isLocked = moduleNumber > selectedPath.completedModules + 1;

                      return (
                        <div
                          key={index}
                          className={`flex items-center space-x-4 p-4 rounded-xl border-2 ${
                            isCompleted 
                              ? 'border-green-200 bg-green-50' 
                              : isCurrent 
                              ? 'border-blue-200 bg-blue-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : isLocked ? (
                              <Lock className="h-5 w-5" />
                            ) : (
                              <span className="font-semibold">{moduleNumber}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              isCompleted ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-600'
                            }`}>
                              Module {moduleNumber}: {
                                selectedPath.category === 'Mathematics' ? 
                                  ['Limits', 'Derivatives', 'Applications', 'Integration', 'Series', 'Multivariable', 'Vector Calculus', 'Advanced Topics'][index] :
                                selectedPath.category === 'Physics' ?
                                  ['Mechanics', 'Thermodynamics', 'Waves', 'Electromagnetism', 'Modern Physics', 'Quantum Basics'][index] :
                                selectedPath.category === 'Computer Science' ?
                                  ['Python Basics', 'Data Processing', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision', 'Model Deployment', 'Advanced Topics'][index] :
                                selectedPath.category === 'Languages' ?
                                  ['Basics', 'Grammar', 'Vocabulary', 'Conversation', 'Reading', 'Writing', 'Culture', 'Advanced Grammar', 'Literature', 'Business Spanish', 'Fluency', 'Mastery'][index] :
                                selectedPath.category === 'Chemistry' ?
                                  ['Fundamentals', 'Functional Groups', 'Reactions', 'Mechanisms', 'Synthesis', 'Stereochemistry', 'Spectroscopy', 'Advanced Synthesis', 'Applications'][index] :
                                  ['Cell Structure', 'Metabolism', 'Genetics', 'Signaling', 'Advanced Topics'][index]
                              }
                            </h4>
                            <p className="text-sm text-gray-500">
                              {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Locked'}
                            </p>
                          </div>
                          {isCurrent && (
                            <button
                              onClick={() => toast.success('Opening module...')}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                              Continue
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    {selectedPath.progress > 0 ? (
                      <button
                        onClick={() => continuePath(selectedPath.id)}
                        className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        <span>Continue Learning</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => startPath(selectedPath.id)}
                        className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        <span>Start Path</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;