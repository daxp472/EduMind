import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Target, Brain, Plus, CircleCheck as CheckCircle, TrendingUp, Sparkles, ChevronRight, X } from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Neural Network Architecture',
      subject: 'Computer Science',
      deadline: '2024-04-15',
      priority: 'high',
      progress: 65,
      estimatedHours: 40,
      completedHours: 26
    },
    {
      id: 2,
      title: 'Quantum Field Theory',
      subject: 'Physics',
      deadline: '2024-03-20',
      priority: 'high',
      progress: 80,
      estimatedHours: 20,
      completedHours: 16
    }
  ]);

  const [schedule, setSchedule] = useState<ScheduleTask[]>([]);
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
  const [performanceData, setPerformanceData] = useState<any>(location.state?.quizPerformance || null);
  const [gapsAnalysis, setGapsAnalysis] = useState<string | null>(null);
  const [isAnalyzingGaps, setIsAnalyzingGaps] = useState(false);

  useEffect(() => {
    if (performanceData && !gapsAnalysis) {
      handleGapsAnalysis();
    }
  }, [performanceData]);

  const handleGapsAnalysis = async () => {
    if (!performanceData) return;
    setIsAnalyzingGaps(true);
    try {
      const token = localStorage.getItem('edumind_token') || '';
      const prompt = `Analyze these quiz results for the topic "${performanceData.topic}". Score: ${performanceData.score}/${performanceData.total}. Wrong questions: ${JSON.stringify(performanceData.wrongQuestions)}. Please identify specific knowledge gaps and suggest focus areas for my study plan.`;
      const response = await aiAPI.askTutor({ message: prompt }, token);
      setGapsAnalysis(response.data.answer);
    } catch (error) {
      toast.error('Failed to analyze gaps');
    } finally {
      setIsAnalyzingGaps(false);
    }
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.subject || !newGoal.deadline) {
      toast.error('Please fill in all protocol fields');
      return;
    }
    const goal: Goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      completedHours: 0
    };
    setGoals([...goals, goal]);
    setShowAddGoal(false);
    setNewGoal({ title: '', subject: '', deadline: '', priority: 'medium', estimatedHours: 10 });
    toast.success('Protocol synced to ledger');
  };

  const generateAISchedule = async () => {
    setIsGeneratingPlan(true);
    try {
      const token = localStorage.getItem('edumind_token') || '';
      const subjectsArray = planForm.subjects.trim()
        ? planForm.subjects.split(',').map(s => s.trim()).filter(Boolean)
        : goals.map(g => g.subject);

      const response = await aiAPI.generateStudyPlan(
        {
          subjects: subjectsArray,
          timeAvailable: planForm.timeAvailable,
          goals: planForm.goals || goals.map(g => g.title).join(', ')
        },
        token
      );
      setAiPlan(response.data.plan);
      toast.success('Strategy synthesized successfully');
    } catch (error) {
      toast.error('Synthesis failure');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const toggleTaskComplete = (taskId: number) => {
    setSchedule(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">

        {/* Neural Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Calendar className="h-6 w-6 text-indigo-500" />
            </div>
            <span className="text-sm font-bold tracking-widest text-indigo-500 uppercase">Operational Planning</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Strategy <span className="text-indigo-500">Engine</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let AI create personalized study schedules that adapt to your goals and learning patterns
          </p>
        </motion.div>

        {/* Gaps Analysis / Performance Alert */}
        <AnimatePresence>
          {performanceData && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8 relative group">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setPerformanceData(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-tighter">Gaps Analysis Protocols</h2>
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">Post-Assessment intelligence</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-zinc-400 capitalize">{performanceData.topic} Evaluation</span>
                        <span className="text-lg font-black text-indigo-500">{performanceData.score}/{performanceData.total}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(performanceData.score / performanceData.total) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-indigo-500 h-full"
                        />
                      </div>
                    </div>
                    <p className="text-zinc-500 text-sm font-medium">
                      Neural patterns indicate specific friction points in your comprehension of this documentation.
                      Proceed with recommended remediation protocols.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 relative border border-white/5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-purple-500" />
                      AI Insights
                    </h3>
                    {isAnalyzingGaps ? (
                      <div className="flex items-center space-x-3 text-zinc-500 py-4">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent" />
                        <span className="text-sm font-bold uppercase tracking-widest animate-pulse">Processing knowledge gaps...</span>
                      </div>
                    ) : (
                      <p className="text-zinc-300 text-sm leading-relaxed font-medium italic">
                        "{gapsAnalysis || 'Neural analysis pending initialization...'}"
                      </p>
                    )}
                    {gapsAnalysis && (
                      <button
                        onClick={() => setPlanForm(prev => ({ ...prev, goals: `Focus on: ${gapsAnalysis.slice(0, 100)}...` }))}
                        className="mt-6 text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-white transition-colors flex items-center group/btn"
                      >
                        Inject into Study Plan
                        <ChevronRight className="h-4 w-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Operational Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/5 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Active Goals</p>
              <p className="text-2xl font-black text-white">{goals.length}</p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-colors">
              <Target className="h-6 w-6 text-indigo-500" />
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/5 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Study Hours</p>
              <p className="text-2xl font-black text-white">
                {goals.reduce((acc, goal) => acc + goal.completedHours, 0)}h
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-2xl group-hover:bg-green-500/20 transition-colors">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/5 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Avg Progress</p>
              <p className="text-2xl font-black text-white">
                {goals.length > 0 ? Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length) : 0}%
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-2xl group-hover:bg-purple-500/20 transition-colors">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/5 flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Intelligence Score</p>
              <p className="text-2xl font-black text-indigo-500">A+</p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-colors">
              <Brain className="h-6 w-6 text-indigo-500" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Study Goals Protocol */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[40px] p-10 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Objective <span className="text-indigo-500">Log</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1">Active Memory Consolidation</p>
                </div>
                <button
                  onClick={() => setShowAddGoal(true)}
                  className="p-3 bg-indigo-500 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Add Goal Interface */}
              <AnimatePresence>
                {showAddGoal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-10 overflow-hidden"
                  >
                    <div className="p-8 bg-black/40 rounded-3xl border border-white/10 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Protocol Title</label>
                          <input
                            type="text"
                            placeholder="e.g., Master Quantum Mechanics"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Knowledge Domain</label>
                          <input
                            type="text"
                            placeholder="e.g., Science, Technology"
                            value={newGoal.subject}
                            onChange={(e) => setNewGoal(prev => ({ ...prev, subject: e.target.value }))}
                            className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Deadline Timestamp</label>
                          <input
                            type="date"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                            className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Priority Gradient</label>
                          <select
                            value={newGoal.priority}
                            onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                            className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-bold uppercase tracking-widest"
                          >
                            <option value="low">Low Intensity</option>
                            <option value="medium">Standard Frequency</option>
                            <option value="high">Critical Priority</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Estimated Duration</label>
                          <span className="text-xs font-black text-indigo-500">{newGoal.estimatedHours} Hours</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={newGoal.estimatedHours}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
                          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={handleAddGoal}
                          className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all"
                        >
                          Push Protocol
                        </button>
                        <button
                          onClick={() => setShowAddGoal(false)}
                          className="flex-1 py-4 bg-zinc-900 border border-white/5 text-zinc-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-white transition-all"
                        >
                          Abort
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Objectives Ledger */}
              <div className="space-y-6 relative z-10">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-black/20 rounded-[32px] p-8 border border-white/5 group/goal hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`w-2 h-2 rounded-full ${goal.priority === 'high' ? 'bg-red-500' : goal.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{goal.subject} Protocol</span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover/goal:text-indigo-500 transition-colors uppercase tracking-tight italic">{goal.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Target Date</p>
                        <p className="text-xs font-bold text-white">{new Date(goal.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sync Progress</span>
                        <span className="text-xs font-black text-indigo-500">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center text-zinc-500">
                        <Clock className="h-3 w-3 mr-2" />
                        {goal.completedHours}h Processing Complete
                      </div>
                      <div className="text-indigo-500">
                        {goal.estimatedHours - goal.completedHours}h Residual
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Intelligence Synthesis / Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* AI Scheduler Module */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[40px] p-8 border border-white/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter italic">Schedule <span className="text-purple-500">Synth</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Neural Resource Optimization</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 ml-1">Focus Domains</label>
                  <input
                    type="text"
                    value={planForm.subjects}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, subjects: e.target.value }))}
                    placeholder="e.g. Science, Logic, Systems"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50 text-xs font-medium placeholder:text-zinc-800"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Weekly Buffer</label>
                    <span className="text-xs font-black text-purple-500">{planForm.timeAvailable}h</span>
                  </div>
                  <input
                    type="range" min="1" max="40" value={planForm.timeAvailable}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, timeAvailable: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 ml-1">Neural Objectives</label>
                  <input
                    type="text"
                    value={planForm.goals}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, goals: e.target.value }))}
                    placeholder="e.g. Final Exams, Certification"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50 text-xs font-medium placeholder:text-zinc-800"
                  />
                </div>

                <button
                  onClick={generateAISchedule}
                  disabled={isGeneratingPlan}
                  className="w-full flex items-center justify-center space-x-3 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50"
                >
                  {isGeneratingPlan ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Brain className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Execute Synthesis</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Plan Output */}
              <AnimatePresence>
                {aiPlan && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 overflow-hidden"
                  >
                    <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-4 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Optimization Protocol Active
                      </h4>
                      {typeof aiPlan === 'string' ? (
                        <p className="text-xs text-zinc-300 leading-relaxed font-medium italic">{aiPlan}</p>
                      ) : (
                        <div className="space-y-4">
                          {aiPlan.weeks?.slice(0, 2).map((week: any, idx: number) => (
                            <div key={idx} className="bg-black/40 p-4 rounded-2xl border border-white/5">
                              <p className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Cycle {week.weekNumber}: {week.focus}</p>
                              {week.dailySchedule?.slice(0, 3).map((day: any, dIdx: number) => (
                                <p key={dIdx} className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter mt-1 flex justify-between">
                                  <span>{day.day}: {day.subject}</span>
                                  <span className="text-purple-500">{day.duration}</span>
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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