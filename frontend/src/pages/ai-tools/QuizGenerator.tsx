import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, CircleCheck as CheckCircle, Circle as XCircle, RotateCcw, Play, Trophy, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
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
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for the quiz');
      return;
    }

    setIsGenerating(true);

    try {
      const token = localStorage.getItem('edumind_token') || '';
      const response = await aiAPI.generateQuiz(
        { text: topic, numQuestions: questionCount, difficulty },
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

      setQuiz({ title: `${topic} Quiz`, questions: normalized });
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
      toast.success('Quiz generated successfully!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to generate quiz';
      toast.error(msg);
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
    toast.success(`Quiz completed! You scored ${score}/${quiz.questions.length}`);
  };

  const resetQuiz = () => {
    setQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTopic('');
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
              <Target className="h-6 w-6 text-indigo-500" />
            </div>
            <span className="text-sm font-bold tracking-widest text-indigo-500 uppercase">Assessment Module</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Neural <span className="text-indigo-500">Forge</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl">
            Synthesize high-fidelity evaluation protocols. Adapt difficulty gradients to optimize cognitive retention.
          </p>
        </motion.div>

        {!quiz ? (
          /* Configuration Protocol */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <Brain className="h-6 w-6 mr-3 text-indigo-500" />
                Forge Parameters
              </h2>

              <div className="space-y-8 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1">Knowledge Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Quantum Mechanics, Neural Architecture..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Fidelity Grade</label>
                    <div className="flex p-1 bg-black/40 border border-white/5 rounded-2xl">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${difficulty === level
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
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Protocol Depth</label>
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

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Question Structure</label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-bold uppercase tracking-widest text-xs"
                  >
                    <option value="multiple-choice">Multiple Choice Protocol</option>
                    <option value="true-false">Binary Boolean Check</option>
                    <option value="fill-blank">Semantic Gap Fill</option>
                    <option value="short-answer">Open Logic response</option>
                  </select>
                </div>

                <button
                  onClick={generateQuiz}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full relative group/btn overflow-hidden rounded-2xl p-px"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                  <div className="relative bg-zinc-900 group-hover:bg-transparent transition-colors rounded-[15px] py-5 px-6 flex items-center justify-center font-bold uppercase tracking-[0.2em] text-sm">
                    {isGenerating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Brain className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-3 text-indigo-500" />
                        Initialize Synthesis
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
            transition={{ duration: 0.6 }}
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
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                />
              </div>
            </div>

            {/* Assessment Node Card */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/5 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Brain className="h-12 w-12 text-zinc-800 opacity-20" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
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
                className="px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-30 flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
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
                  Successive Node
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
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[40px] p-12 text-center mb-8 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="mb-10 relative">
                <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-40" />
                  <Trophy className="h-12 w-12 text-indigo-500 relative z-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter uppercase italic">Synthesis <span className="text-indigo-500">Complete</span></h2>
                <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Cognitive Performance Metrics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5 group/metric hover:border-indigo-500/30 transition-all">
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-indigo-500 transition-colors">
                    {calculateScore()}<span className="text-zinc-700 text-2xl mx-1">/</span><span className="text-zinc-500 text-3xl">{quiz.questions.length}</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Correct Nodes</div>
                </div>
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5 group/metric hover:border-purple-500/30 transition-all">
                  <div className="text-5xl font-black text-indigo-500 mb-2 tracking-tighter">
                    {Math.round((calculateScore() / quiz.questions.length) * 100)}<span className="text-2xl ml-1">%</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Synaptic Match</div>
                </div>
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5 group/metric hover:border-indigo-500/30 transition-all">
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                    {calculateScore() >= quiz.questions.length * 0.9 ? 'Ω' :
                      calculateScore() >= quiz.questions.length * 0.8 ? 'α' :
                        calculateScore() >= quiz.questions.length * 0.6 ? 'β' : 'δ'}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Cognitive Tier</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex items-center space-x-2 px-6 py-3 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-700 transition-all border border-white/5"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>New Quiz</span>
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-500/10 text-indigo-500 rounded-xl font-medium hover:bg-indigo-500/20 transition-all border border-indigo-500/20"
                >
                  <Play className="h-5 w-5" />
                  <span>Review Answers</span>
                </button>
                <button
                  onClick={() => navigate('/ai-tools/study-planner', {
                    state: {
                      quizPerformance: {
                        topic,
                        score: calculateScore(),
                        total: quiz.questions.length,
                        wrongQuestions: quiz.questions.filter(q => selectedAnswers[q.id] !== q.correct)
                      }
                    }
                  })}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Analyze Weak Points</span>
                </button>
              </div>
            </div>

            {/* Answer Review */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 ml-2">Neural Review Protocol</h3>
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start space-x-6">
                    <div className={`mt-1 p-2 rounded-xl flex-shrink-0 ${selectedAnswers[question.id] === question.correct
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
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Question {index + 1}</span>
                        <div className="h-px flex-grow bg-white/5" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-6 leading-tight">
                        {question.question}
                      </h3>
                      <div className="grid grid-cols-1 gap-3 mb-6">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-xl border transition-all text-sm font-medium ${optionIndex === question.correct
                              ? 'bg-green-500/10 border-green-500/30 text-green-400'
                              : selectedAnswers[question.id] === optionIndex
                                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                : 'bg-black/40 border-white/5 text-zinc-500'
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {optionIndex === question.correct && (
                                <span className="text-[10px] font-black uppercase tracking-widest ml-2 bg-green-500/20 px-2 py-0.5 rounded text-green-500">Correct</span>
                              )}
                              {selectedAnswers[question.id] === optionIndex && optionIndex !== question.correct && (
                                <span className="text-[10px] font-black uppercase tracking-widest ml-2 bg-red-500/20 px-2 py-0.5 rounded text-red-500">Your Selection</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="h-4 w-4 text-indigo-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">AI Clarification</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed italic">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default QuizGenerator;