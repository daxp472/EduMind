import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Download, Zap, Brain, Cpu, Database } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  rating: number;
  usageCount: number;
  isFree: boolean;
  tags: string[];
}

const AIModels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  
  const aiModels: AIModel[] = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: 'Most capable GPT-4 model with improved instruction following and JSON mode.',
      capabilities: ['Text Generation', 'Code Writing', 'Analysis'],
      rating: 4.9,
      usageCount: 12500,
      isFree: false,
      tags: ['text', 'coding', 'analysis']
    },
    {
      id: '2',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: 'Most powerful model, excelling at highly complex tasks.',
      capabilities: ['Complex Reasoning', 'Creative Writing', 'Document Analysis'],
      rating: 4.8,
      usageCount: 9800,
      isFree: false,
      tags: ['text', 'creative', 'analysis']
    },
    {
      id: '3',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Versatile model for a wide range of tasks with multimodal capabilities.',
      capabilities: ['Multimodal', 'Research', 'Summarization'],
      rating: 4.7,
      usageCount: 11200,
      isFree: true,
      tags: ['multimodal', 'research', 'text']
    },
    {
      id: '4',
      name: 'Llama 3 70B',
      provider: 'Meta',
      description: 'Open-source model with strong performance across various benchmarks.',
      capabilities: ['Open Source', 'Customizable', 'Multilingual'],
      rating: 4.6,
      usageCount: 8700,
      isFree: true,
      tags: ['open-source', 'multilingual', 'custom']
    },
    {
      id: '5',
      name: 'Mistral Large',
      provider: 'Mistral AI',
      description: 'Efficient model optimized for reasoning and code generation.',
      capabilities: ['Code Generation', 'Reasoning', 'Math'],
      rating: 4.5,
      usageCount: 7600,
      isFree: true,
      tags: ['coding', 'math', 'efficient']
    },
    {
      id: '6',
      name: 'Command R+',
      provider: 'Cohere',
      description: 'Specialized for RAG tasks and tool use with 128K context window.',
      capabilities: ['RAG', 'Tool Use', 'Long Context'],
      rating: 4.4,
      usageCount: 6500,
      isFree: false,
      tags: ['rag', 'tools', 'long-context']
    }
  ];

  const allTags = ['all', ...Array.from(new Set(aiModels.flatMap(model => model.tags)))];

  const filteredModels = aiModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || model.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Model Library</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore and compare different AI models to find the perfect one for your learning needs. 
            Each model has unique strengths and capabilities.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search AI models..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <select
                className="py-3 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* AI Models Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredModels.map((model) => (
            <motion.div
              key={model.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{model.name}</h3>
                    <p className="text-indigo-600 font-medium">{model.provider}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{model.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{model.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {model.tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Capabilities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.capabilities.map(capability => (
                      <span key={capability} className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Zap size={14} />
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Database size={16} />
                    <span>{model.usageCount.toLocaleString()} uses</span>
                  </div>
                  {model.isFree ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Free
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Premium
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <Brain size={18} />
                    Use Model
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredModels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Cpu size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No models found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIModels;