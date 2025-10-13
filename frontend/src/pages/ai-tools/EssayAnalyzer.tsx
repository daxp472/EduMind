import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, CheckCircle, AlertCircle, TrendingUp, Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const EssayAnalyzer = () => {
  const [essay, setEssay] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState('comprehensive');

  const mockAnalysis = {
    overallScore: 85,
    wordCount: 847,
    readabilityScore: 78,
    grades: {
      grammar: 88,
      vocabulary: 82,
      structure: 90,
      coherence: 85,
      argumentation: 80
    },
    strengths: [
      "Clear thesis statement and strong introduction",
      "Good use of transitional phrases between paragraphs",
      "Relevant examples and evidence to support arguments",
      "Proper citation format and academic tone"
    ],
    improvements: [
      "Some sentences are too long and could be simplified",
      "Consider varying sentence structure for better flow",
      "The conclusion could be strengthened with a call to action",
      "Minor grammatical errors in paragraph 3"
    ],
    suggestions: [
      {
        type: "Grammar",
        issue: "Subject-verb disagreement in line 23",
        suggestion: "Change 'The data shows' to 'The data show'",
        severity: "medium"
      },
      {
        type: "Style",
        issue: "Repetitive word usage",
        suggestion: "Replace 'important' with 'crucial', 'significant', or 'vital'",
        severity: "low"
      },
      {
        type: "Structure",
        issue: "Paragraph 2 lacks a clear topic sentence",
        suggestion: "Add a topic sentence that introduces the main idea",
        severity: "high"
      }
    ],
    plagiarismScore: 5,
    readingLevel: "College Level",
    estimatedReadingTime: "3 minutes"
  };

  const analyzeEssay = async () => {
    if (!essay.trim()) {
      toast.error('Please enter your essay text');
      return;
    }

    if (essay.trim().split(' ').length < 50) {
      toast.error('Essay should be at least 50 words long');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    toast.success('Essay analysis completed!');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Essay Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive feedback on your essays with AI-powered analysis and improvement suggestions
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Essay</h2>
              
              {/* Analysis Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Analysis Type
                </label>
                <select
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="grammar">Grammar & Style Focus</option>
                  <option value="structure">Structure & Organization</option>
                  <option value="argumentation">Argumentation Analysis</option>
                </select>
              </div>

              {/* Essay Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Essay Text
                </label>
                <textarea
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  placeholder="Paste your essay here for AI analysis..."
                  className="w-full h-80 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {essay.length} characters, {essay.trim().split(' ').filter(word => word.length > 0).length} words
                  </span>
                  <span className="text-sm text-gray-500">
                    Min 50 words required
                  </span>
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzeEssay}
                disabled={isAnalyzing || !essay.trim()}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Analyzing Essay...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-6 w-6" />
                    <span>Analyze with AI</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {analysis ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Overall Score</h3>
                    <button
                      onClick={() => toast.success('Report downloaded!')}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </div>
                    <div className="text-gray-600">out of 100</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analysis.wordCount}</div>
                      <div className="text-sm text-gray-600">Words</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{analysis.readabilityScore}</div>
                      <div className="text-sm text-gray-600">Readability</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{analysis.plagiarismScore}%</div>
                      <div className="text-sm text-gray-600">Similarity</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{analysis.estimatedReadingTime}</div>
                      <div className="text-sm text-gray-600">Read Time</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Scores */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
                  <div className="space-y-4">
                    {Object.entries(analysis.grades).map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="font-medium text-gray-700 capitalize">{category}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <span className={`font-bold ${getScoreColor(score)}`}>{score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready for Analysis
                </h3>
                <p className="text-gray-600">
                  Submit your essay to get comprehensive AI-powered feedback and suggestions for improvement.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Detailed Feedback */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Strengths */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Strengths</h3>
              </div>
              <div className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Areas for Improvement</h3>
              </div>
              <div className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Specific Suggestions */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Specific Suggestions</h3>
                </div>
                <button
                  onClick={() => setAnalysis(null)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>New Analysis</span>
                </button>
              </div>
              <div className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{suggestion.type}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(suggestion.severity)}`}>
                        {suggestion.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{suggestion.issue}</p>
                    <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                      <strong>Suggestion:</strong> {suggestion.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default EssayAnalyzer;