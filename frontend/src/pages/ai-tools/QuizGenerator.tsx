import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, CircleCheck as CheckCircle, Circle as XCircle, RotateCcw, Play, Settings, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const mockQuiz = {
    title: "Artificial Intelligence Fundamentals",
    questions: [
      {
        id: 1,
        question: "What is the primary goal of artificial intelligence?",
        options: [
          "To replace human intelligence",
          "To simulate human intelligence in machines",
          "To create robots",
          "To process data faster"
        ],
        correct: 1,
        explanation: "AI aims to create systems that can perform tasks that typically require human intelligence."
      },
      {
        id: 2,
        question: "Which of the following is a type of machine learning?",
        options: [
          "Supervised learning",
          "Unsupervised learning", 
          "Reinforcement learning",
          "All of the above"
        ],
        correct: 3,
        explanation: "Machine learning includes supervised, unsupervised, and reinforcement learning approaches."
      },
      {
        id: 3,
        question: "What does 'neural network' refer to in AI?",
        options: [
          "A network of computers",
          "A mathematical model inspired by biological neural networks",
          "Internet connectivity for AI systems",
          "A type of programming language"
        ],
        correct: 1,
        explanation: "Neural networks are computational models inspired by the way biological neural networks work."
      }
    ]
  };

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for the quiz');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setQuiz(mockQuiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIsGenerating(false);
    toast.success('Quiz generated successfully!');
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const finishQuiz = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Quiz Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create personalized quizzes on any topic with our intelligent AI system
          </p>
        </motion.div>

        {!quiz ? (
          /* Quiz Setup */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Quiz</h2>
              
              {/* Topic Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Artificial Intelligence, World History, Biology..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`p-3 rounded-xl border-2 font-medium capitalize transition-colors ${
                        difficulty === level
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions: {questionCount}
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5</span>
                  <span>20</span>
                </div>
              </div>

              {/* Question Type */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Question Type
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="fill-blank">Fill in the Blank</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateQuiz}
                disabled={isGenerating || !topic.trim()}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Generating Quiz...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-6 w-6" />
                    <span>Generate AI Quiz</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : !showResults ? (
          /* Quiz Taking */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {quiz.questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-3">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(quiz.questions[currentQuestion].id, index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                      selectedAnswers[quiz.questions[currentQuestion].id] === index
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[quiz.questions[currentQuestion].id] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[quiz.questions[currentQuestion].id] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              
              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  onClick={finishQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-colors"
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
              <div className="mb-6">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                <p className="text-xl text-gray-600">Here are your results</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {calculateScore()}/{quiz.questions.length}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {Math.round((calculateScore() / quiz.questions.length) * 100)}%
                  </div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {calculateScore() >= quiz.questions.length * 0.8 ? 'A' : 
                     calculateScore() >= quiz.questions.length * 0.6 ? 'B' : 
                     calculateScore() >= quiz.questions.length * 0.4 ? 'C' : 'D'}
                  </div>
                  <div className="text-gray-600">Grade</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetQuiz}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>New Quiz</span>
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Review Answers</span>
                </button>
              </div>
            </div>

            {/* Answer Review */}
            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      selectedAnswers[question.id] === question.correct 
                        ? 'bg-green-100' 
                        : 'bg-red-100'
                    }`}>
                      {selectedAnswers[question.id] === question.correct ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg ${
                              optionIndex === question.correct
                                ? 'bg-green-100 border border-green-300'
                                : selectedAnswers[question.id] === optionIndex
                                ? 'bg-red-100 border border-red-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correct && (
                              <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                            )}
                            {selectedAnswers[question.id] === optionIndex && optionIndex !== question.correct && (
                              <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
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