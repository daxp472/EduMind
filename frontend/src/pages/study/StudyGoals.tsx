import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Calendar, Clock, TrendingUp, Award, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Complete Calculus Course',
      description: 'Finish all modules and pass the final exam',
      category: 'Academic',
      priority: 'High',
      deadline: '2024-04-15',
      progress: 75,
      target: 100,
      unit: '%',
      status: 'In Progress',
      milestones: [
        { id: 1, title: 'Complete Module 1-3', completed: true },
        { id: 2, title: 'Mid-term Exam', completed: true },
        { id: 3, title: 'Complete Module 4-6', completed: false },
        { id: 4, title: 'Final Project', completed: false },
        { id: 5, title: 'Final Exam', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Study 40 Hours This Month',
      description: 'Maintain consistent study schedule',
      category: 'Time Management',
      priority: 'Medium',
      deadline: '2024-03-31',
      progress: 28,
      target: 40,
      unit: 'hours',
      status: 'In Progress',
      milestones: [
        { id: 1, title: 'Week 1: 10 hours', completed: true },
        { id: 2, title: 'Week 2: 10 hours', completed: true },
        { id: 3, title: 'Week 3: 10 hours', completed: false },
        { id: 4, title: 'Week 4: 10 hours', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Master Spanish Basics',
      description: 'Learn fundamental Spanish vocabulary and grammar',
      category: 'Language Learning',
      priority: 'Low',
      deadline: '2024-06-01',
      progress: 45,
      target: 100,
      unit: '%',
      status: 'In Progress',
      milestones: [
        { id: 1, title: 'Basic Vocabulary (500 words)', completed: true },
        { id: 2, title: 'Present Tense Verbs', completed: false },
        { id: 3, title: 'Past Tense Verbs', completed: false },
        { id: 4, title: 'Conversation Practice', completed: false }
      ]
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Academic',
    priority: 'Medium',
    deadline: '',
    target: 100,
    unit: '%'
  });

  const categories = ['Academic', 'Time Management', 'Language Learning', 'Skill Development', 'Personal'];
  const priorities = ['Low', 'Medium', 'High'];

  const addGoal = () => {
    if (!newGoal.title || !newGoal.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }

    const goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      status: 'Not Started',
      milestones: []
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: 'Academic',
      priority: 'Medium',
      deadline: '',
      target: 100,
      unit: '%'
    });
    setShowAddGoal(false);
    toast.success('Goal added successfully!');
  };

  const updateProgress = (goalId, newProgress) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            progress: newProgress,
            status: newProgress >= goal.target ? 'Completed' : 'In Progress'
          }
        : goal
    ));
    toast.success('Progress updated!');
  };

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            milestones: goal.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, completed: !milestone.completed }
                : milestone
            )
          }
        : goal
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Not Started': return 'text-gray-600 bg-gray-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Goals</h1>
            <p className="text-lg text-gray-600">Set, track, and achieve your learning objectives</p>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Add Goal</span>
          </button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Goals</p>
                <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {goals.filter(g => g.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {goals.filter(g => g.status === 'In Progress').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(goals.reduce((acc, goal) => acc + (goal.progress / goal.target * 100), 0) / goals.length)}%
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Goal</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your goal title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your goal"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Value
                    </label>
                    <input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="%">Percentage (%)</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                      <option value="pages">Pages</option>
                      <option value="chapters">Chapters</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline *
                    </label>
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={addGoal}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add Goal
                  </button>
                  <button
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Goals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{goal.title}</h3>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(goal.priority)}`}>
                      {goal.priority} Priority
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                    <span className="text-sm text-gray-500">{goal.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round((goal.progress / goal.target) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {goal.progress} / {goal.target} {goal.unit}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {getDaysUntilDeadline(goal.deadline)} days left
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Milestones */}
              {goal.milestones.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Milestones</h4>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleMilestone(goal.id, milestone.id)}
                          className={`p-1 rounded-full ${
                            milestone.completed 
                              ? 'text-green-600 bg-green-100' 
                              : 'text-gray-400 hover:text-green-600'
                          }`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <span className={`flex-1 ${
                          milestone.completed 
                            ? 'text-gray-500 line-through' 
                            : 'text-gray-700'
                        }`}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Update Progress */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Update Progress:</span>
                  <input
                    type="range"
                    min="0"
                    max={goal.target}
                    value={goal.progress}
                    onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 min-w-[60px]">
                    {goal.progress} {goal.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default StudyGoals;