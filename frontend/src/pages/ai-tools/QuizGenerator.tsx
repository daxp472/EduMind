import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Brain, CircleCheck as CheckCircle, Circle as XCircle,
  RotateCcw, Trophy, Sparkles, ChevronRight,
  Clock, ArrowLeft, RefreshCw, Layout
} from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const QuizGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(location.state?.initialText || '');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('edumind_token');
      if (!token) return;
      setIsLoadingHistory(true);
      const res = await aiAPI.getHistory(token, 'quiz-generator');
      if (res.success) {
        setHistory(res.data);
      }
    } catch (err) {
      console.error('History fetch failed', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const generateQuiz = async (retryContent?: string) => {
    const contentToUse = retryContent || topic;
    if (!contentToUse.trim()) {
      toast.error('Please enter a topic for the quiz');
      return;
    }

    setIsGenerating(true);
    setQuiz(null);
    setShowResults(false);

    try {
      const token = localStorage.getItem('edumind_token') || '';
      const response = await aiAPI.generateQuiz(
        { text: contentToUse, numQuestions: questionCount, difficulty },
        token
      );

      // Normalize the questions from the AI response
      const rawQuestions = response.data.questions || [];
      const normalized: Question[] = rawQuestions.map((q: any, idx: number) => ({
        id: idx + 1,
        question: q.question || q.q || '',
        options: q.options || q.choices || [],
        correct: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.explanation || ''
      }));

      if (normalized.length === 0) {
        throw new Error('AI returned an empty question set. Please try again.');
      }

      setQuiz({ title: `${contentToUse.slice(0, 30)}${contentToUse.length > 30 ? '...' : ''} Quiz`, questions: normalized });
      setCurrentQuestion(0);
      setSelectedAnswers({});
      toast.success('Quiz nodes synthesized successfully!');
      fetchHistory();
    } catch (error: any) {
      toast.error(error.message || 'Synthesis failure in neural forge');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const finishQuiz = () => {
    if (!quiz) return;
    setShowResults(true);
    const score = calculateScore();
    toast.success(`Assessment complete: ${score}/${quiz.questions.length}`);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    toast.success('Resetting assessment nodes...');
  };

  const handleRegenerate = () => {
    generateQuiz();
  };

  const selectFromHistory = (item: any) => {
    try {
      const questions = JSON.parse(item.output);
      const normalized = questions.map((q: any, idx: number) => ({
        id: idx + 1,
        question: q.question || q.q || '',
        options: q.options || q.choices || [],
        correct: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.explanation || ''
      }));
      setQuiz({ title: 'Retrieved Quiz', questions: normalized });
      setTopic(item.input);
      setShowResults(false);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowHistory(false);
      toast.success('Retrieved from vault');
    } catch (e) {
      toast.error('Failed to parse history item');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-inter">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 relative">

        {/* Action Row */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Target className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="text-sm font-bold tracking-widest text-indigo-500 uppercase italic">Assessment Protocol</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Neural <span className="text-indigo-500">Forge</span>
            </h1>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all font-bold text-sm uppercase tracking-widest"
          >
            <Clock className="h-4 w-4" />
            <span>Vault</span>
          </motion.button>
        </div>

        {!quiz ? (
          /* Configuration Protocol */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-3xl rounded-[32px] p-10 border border-white/5 relative overflow-hidden group shadow-2xl shadow-indigo-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-2xl font-bold mb-8 flex items-center italic relative z-10">
                <Brain className="h-6 w-6 mr-3 text-indigo-500" />
                Forge Parameters
              </h2>

              <div className="space-y-8 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1">Ingestion Topic / Content</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={4}
                    placeholder="e.g., Quantum Mechanics, Neural Architecture, or paste document text..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-zinc-700 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Difficulty Grade</label>
                    <div className="flex p-1 bg-black/40 border border-white/5 rounded-2xl">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${difficulty === level
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Node Density</label>
                    <div className="flex items-center space-x-4 h-[52px]">
                      <input
                        type="range"
                        min="5"
                        max="20"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                        className="flex-grow h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                      <span className="text-lg font-black text-indigo-500 min-w-[3ch]">{questionCount}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => generateQuiz()}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full relative group/btn overflow-hidden rounded-2xl h-16"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                  <div className="absolute inset-[2px] bg-zinc-900 group-hover:bg-transparent transition-colors rounded-[14px] flex items-center justify-center font-black uppercase tracking-[0.2em] text-sm">
                    {isGenerating ? (
                      <div className="flex items-center space-x-3">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <RefreshCw className="h-5 w-5 text-indigo-400" />
                        </motion.div>
                        <span>Synthesizing Protocols...</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-3 text-indigo-500" />
                        Execute Extraction
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ) : !showResults ? (
          /* Assessment Execution */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Telemetry */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Assessment In Progress</span>
                  <span className="text-2xl font-black text-white">
                    NODE <span className="text-indigo-500">{(currentQuestion + 1).toString().padStart(2, '0')}</span>
                    <span className="text-zinc-700 mx-2">/</span>
                    <span className="text-zinc-500">{quiz.questions.length.toString().padStart(2, '0')}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Synaptic Integrity</span>
                  <span className="text-lg font-black text-indigo-500">
                    {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                />
              </div>
            </div>

            {/* Assessment Node Card */}
            <div className="bg-zinc-900/50 backdrop-blur-3xl rounded-[32px] p-10 border border-white/5 mb-8 relative overflow-hidden shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight italic">
                {quiz.questions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(quiz.questions[currentQuestion].id, index)}
                    className={`group w-full text-left p-6 rounded-2xl border transition-all relative overflow-hidden ${selectedAnswers[quiz.questions[currentQuestion].id] === index
                      ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                      : 'border-white/5 bg-black/20 text-zinc-400 hover:border-white/10 hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${selectedAnswers[quiz.questions[currentQuestion].id] === index
                        ? 'border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-500/20'
                        : 'border-zinc-800'
                        }`}>
                        {selectedAnswers[quiz.questions[currentQuestion].id] === index ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : (
                          <span className="text-[10px] font-black text-zinc-700">{String.fromCharCode(65 + index)}</span>
                        )}
                      </div>
                      <span className="font-bold text-lg">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all disabled:opacity-30 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Node
              </button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  onClick={finishQuiz}
                  className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
                >
                  Terminate & Analyze
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                  className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-indigo-500 hover:text-white transition-all group flex items-center"
                >
                  Next Node
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Synthesis Report */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-3xl rounded-[40px] p-12 text-center mb-12 border border-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />

              <div className="mb-10 relative">
                <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-40" />
                  <Trophy className="h-12 w-12 text-indigo-500 relative z-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter uppercase italic">Synthesis <span className="text-indigo-500">Complete</span></h2>
                <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Cognitive Performance Metrics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5">
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                    {calculateScore()}<span className="text-zinc-700 text-2xl mx-1">/</span><span className="text-zinc-500 text-3xl">{quiz.questions.length}</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Correct Nodes</div>
                </div>
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5">
                  <div className="text-5xl font-black text-indigo-500 mb-2 tracking-tighter">
                    {Math.round((calculateScore() / quiz.questions.length) * 100)}<span className="text-2xl ml-1">%</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Success Gradient</div>
                </div>
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5">
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter uppercase italic">
                    {calculateScore() >= quiz.questions.length * 0.9 ? 'Alpha' :
                      calculateScore() >= quiz.questions.length * 0.7 ? 'Beta' : 'Gamma'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Cognitive Tier</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleRetake}
                  className="flex items-center space-x-3 px-8 py-4 bg-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all border border-white/5"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Give This Quiz Again</span>
                </button>
                <button
                  onClick={handleRegenerate}
                  className="flex items-center space-x-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>New Quiz (Same Topic)</span>
                </button>
                <button
                  onClick={() => setQuiz(null)}
                  className="flex items-center space-x-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all"
                >
                  <Layout className="h-4 w-4" />
                  <span>Change Parameters</span>
                </button>
              </div>
            </div>

            {/* Answer Review */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-4 ml-2">Assessment Review Protocol</h3>
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="bg-zinc-900/50 backdrop-blur-3xl rounded-[32px] border border-white/5 p-8 relative overflow-hidden group">
                  <div className="flex items-start space-x-6">
                    <div className={`mt-1 p-3 rounded-2xl flex-shrink-0 ${selectedAnswers[question.id] === question.correct
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                      }`}>
                      {selectedAnswers[question.id] === question.correct ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] block mb-2">Node {(index + 1).toString().padStart(2, '0')}</span>
                      <h3 className="text-xl font-bold text-white mb-8 leading-tight italic">
                        {question.question}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-xl border transition-all text-sm font-bold ${optionIndex === question.correct
                              ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-lg shadow-green-500/5'
                              : selectedAnswers[question.id] === optionIndex
                                ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-lg shadow-red-500/5'
                                : 'bg-black/40 border-white/5 text-zinc-500'
                              }`}
                          >
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Brain className="h-4 w-4 text-indigo-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Synaptic Feedback</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                          {question.explanation || "No advanced clarification provided for this node."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* History Vault Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowHistory(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-white/10 z-[101] p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <Clock className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">Memory Vault</h2>
                  </div>
                  <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <ChevronRight className="h-6 w-6 text-zinc-400" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto space-y-4 custom-scrollbar pr-2">
                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-600">Syncing Vault...</span>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="text-center py-20">
                      <Trophy className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
                      <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No records found</p>
                    </div>
                  ) : (
                    history.map((item, idx) => (
                      <motion.div
                        key={item._id || idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => selectFromHistory(item)}
                        className="p-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl cursor-pointer transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                          <Sparkles className="h-3 w-3 text-indigo-500/50" />
                        </div>
                        <p className="text-sm font-bold text-zinc-200 line-clamp-2 leading-relaxed mb-3 italic">
                          {item.input.slice(0, 100)}...
                        </p>
                        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-zinc-500">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          <span>{JSON.parse(item.output || '[]').length} Assessment Nodes</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default QuizGenerator;
