import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Clock, Target, Lightbulb, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const PerformanceInsights = () => {
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const insights = {
    overall: {
      score: 87,
      trend: 'up',
      change: '+12%',
      description: 'Your overall performance has improved significantly this month'
    },
    strengths: [
      {
        title: 'Peak Performance Hours',
        insight: 'You perform 23% better between 9-11 AM',
        recommendation: 'Schedule your most challenging subjects during morning hours',
        impact: 'high',
        icon: Clock
      },
      {
        title: 'Learning Style Optimization',
        insight: 'Visual learning methods show 31% better retention',
        recommendation: 'Incorporate more diagrams, charts, and visual aids in your study materials',
        impact: 'high',
        icon: Brain
      },
      {
        title: 'Subject Mastery Pattern',
        insight: 'Mathematics concepts are learned 40% faster than average',
        recommendation: 'Use your math learning approach for other analytical subjects',
        impact: 'medium',
        icon: Target
      }
    ],
    weaknesses: [
      {
        title: 'Attention Span Decline',
        insight: 'Focus drops by 35% after 45-minute study sessions',
        recommendation: 'Implement 10-minute breaks every 45 minutes using Pomodoro technique',
        impact: 'high',
        icon: AlertCircle
      },
      {
        title: 'Weekend Performance Gap',
        insight: 'Weekend study efficiency is 28% lower than weekdays',
        recommendation: 'Create structured weekend study schedules with specific goals',
        impact: 'medium',
        icon: TrendingUp
      },
      {
        title: 'Review Frequency',
        insight: 'Topics reviewed less than 3 times show 45% lower retention',
        recommendation: 'Implement spaced repetition system for better long-term retention',
        impact: 'high',
        icon: Brain
      }
    ],
    predictions: [
      {
        title: 'Exam Performance Forecast',
        prediction: 'Based on current trends, you\'re likely to score 88-92% on upcoming exams',
        confidence: 94,
        timeframe: 'Next 2 weeks'
      },
      {
        title: 'Goal Achievement Probability',
        prediction: 'You have an 87% chance of completing your monthly study goals',
        confidence: 87,
        timeframe: 'End of month'
      },
      {
        title: 'Skill Development Timeline',
        prediction: 'At current pace, you\'ll master advanced calculus concepts in 3-4 weeks',
        confidence: 82,
        timeframe: '3-4 weeks'
      }
    ],
    recommendations: [
      {
        category: 'Study Schedule',
        title: 'Optimize Your Daily Routine',
        description: 'Shift challenging subjects to 9-11 AM when your cognitive performance peaks',
        priority: 'high',
        estimatedImpact: '+15% performance',
        timeToImplement: '1 week'
      },
      {
        category: 'Learning Methods',
        title: 'Enhance Visual Learning',
        description: 'Create mind maps and flowcharts for complex topics to leverage your visual learning strength',
        priority: 'high',
        estimatedImpact: '+20% retention',
        timeToImplement: '2 weeks'
      },
      {
        category: 'Review Strategy',
        title: 'Implement Spaced Repetition',
        description: 'Review topics at increasing intervals: 1 day, 3 days, 1 week, 2 weeks',
        priority: 'medium',
        estimatedImpact: '+25% long-term retention',
        timeToImplement: '3 weeks'
      },
      {
        category: 'Break Management',
        title: 'Structured Break System',
        description: 'Take 10-minute breaks every 45 minutes to maintain optimal focus levels',
        priority: 'high',
        estimatedImpact: '+18% focus duration',
        timeToImplement: 'Immediate'
      }
    ]
  };

  const metrics = [
    { id: 'overall', name: 'Overall Performance', icon: BarChart3 },
    { id: 'learning', name: 'Learning Efficiency', icon: Brain },
    { id: 'time', name: 'Time Management', icon: Clock },
    { id: 'retention', name: 'Knowledge Retention', icon: Target }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Performance Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered analysis of your learning patterns with personalized recommendations for improvement
          </p>
        </motion.div>

        {/* Overall Performance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Performance Score</h2>
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
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
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - insights.overall.score / 100)}`}
                className="text-purple-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">{insights.overall.score}</div>
                <div className="text-gray-600">Score</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">{insights.overall.change} improvement</span>
          </div>
          <p className="text-gray-600 mt-2">{insights.overall.description}</p>
        </motion.div>

        {/* Strengths and Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Strengths</h2>
            </div>
            <div className="space-y-4">
              {insights.strengths.map((strength, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <strength.icon className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{strength.title}</h3>
                      <p className="text-sm text-gray-700 mb-2">{strength.insight}</p>
                      <p className="text-sm text-green-700 bg-green-100 p-2 rounded">
                        <strong>Recommendation:</strong> {strength.recommendation}
                      </p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(strength.impact)}`}>
                        {strength.impact} impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Areas for Improvement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Areas for Improvement</h2>
            </div>
            <div className="space-y-4">
              {insights.weaknesses.map((weakness, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <weakness.icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{weakness.title}</h3>
                      <p className="text-sm text-gray-700 mb-2">{weakness.insight}</p>
                      <p className="text-sm text-blue-700 bg-blue-100 p-2 rounded">
                        <strong>Recommendation:</strong> {weakness.recommendation}
                      </p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(weakness.impact)}`}>
                        {weakness.impact} impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Brain className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">AI Predictions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.predictions.map((prediction, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">{prediction.title}</h3>
                <p className="text-gray-700 mb-4">{prediction.prediction}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Confidence: <span className="font-semibold text-purple-600">{prediction.confidence}%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {prediction.timeframe}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Lightbulb className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
          </div>
          <div className="space-y-6">
            {insights.recommendations.map((rec, index) => (
              <div key={index} className={`p-6 border-l-4 rounded-r-xl ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">{rec.category}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{rec.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">
                      Expected Impact: <span className="font-semibold text-green-600">{rec.estimatedImpact}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">
                      Implementation: <span className="font-semibold text-blue-600">{rec.timeToImplement}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toast.success('Recommendation applied to your study plan!')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Recommendation
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PerformanceInsights;