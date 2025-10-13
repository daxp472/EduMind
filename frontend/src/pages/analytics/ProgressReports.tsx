import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, Award, Clock, Target, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProgressReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const reportData = {
    overview: {
      totalStudyHours: 87.5,
      completedSessions: 42,
      averageScore: 85,
      streakDays: 12,
      improvement: 15
    },
    subjects: [
      {
        name: 'Mathematics',
        hours: 28.5,
        sessions: 15,
        avgScore: 88,
        progress: 92,
        trend: 'up'
      },
      {
        name: 'Physics',
        hours: 22.3,
        sessions: 12,
        avgScore: 82,
        progress: 78,
        trend: 'up'
      },
      {
        name: 'Computer Science',
        hours: 18.7,
        sessions: 8,
        avgScore: 90,
        progress: 85,
        trend: 'stable'
      },
      {
        name: 'Languages',
        hours: 12.0,
        sessions: 5,
        avgScore: 79,
        progress: 65,
        trend: 'down'
      },
      {
        name: 'Biology',
        hours: 6.0,
        sessions: 2,
        avgScore: 85,
        progress: 45,
        trend: 'up'
      }
    ],
    weeklyProgress: [
      { week: 'Week 1', hours: 18, score: 82 },
      { week: 'Week 2', hours: 22, score: 85 },
      { week: 'Week 3', hours: 25, score: 87 },
      { week: 'Week 4', hours: 22.5, score: 85 }
    ],
    achievements: [
      {
        title: 'Study Streak Master',
        description: '12 consecutive days of studying',
        date: '2024-03-18',
        type: 'streak'
      },
      {
        title: 'Mathematics Excellence',
        description: 'Achieved 90%+ average in Mathematics',
        date: '2024-03-15',
        type: 'subject'
      },
      {
        title: 'Time Management Pro',
        description: 'Completed 40+ study sessions',
        date: '2024-03-12',
        type: 'productivity'
      }
    ],
    recommendations: [
      {
        type: 'improvement',
        title: 'Focus on Languages',
        description: 'Your Languages performance has declined. Consider dedicating more time to vocabulary practice.',
        priority: 'high'
      },
      {
        type: 'strength',
        title: 'Maintain Mathematics Momentum',
        description: 'Excellent progress in Mathematics! Keep up the current study pattern.',
        priority: 'medium'
      },
      {
        type: 'schedule',
        title: 'Optimize Study Schedule',
        description: 'Your peak performance hours are 9-11 AM. Schedule challenging topics during this time.',
        priority: 'low'
      }
    ]
  };

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    ...reportData.subjects.map(subject => ({ id: subject.name.toLowerCase(), name: subject.name }))
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const downloadReport = () => {
    toast.success('Progress report downloaded successfully!');
  };

  const shareReport = () => {
    toast.success('Report sharing link copied to clipboard!');
  };

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Progress Reports</h1>
            <p className="text-lg text-gray-600">Detailed analysis of your learning journey and achievements</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={shareReport}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Share
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <Download className="h-5 w-5" />
              <span>Download Report</span>
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-blue-600">{reportData.overview.totalStudyHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-green-600">{reportData.overview.completedSessions}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-purple-600">{reportData.overview.averageScore}%</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-orange-600">{reportData.overview.streakDays} days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Improvement</p>
                <p className="text-2xl font-bold text-red-600">+{reportData.overview.improvement}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Subject Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Performance</h2>
            <div className="space-y-4">
              {reportData.subjects.map((subject, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(subject.trend)}
                      <span className="text-sm font-medium text-gray-600">{subject.avgScore}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="block font-medium">{subject.hours}h</span>
                      <span>Study Time</span>
                    </div>
                    <div>
                      <span className="block font-medium">{subject.sessions}</span>
                      <span>Sessions</span>
                    </div>
                    <div>
                      <span className="block font-medium">{subject.progress}%</span>
                      <span>Progress</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Progress</h2>
            <div className="space-y-4">
              {reportData.weeklyProgress.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">{week.week}</h3>
                    <p className="text-sm text-gray-600">{week.hours} hours studied</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{week.score}%</div>
                    <div className="text-sm text-gray-500">Avg Score</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              {reportData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <div className="p-2 bg-yellow-200 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Recommendations</h2>
            <div className="space-y-4">
              {reportData.recommendations.map((rec, index) => (
                <div key={index} className={`p-4 border-l-4 rounded-r-xl ${getPriorityColor(rec.priority)}`}>
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-sm text-gray-700">{rec.description}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Report Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center space-x-4 mb-6">
            <FileText className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Report Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Maintained consistent study schedule with 87.5 hours total</li>
                <li>• Achieved 85% average score across all subjects</li>
                <li>• Built a 12-day study streak showing great discipline</li>
                <li>• Mathematics performance is exceptional at 88% average</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Areas for Growth</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Languages subject needs more attention and practice</li>
                <li>• Consider increasing Biology study time</li>
                <li>• Optimize study schedule for peak performance hours</li>
                <li>• Focus on maintaining current momentum in strong subjects</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProgressReports;