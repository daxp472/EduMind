import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Target, Clock, BookOpen, Zap, TrendingUp, Filter, Crown, Award, Users } from 'lucide-react';

const Leaderboards = () => {
  const [activeCategory, setActiveCategory] = useState('overall');
  const [timeRange, setTimeRange] = useState('monthly');

  // Mock data for leaderboard users
  const leaderboardUsers = [
    {
      id: 1,
      name: 'Alex Johnson',
      rank: 1,
      score: 2450,
      change: '+12',
      avatar: '',
      subjects: ['Mathematics', 'Physics'],
      studyHours: 42,
      streak: 15,
      badges: ['Math Whiz', 'Consistent Learner']
    },
    {
      id: 2,
      name: 'Sarah Williams',
      rank: 2,
      score: 2380,
      change: '+8',
      avatar: '',
      subjects: ['Chemistry', 'Biology'],
      studyHours: 38,
      streak: 12,
      badges: ['Science Expert', 'Top Performer']
    },
    {
      id: 3,
      name: 'Mike Chen',
      rank: 3,
      score: 2290,
      change: '-2',
      avatar: '',
      subjects: ['Computer Science', 'Mathematics'],
      studyHours: 45,
      streak: 18,
      badges: ['Coding Master', 'Quick Responder']
    },
    {
      id: 4,
      name: 'Emma Davis',
      rank: 4,
      score: 2180,
      change: '+5',
      avatar: '',
      subjects: ['Literature', 'History'],
      studyHours: 35,
      streak: 10,
      badges: ['Bookworm', 'Creative']
    },
    {
      id: 5,
      name: 'James Wilson',
      rank: 5,
      score: 2090,
      change: '+3',
      avatar: '',
      subjects: ['Languages', 'History'],
      studyHours: 32,
      streak: 8,
      badges: ['Polyglot', 'Historian']
    }
  ];

  // Mock data for subject rankings
  const subjectRankings = [
    { subject: 'Mathematics', rank: 1, score: 2450, users: 124 },
    { subject: 'Physics', rank: 2, score: 2380, users: 98 },
    { subject: 'Chemistry', rank: 3, score: 2290, users: 87 },
    { subject: 'Biology', rank: 4, score: 2180, users: 103 },
    { subject: 'Literature', rank: 5, score: 2090, users: 76 }
  ];

  // Get medal icon based on rank
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-700" />;
      default: return <span className="font-bold text-gray-900">#{rank}</span>;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboards</h1>
              <p className="text-lg text-gray-600">
                See how you rank against other learners in the EduMind community
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex space-x-2">
                {['overall', 'math', 'science', 'literature', 'languages'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {['weekly', 'monthly', 'yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
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
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,842</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Score</p>
                <p className="text-2xl font-bold text-green-600">1,840</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Study Hours</p>
                <p className="text-2xl font-bold text-purple-600">12,450</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-orange-600">87%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Users */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === 'overall' ? 'Overall Rankings' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Rankings`}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Zap className="h-4 w-4" />
                  <span>Updated 5 minutes ago</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {leaderboardUsers.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200' 
                        : index === 1 
                          ? 'bg-gray-50' 
                          : index === 2 
                            ? 'bg-amber-50' 
                            : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.subjects.slice(0, 2).map((subject, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{user.score}</div>
                        <div className={`text-xs flex items-center justify-end ${
                          user.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {user.change.startsWith('+') ? '↑' : '↓'} {user.change}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{user.studyHours}h</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Zap className="h-4 w-4" />
                        <span>{user.streak}d</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Subject Rankings and Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Subject Rankings */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top Subjects</h3>
              <div className="space-y-3">
                {subjectRankings.map((subject, index) => (
                  <div 
                    key={subject.subject} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6">
                        {index < 3 ? (
                          <Medal className={`h-4 w-4 ${
                            index === 0 ? 'text-yellow-500' : 
                            index === 1 ? 'text-gray-400' : 'text-amber-700'
                          }`} />
                        ) : (
                          <span className="text-xs font-medium text-gray-900">#{index + 1}</span>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{subject.subject}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{subject.score}</div>
                      <div className="text-xs text-gray-500">{subject.users} users</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-center text-white">
                  <Trophy className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-bold text-lg">Top Learner</div>
                  <div className="text-sm opacity-90">This Week</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-center text-white">
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-bold text-lg">Streak Master</div>
                  <div className="text-sm opacity-90">15 Days</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-center text-white">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-bold text-lg">Bookworm</div>
                  <div className="text-sm opacity-90">50h Study</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-center text-white">
                  <Award className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-bold text-lg">Quiz Master</div>
                  <div className="text-sm opacity-90">95% Avg</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Leaderboards Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Points System</h3>
              <p className="text-gray-600">
                Earn points for completing lessons, quizzes, and study sessions. Higher difficulty = more points.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Streak Bonuses</h3>
              <p className="text-gray-600">
                Maintain daily study streaks for bonus points. Longer streaks = bigger bonuses.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Rewards</h3>
              <p className="text-gray-600">
                Top performers each week receive exclusive badges and learning resources.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboards;