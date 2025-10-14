import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, Play, Clock, User, Star, Award, TrendingUp, CheckCircle, Lock, FlaskConical, Languages } from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: 'Advanced Calculus Mastery',
      description: 'Master calculus concepts with interactive lessons and problem-solving techniques.',
      category: 'Mathematics',
      level: 'advanced',
      duration: '12 hours',
      lessons: 24,
      students: 1240,
      rating: 4.8,
      instructor: 'Dr. James Stewart',
      price: 49.99,
      isEnrolled: true,
      progress: 75,
      thumbnail: ''
    },
    {
      id: 2,
      title: 'Organic Chemistry Fundamentals',
      description: 'Learn the basics of organic chemistry with real-world applications and examples.',
      category: 'Chemistry',
      level: 'beginner',
      duration: '8 hours',
      lessons: 16,
      students: 890,
      rating: 4.6,
      instructor: 'Prof. Sarah Williams',
      price: 39.99,
      isEnrolled: false,
      progress: 0,
      thumbnail: ''
    },
    {
      id: 3,
      title: 'World History: From Ancient to Modern',
      description: 'Comprehensive course covering major historical events and their impact on today.',
      category: 'History',
      level: 'intermediate',
      duration: '15 hours',
      lessons: 30,
      students: 1560,
      rating: 4.9,
      instructor: 'Dr. Michael Chen',
      price: 59.99,
      isEnrolled: true,
      progress: 30,
      thumbnail: ''
    },
    {
      id: 4,
      title: 'Shakespearean Literature Analysis',
      description: 'Deep dive into Shakespeare\'s works with critical analysis and interpretation.',
      category: 'Literature',
      level: 'advanced',
      duration: '10 hours',
      lessons: 20,
      students: 720,
      rating: 4.7,
      instructor: 'Prof. Emma Davis',
      price: 44.99,
      isEnrolled: false,
      progress: 0,
      thumbnail: ''
    },
    {
      id: 5,
      title: 'Spanish for Beginners',
      description: 'Start your Spanish journey with essential vocabulary and conversation skills.',
      category: 'Languages',
      level: 'beginner',
      duration: '6 hours',
      lessons: 12,
      students: 2100,
      rating: 4.5,
      instructor: 'Maria Rodriguez',
      price: 29.99,
      isEnrolled: true,
      progress: 100,
      thumbnail: ''
    }
  ];

  const filteredCourses = courses.filter(course => 
    (activeCategory === 'all' || course.category.toLowerCase() === activeCategory.toLowerCase()) &&
    (activeLevel === 'all' || course.level === activeLevel) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Courses</h1>
              <p className="text-lg text-gray-600">
                Expand your knowledge with expert-led courses in various subjects
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
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
                  <option value="all">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="history">History</option>
                  <option value="literature">Literature</option>
                  <option value="languages">Languages</option>
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
                <p className="text-gray-600 text-sm">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">124</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Enrolled Students</p>
                <p className="text-2xl font-bold text-green-600">8,450</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-600">78%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
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

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'All Courses' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Courses`}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-gray-600">{course.instructor}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                    <span className="text-sm text-gray-500">({course.students})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {course.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadge(course.level)}`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                </div>
                
                {course.isEnrolled ? (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {course.progress === 100 ? 'Completed' : 'In Progress'}
                      </span>
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`} 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  {course.isEnrolled ? (
                    <>
                      {course.progress === 100 ? (
                        <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          <Award className="h-4 w-4" />
                          <span>Certificate</span>
                        </button>
                      ) : (
                        <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Play className="h-4 w-4" />
                          <span>Continue</span>
                        </button>
                      )}
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Enroll Now
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Lock className="h-4 w-4 text-gray-600" />
                      </button>
                    </>
                  )}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mathematics Mastery</h3>
              <p className="text-gray-600 mb-4">
                Progress from basic arithmetic to advanced calculus with our structured path.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">5 courses</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Science Fundamentals</h3>
              <p className="text-gray-600 mb-4">
                Build a strong foundation in physics, chemistry, and biology.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">7 courses</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Languages className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Language Learning</h3>
              <p className="text-gray-600 mb-4">
                Master new languages with our immersive learning approach.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">4 courses</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;