import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBar as BarChart3, TrendingUp, Clock, Target, Brain, Calendar, Award, Zap } from 'lucide-react';

const LearningAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    {
      title: 'Study Hours',
      value: '24.5h',
      change: '+12%',
      icon: Clock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Concepts Learned',
      value: '47',
      change: '+8%',
      icon: Brain,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Quiz Score Avg',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Learning Streak',
      value: '12 days',
      change: 'Current',
      icon: Award,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const subjectProgress = [
    { subject: 'Mathematics', progress: 85, hours: 12.5, color: 'bg-blue-500' },
    { subject: 'Physics', progress: 72, hours: 8.2, color: 'bg-green-500' },
    { subject: 'Chemistry', progress: 68, hours: 6.8, color: 'bg-purple-500' },
    { subject: 'Biology', progress: 91, hours: 15.3, color: 'bg-orange-500' },
    { subject: 'Computer Science', progress: 78, hours: 10.1, color: 'bg-pink-500' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 3.5, efficiency: 85 },
    { day: 'Tue', hours: 4.2, efficiency: 78 },
    { day: 'Wed', hours: 2.8, efficiency: 92 },
    { day: 'Thu', hours: 5.1, efficiency: 88 },
    { day: 'Fri', hours: 3.9, efficiency: 82 },
    { day: 'Sat', hours: 6.2, efficiency: 95 },
    { day: 'Sun', hours: 4.8, efficiency: 89 }
  ];

  const learningInsights = [
    {
      title: 'Peak Performance Time',
      insight: 'You perform best between 9-11 AM with 95% efficiency',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Strongest Subject',
      insight: 'Biology shows consistent improvement with 91% mastery',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Learning Pattern',
      insight: 'Visual learning methods show 23% better retention',
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      title: 'Recommendation',
      insight: 'Focus on Chemistry concepts for balanced progress',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Analytics</h1>
            <p className="text-lg text-gray-600">Track your progress and optimize your learning journey</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Weekly Study Hours Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Weekly Study Pattern</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Study Hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Efficiency</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{day.hours}h</span>
                        <span className="text-sm text-gray-600">{day.efficiency}%</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-500 h-3 rounded-full"
                            style={{ width: `${(day.hours / 7) * 100}%` }}
                          ></div>
                        </div>
                        <div 
                          className="absolute top-0 bg-green-500 h-3 rounded-full opacity-60"
                          style={{ width: `${day.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                {learningInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${insight.color}`}>
                      <insight.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Efficiency */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Learning Efficiency</h3>
              </div>
              <div className="text-3xl font-bold mb-2">87%</div>
              <p className="text-purple-100 text-sm">
                Your learning efficiency has improved by 15% this month. Keep up the great work!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - subject.progress / 100)}`}
                        className={subject.color.replace('bg-', 'text-')}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{subject.progress}%</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{subject.subject}</h3>
                  <p className="text-sm text-gray-600">{subject.hours}h studied</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Study 80 hours</span>
                  <span className="text-sm text-gray-500">62/80 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '77.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Complete 20 quizzes</span>
                  <span className="text-sm text-gray-500">16/20 quizzes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Maintain 85% avg score</span>
                  <span className="text-sm text-gray-500">87% current</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Achievement Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Quiz Master</p>
                  <p className="text-sm text-gray-500">Completed 50 quizzes with 90%+ score</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Study Streak</p>
                  <p className="text-sm text-gray-500">12 consecutive days of studying</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Subject Expert</p>
                  <p className="text-sm text-gray-500">Mastered Biology with 91% completion</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LearningAnalytics;