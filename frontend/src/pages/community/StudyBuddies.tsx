import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, MessageCircle, UserPlus, Star, Award, Clock, BookOpen } from 'lucide-react';

const StudyBuddies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for study buddies
  const studyBuddies = [
    {
      id: 1,
      name: 'Alex Johnson',
      subject: 'Mathematics',
      rating: 4.8,
      studyHours: 120,
      badges: ['Math Whiz', 'Top Performer'],
      online: true,
      mutualFriends: 3
    },
    {
      id: 2,
      name: 'Sarah Williams',
      subject: 'Physics',
      rating: 4.9,
      studyHours: 95,
      badges: ['Science Expert', 'Helpful'],
      online: false,
      mutualFriends: 5
    },
    {
      id: 3,
      name: 'Mike Chen',
      subject: 'Computer Science',
      rating: 4.7,
      studyHours: 150,
      badges: ['Coding Master', 'Quick Responder'],
      online: true,
      mutualFriends: 2
    },
    {
      id: 4,
      name: 'Emma Davis',
      subject: 'Literature',
      rating: 4.6,
      studyHours: 85,
      badges: ['Bookworm', 'Creative'],
      online: true,
      mutualFriends: 4
    }
  ];

  const filteredBuddies = studyBuddies.filter(buddy => 
    buddy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buddy.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Study Buddies</h1>
              <p className="text-lg text-gray-600">
                Connect with fellow learners who share your interests and goals
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for study buddies..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Buddies</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Online Now</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Study Hours</p>
                <p className="text-2xl font-bold text-purple-600">1,240</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Study Buddies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Study Buddies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuddies.map((buddy) => (
              <div 
                key={buddy.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {buddy.name.charAt(0)}
                      </div>
                      {buddy.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{buddy.name}</h3>
                      <p className="text-sm text-gray-600">{buddy.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{buddy.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {buddy.badges.map((badge, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{buddy.studyHours} hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{buddy.mutualFriends} mutual</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>Message</span>
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <UserPlus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Study Groups</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Advanced Calculus Study Group</h3>
                  <p className="text-sm text-gray-600">15 members • 4 online now</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                For students tackling advanced calculus concepts. Share resources, solve problems together, and prepare for exams.
              </p>
              <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Join Group
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Literature Analysis Club</h3>
                  <p className="text-sm text-gray-600">22 members • 7 online now</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Deep dive into classic and contemporary literature. Weekly discussions and essay reviews.
              </p>
              <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Join Group
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudyBuddies;