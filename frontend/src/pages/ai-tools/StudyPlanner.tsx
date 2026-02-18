import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Target, Brain, Plus, CircleCheck as CheckCircle, TrendingUp } from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface Goal {
  id: number;
  title: string;
  subject: string;
  deadline: string;
  priority: string;
  progress: number;
  estimatedHours: number;
  completedHours: number;
}

interface ScheduleTask {
  id: number;
  title: string;
  time: string;
  date: string;
  subject: string;
  type: string;
  completed: boolean;
}

const StudyPlanner = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Complete Machine Learning Course',
      subject: 'Computer Science',
      deadline: '2024-04-15',
      priority: 'high',
      progress: 65,
      estimatedHours: 40,
      completedHours: 26
    },
    {
      id: 2,
      title: 'Prepare for Physics Exam',
      subject: 'Physics',
      deadline: '2024-03-20',
      priority: 'high',
      progress: 80,
      estimatedHours: 20,
      completedHours: 16
    },
    {
      id: 3,
      title: 'Read History Textbook',
      subject: 'History',
      deadline: '2024-04-30',
      priority: 'medium',
      progress: 30,
      estimatedHours: 15,
      completedHours: 4.5
    }
  ]);

  const [schedule, setSchedule] = useState<ScheduleTask[]>([
    {
      id: 1,
      title: 'Machine Learning - Neural Networks',
      time: '09:00 - 10:30',
      date: 'Today',
      subject: 'Computer Science',
      type: 'study',
      completed: false
    },
    {
      id: 2,
      title: 'Physics Problem Set 5',
      time: '14:00 - 15:30',
      date: 'Today',
      subject: 'Physics',
      type: 'practice',
      completed: true
    },
    {
      id: 3,
      title: 'History Chapter 12 Review',
      time: '19:00 - 20:00',
      date: 'Today',
      subject: 'History',
      type: 'review',
      completed: false
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    subject: '',
    deadline: '',
    priority: 'medium',
    estimatedHours: 10
  });
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [aiPlan, setAiPlan] = useState<any>(null);
  const [planForm, setPlanForm] = useState({ subjects: '', timeAvailable: 10, goals: '' });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.subject || !newGoal.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      completedHours: 0
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      subject: '',
      deadline: '',
      priority: 'medium',
      estimatedHours: 10
    });
    setShowAddGoal(false);
    toast.success('Study goal added successfully!');
  };

  const generateAISchedule = async () => {
    const subjects = planForm.subjects.trim()
      ? planForm.subjects.split(',').map(s => s.trim()).filter(Boolean)
      : goals.map(g => g.subject);

    if (subjects.length === 0) {
      toast.error('Please add study goals or enter subjects');
      return;
    }

    setIsGeneratingPlan(true);
    try {
      const token = localStorage.getItem('edumind_token') || '';
      const response = await aiAPI.generateStudyPlan(
        { subjects, timeAvailable: planForm.timeAvailable, goals: planForm.goals || undefined },
        token
      );
      setAiPlan(response.data.plan);
      toast.success('AI study plan generated!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to generate study plan';
      toast.error(msg);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const toggleTaskComplete = (taskId: number) => {
    setSchedule(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Computer Science': 'from-blue-500 to-blue-600',
      'Physics': 'from-purple-500 to-purple-600',
      'History': 'from-orange-500 to-orange-600',
      'Mathematics': 'from-green-500 to-green-600'
    };
    return colors[subject] || 'from-gray-500 to-gray-600';
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
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Study Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let AI create personalized study schedules that adapt to your goals and learning patterns
          </p>
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
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {goals.reduce((acc, goal) => acc + goal.completedHours, 0)}h
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Score</p>
                <p className="text-2xl font-bold text-gray-900">A+</p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Study Goals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Study Goals</h2>
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Goal</span>
                </button>
              </div>

              {/* Add Goal Form */}
              {showAddGoal && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Study Goal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Goal title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      value={newGoal.subject}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, subject: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Hours: {newGoal.estimatedHours}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={newGoal.estimatedHours}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleAddGoal}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Goal
                    </button>
                    <button
                      onClick={() => setShowAddGoal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Goals List */}
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-600">{goal.subject}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                        <span className="text-sm text-gray-500">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${getSubjectColor(goal.subject)} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{goal.completedHours}h / {goal.estimatedHours}h completed</span>
                      <span>{goal.estimatedHours - goal.completedHours}h remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >

            {/* AI Schedule Generator */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Schedule Generator</h3>
              <p className="text-gray-600 mb-4">
                Let AI create an optimized study schedule based on your goals and available time.
              </p>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Subjects (comma-separated, or leave blank to use goals)</label>
                  <input
                    type="text"
                    value={planForm.subjects}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, subjects: e.target.value }))}
                    placeholder="e.g. Math, Physics, History"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Hours per week: {planForm.timeAvailable}</label>
                  <input
                    type="range" min="1" max="40" value={planForm.timeAvailable}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, timeAvailable: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Goals (optional)</label>
                  <input
                    type="text"
                    value={planForm.goals}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, goals: e.target.value }))}
                    placeholder="e.g. Pass final exams, master calculus"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={generateAISchedule}
                disabled={isGeneratingPlan}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-70"
              >
                {isGeneratingPlan ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /><span>Generating...</span></>
                ) : (
                  <><Brain className="h-5 w-5" /><span>Generate AI Schedule</span></>
                )}
              </button>

              {/* AI Plan Results */}
              {aiPlan && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-900 mb-2">Your AI Study Plan</h4>
                  {typeof aiPlan === 'string' ? (
                    <p className="text-sm text-purple-800 whitespace-pre-wrap">{aiPlan}</p>
                  ) : aiPlan.weeks ? (
                    <div className="space-y-3">
                      {aiPlan.weeks.map((week: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-3">
                          <p className="font-medium text-gray-900 text-sm">Week {week.weekNumber}: {week.focus}</p>
                          {week.dailySchedule?.map((day: any, dIdx: number) => (
                            <p key={dIdx} className="text-xs text-gray-600 mt-1">
                              <strong>{day.day}:</strong> {day.subject} — {day.duration} ({day.topics})
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <pre className="text-xs text-purple-800 whitespace-pre-wrap">{JSON.stringify(aiPlan, null, 2)}</pre>
                  )}
                </div>
              )}
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {schedule.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border-2 transition-colors ${task.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleTaskComplete(task.id)}
                          className={`mt-1 p-1 rounded-full ${task.completed
                            ? 'text-green-600'
                            : 'text-gray-400 hover:text-green-600'
                            }`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <div>
                          <h4 className={`font-medium ${task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                            }`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-600">{task.subject}</p>
                          <p className="text-sm text-gray-500">{task.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.type === 'study' ? 'bg-blue-100 text-blue-800' :
                        task.type === 'practice' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                        {task.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6" />
                <h3 className="text-lg font-semibold">AI Study Tip</h3>
              </div>
              <p className="text-blue-100">
                Based on your learning patterns, you're most productive between 9-11 AM.
                Schedule your most challenging topics during this time for better retention.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default StudyPlanner;