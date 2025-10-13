import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Target, TrendingUp, Clock, Award, FileText, MessageSquare, ChartBar as BarChart3, Users, Lightbulb, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      label: 'Study Hours',
      value: '24.5',
      change: '+12%',
      icon: Clock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Quizzes Completed',
      value: '18',
      change: '+25%',
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Notes Summarized',
      value: '142',
      change: '+8%',
      icon: FileText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Learning Streak',
      value: '7 days',
      change: 'Current',
      icon: Award,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const aiTools = [
    {
      title: 'Smart Summarizer',
      description: 'Transform lengthy notes into concise summaries',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      status: 'active',
      link: '/ai-tools/summarizer'
    },
    {
      title: 'Quiz Generator',
      description: 'Create adaptive quizzes from your content',
      icon: Target,
      color: 'from-green-500 to-green-600',
      status: 'active',
      link: '/ai-tools/quiz-generator'
    },
    {
      title: 'AI Tutor',
      description: 'Get personalized learning assistance 24/7',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      status: 'active',
      link: '/ai-tools/tutor'
    },
    {
      title: 'Progress Analytics',
      description: 'Track your learning journey with insights',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      status: 'active',
      link: '/analytics/learning'
    },
    {
      title: 'Study Planner',
      description: 'AI-optimized study schedules for success',
      icon: Calendar,
      color: 'from-pink-500 to-pink-600',
      status: 'beta',
      link: '/ai-tools/study-planner'
    },
    {
      title: 'Knowledge Graph',
      description: 'Visualize connections between concepts',
      icon: Brain,
      color: 'from-teal-500 to-teal-600',
      status: 'coming-soon',
      link: '/ai-tools/concept-mapper'
    }
  ];

  const recentActivity = [
    {
      type: 'summary',
      title: 'Physics Chapter 12 - Electromagnetic Waves',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'quiz',
      title: 'Mathematics Quiz - Calculus Basics',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      type: 'note',
      title: 'Chemistry Notes - Organic Compounds',
      time: '1 day ago',
      status: 'in-progress'
    },
    {
      type: 'tutor',
      title: 'AI Tutor Session - Biology Concepts',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Review History Chapter 8',
      deadline: 'Today, 3:00 PM',
      priority: 'high'
    },
    {
      title: 'Complete Math Problem Set',
      deadline: 'Tomorrow, 9:00 AM',
      priority: 'medium'
    },
    {
      title: 'Prepare Biology Presentation',
      deadline: 'March 15, 2024',
      priority: 'low'
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your learning journey with AI-powered tools?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* AI Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Learning Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => (
              <Link
                to={tool.link}
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    tool.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : tool.status === 'beta'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tool.status === 'active' ? 'Active' : tool.status === 'beta' ? 'Beta' : 'Coming Soon'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {activity.type === 'summary' && <FileText className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'quiz' && <Target className="h-5 w-5 text-green-600" />}
                    {activity.type === 'note' && <BookOpen className="h-5 w-5 text-purple-600" />}
                    {activity.type === 'tutor' && <MessageSquare className="h-5 w-5 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status === 'completed' ? 'Done' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h3>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-500' 
                      : task.priority === 'medium' 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500">{task.deadline}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'medium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
              <div className="flex items-center space-x-3">
                <Lightbulb className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">AI Tip of the Day</h4>
                  <p className="text-sm text-blue-100">
                    Try the Pomodoro Technique with our AI timer for better focus!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;