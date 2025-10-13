import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, BookOpen, Link, Download, Star, Clock, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const ResearchAssistant = () => {
  const [query, setQuery] = useState('');
  const [research, setResearch] = useState(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchType, setResearchType] = useState('comprehensive');

  const mockResearch = {
    query: "Impact of artificial intelligence on education",
    summary: "Artificial Intelligence is transforming education through personalized learning, automated assessment, and intelligent tutoring systems. Research shows significant improvements in student engagement and learning outcomes when AI tools are properly integrated into educational environments.",
    keyFindings: [
      "AI-powered personalized learning increases student engagement by 40%",
      "Automated assessment reduces teacher workload by 30% while improving accuracy",
      "Intelligent tutoring systems show 25% improvement in learning outcomes",
      "AI helps identify learning gaps earlier, enabling timely interventions"
    ],
    sources: [
      {
        title: "The Future of AI in Education: Transforming Learning",
        author: "Dr. Sarah Johnson",
        publication: "Journal of Educational Technology",
        year: 2024,
        relevance: 95,
        url: "https://example.com/ai-education-future"
      },
      {
        title: "Personalized Learning Through Artificial Intelligence",
        author: "Prof. Michael Chen",
        publication: "Educational Research Quarterly",
        year: 2023,
        relevance: 92,
        url: "https://example.com/personalized-ai-learning"
      },
      {
        title: "AI Assessment Tools: Impact on Student Performance",
        author: "Dr. Emily Rodriguez",
        publication: "Assessment in Education",
        year: 2024,
        relevance: 88,
        url: "https://example.com/ai-assessment-tools"
      },
      {
        title: "Intelligent Tutoring Systems: A Comprehensive Review",
        author: "Dr. David Park",
        publication: "Computers & Education",
        year: 2023,
        relevance: 85,
        url: "https://example.com/intelligent-tutoring-review"
      }
    ],
    relatedTopics: [
      "Machine Learning in Education",
      "Educational Technology Trends",
      "Personalized Learning Platforms",
      "Automated Grading Systems",
      "Virtual Learning Assistants"
    ],
    statistics: {
      sourcesAnalyzed: 127,
      timeToResearch: "3.2 seconds",
      confidenceScore: 94,
      lastUpdated: "2024-03-15"
    }
  };

  const researchTypes = [
    { id: 'comprehensive', name: 'Comprehensive Research', description: 'In-depth analysis with multiple sources' },
    { id: 'quick', name: 'Quick Overview', description: 'Fast summary of key points' },
    { id: 'academic', name: 'Academic Focus', description: 'Scholarly articles and papers' },
    { id: 'recent', name: 'Latest Findings', description: 'Most recent research and trends' }
  ];

  const startResearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a research topic');
      return;
    }

    setIsResearching(true);
    
    // Simulate AI research
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setResearch(mockResearch);
    setIsResearching(false);
    toast.success('Research completed successfully!');
  };

  const exportResearch = () => {
    toast.success('Research report exported successfully!');
  };

  const saveToLibrary = () => {
    toast.success('Research saved to your library!');
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
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl">
              <Search className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Research Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive research summaries, credible sources, and key insights on any topic with AI-powered analysis
          </p>
        </motion.div>

        {!research ? (
          /* Research Setup */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Your Research</h2>
              
              {/* Research Query */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Topic
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Impact of AI on education, Climate change solutions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Research Type */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Research Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {researchTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setResearchType(type.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-colors ${
                        researchType === type.id
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">{type.name}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Research Button */}
              <button
                onClick={startResearch}
                disabled={isResearching || !query.trim()}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isResearching ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Researching Topic...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-6 w-6" />
                    <span>Start AI Research</span>
                  </>
                )}
              </button>

              {/* Research Features */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <Search className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Smart Search</div>
                  <div className="text-sm text-gray-600">AI-powered source discovery</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Credible Sources</div>
                  <div className="text-sm text-gray-600">Verified academic content</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Key Insights</div>
                  <div className="text-sm text-gray-600">Important findings highlighted</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Research Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Research Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Research Results</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={saveToLibrary}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Star className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={exportResearch}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setResearch(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    New Research
                  </button>
                </div>
              </div>
              <div className="text-lg text-gray-600 italic">"{research.query}"</div>
            </div>

            {/* Research Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">{research.statistics.sourcesAnalyzed}</div>
                <div className="text-gray-600">Sources Analyzed</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{research.statistics.timeToResearch}</div>
                <div className="text-gray-600">Research Time</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{research.statistics.confidenceScore}%</div>
                <div className="text-gray-600">Confidence Score</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{research.sources.length}</div>
                <div className="text-gray-600">Key Sources</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Summary & Key Findings */}
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Research Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{research.summary}</p>
                </div>

                {/* Key Findings */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Findings</h3>
                  <div className="space-y-3">
                    {research.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{finding}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Topics */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {research.relatedTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(topic);
                          setResearch(null);
                        }}
                        className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sources */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Credible Sources</h3>
                  <div className="space-y-4">
                    {research.sources.map((source, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 flex-1 pr-4">{source.title}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-600">{source.relevance}%</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          By {source.author} • {source.publication} • {source.year}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">Relevance: {source.relevance}%</span>
                          </div>
                          <button
                            onClick={() => toast.success('Opening source...')}
                            className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                          >
                            <Link className="h-3 w-3" />
                            <span className="text-sm">View</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ResearchAssistant;