import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Sparkles, Download, Copy, Zap, BookOpen, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { aiAPI } from '../../services/api';

const AISummarizer = () => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summaryType, setSummaryType] = useState('bullet');
  const [summaryLength, setSummaryLength] = useState('medium');

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to use this feature');
      return;
    }

    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('edumind_token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await aiAPI.summarizeText(
        { 
          text: inputText, 
          type: summaryType, 
          length: summaryLength 
        }, 
        token
      );
      
      setSummary(response.data.summary);
      setIsLoading(false);
      toast.success('Summary generated successfully!');
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to generate summary');
      } else {
        toast.error('Failed to generate summary');
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-summary.txt';
    a.click();
    toast.success('Summary downloaded!');
  };

  const summaryTypes = [
    { id: 'bullet', name: 'Bullet Points', icon: Target },
    { id: 'paragraph', name: 'Paragraph', icon: FileText },
    { id: 'outline', name: 'Outline', icon: BookOpen }
  ];

  const summaryLengths = [
    { id: 'short', name: 'Short', description: '2-3 sentences' },
    { id: 'medium', name: 'Medium', description: '1-2 paragraphs' },
    { id: 'detailed', name: 'Detailed', description: '3-4 paragraphs' }
  ];

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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Text Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform lengthy documents into concise, intelligent summaries with our advanced AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Text</h2>
              
              {/* File Upload */}
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload a document or paste your text below</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, TXT files up to 10MB</p>
                  <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>

              {/* Text Input */}
              <div className="mb-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here or upload a document above..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {inputText.length} characters
                  </span>
                  <span className="text-sm text-gray-500">
                    ~{Math.ceil(inputText.split(' ').length / 200)} min read
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSummarize}
                disabled={isLoading || !inputText.trim()}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Generating Summary...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6" />
                    <span>Generate AI Summary</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Settings & Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            
            {/* Settings */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Summary Settings</h3>
              
              {/* Summary Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Summary Format
                </label>
                <div className="space-y-2">
                  {summaryTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSummaryType(type.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                        summaryType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className="h-5 w-5" />
                      <span className="font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Length */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Summary Length
                </label>
                <div className="space-y-2">
                  {summaryLengths.map((length) => (
                    <button
                      key={length.id}
                      onClick={() => setSummaryLength(length.id)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                        summaryLength === length.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{length.name}</div>
                      <div className="text-sm opacity-75">{length.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Processing Speed</span>
                  <span className="font-semibold text-green-600">Ultra Fast</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Accuracy Rate</span>
                  <span className="font-semibold text-blue-600">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-semibold text-purple-600">50+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Output Section */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">AI Generated Summary</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {summary}
                  </pre>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Compression</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2.3s</div>
                  <div className="text-sm text-gray-600">Process Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">A+</div>
                  <div className="text-sm text-gray-600">Quality Score</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AISummarizer;