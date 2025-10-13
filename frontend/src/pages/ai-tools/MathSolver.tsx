import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Brain, Camera, Edit3, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const MathSolver = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [isSolving, setIsSolving] = useState(false);
  const [problemType, setProblemType] = useState('algebra');

  const mockSolution = {
    problem: "2x + 5 = 13",
    answer: "x = 4",
    steps: [
      {
        step: 1,
        equation: "2x + 5 = 13",
        explanation: "Starting equation"
      },
      {
        step: 2,
        equation: "2x + 5 - 5 = 13 - 5",
        explanation: "Subtract 5 from both sides"
      },
      {
        step: 3,
        equation: "2x = 8",
        explanation: "Simplify both sides"
      },
      {
        step: 4,
        equation: "2x ÷ 2 = 8 ÷ 2",
        explanation: "Divide both sides by 2"
      },
      {
        step: 5,
        equation: "x = 4",
        explanation: "Final answer"
      }
    ],
    verification: "Let's check: 2(4) + 5 = 8 + 5 = 13 ✓",
    difficulty: "Easy",
    topic: "Linear Equations",
    timeToSolve: "2.3 seconds"
  };

  const exampleProblems = [
    { type: 'algebra', problem: '3x - 7 = 14', description: 'Linear equation' },
    { type: 'calculus', problem: 'd/dx(x² + 3x)', description: 'Derivative' },
    { type: 'geometry', problem: 'Area of circle with radius 5', description: 'Circle area' },
    { type: 'trigonometry', problem: 'sin(30°)', description: 'Trigonometric value' }
  ];

  const solveProblem = async () => {
    if (!problem.trim()) {
      toast.error('Please enter a math problem');
      return;
    }

    setIsSolving(true);
    
    // Simulate AI solving
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setSolution(mockSolution);
    setIsSolving(false);
    toast.success('Problem solved successfully!');
  };

  const useExample = (exampleProblem) => {
    setProblem(exampleProblem.problem);
    setProblemType(exampleProblem.type);
  };

  const resetSolver = () => {
    setProblem('');
    setSolution(null);
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
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Math Solver
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Solve complex math problems step-by-step with AI-powered explanations and visual solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Problem</h2>
              
              {/* Problem Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Problem Type
                </label>
                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="algebra">Algebra</option>
                  <option value="calculus">Calculus</option>
                  <option value="geometry">Geometry</option>
                  <option value="trigonometry">Trigonometry</option>
                  <option value="statistics">Statistics</option>
                  <option value="linear-algebra">Linear Algebra</option>
                </select>
              </div>

              {/* Problem Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Math Problem
                </label>
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Enter your math problem here... (e.g., 2x + 5 = 13)"
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono"
                />
              </div>

              {/* Input Options */}
              <div className="flex space-x-3 mb-6">
                <button
                  onClick={() => toast.success('Camera feature coming soon!')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Photo</span>
                </button>
                <button
                  onClick={() => toast.success('Handwriting recognition coming soon!')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Draw</span>
                </button>
              </div>

              {/* Solve Button */}
              <button
                onClick={solveProblem}
                disabled={isSolving || !problem.trim()}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isSolving ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Solving Problem...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-6 w-6" />
                    <span>Solve with AI</span>
                  </>
                )}
              </button>

              {/* Example Problems */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Try These Examples</h3>
                <div className="space-y-2">
                  {exampleProblems.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => useExample(example)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                    >
                      <div className="font-medium">{example.problem}</div>
                      <div className="text-sm text-gray-500">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {solution ? (
              <div className="space-y-6">
                {/* Answer */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Solution</h3>
                    <button
                      onClick={resetSolver}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>New Problem</span>
                    </button>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{solution.answer}</div>
                    <div className="text-gray-600">Final Answer</div>
                  </div>
                </div>

                {/* Step-by-Step Solution */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step Solution</h3>
                  <div className="space-y-4">
                    {solution.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-lg text-gray-900 mb-1">{step.equation}</div>
                          <div className="text-gray-600 text-sm">{step.explanation}</div>
                        </div>
                        {index < solution.steps.length - 1 && (
                          <ArrowRight className="h-5 w-5 text-gray-400 mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">Verification</h3>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="font-mono text-green-800">{solution.verification}</p>
                  </div>
                </div>

                {/* Problem Info */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Problem Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{solution.difficulty}</div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{solution.topic}</div>
                      <div className="text-sm text-gray-600">Topic</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-pink-600">{solution.timeToSolve}</div>
                      <div className="text-sm text-gray-600">Solve Time</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Solve
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter a math problem to get step-by-step solutions with detailed explanations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">AI-Powered</div>
                    <div className="text-sm text-gray-600">Advanced problem solving</div>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Step-by-Step</div>
                    <div className="text-sm text-gray-600">Detailed explanations</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default MathSolver;