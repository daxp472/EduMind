import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Filter, FileText, BookOpen, StickyNote, Calendar, CheckCircle, Star } from 'lucide-react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for templates
  const templates = [
    {
      id: 1,
      title: 'Study Schedule Template',
      description: 'A comprehensive weekly study planner with time blocks and goal tracking.',
      category: 'planning',
      downloads: 1240,
      rating: 4.8,
      pages: 2,
      size: '0.5 MB',
      dateAdded: '2025-10-01',
      isDownloaded: true,
      thumbnail: ''
    },
    {
      id: 2,
      title: 'Note-Taking Template',
      description: 'Structured note template for effective learning and information retention.',
      category: 'notes',
      downloads: 890,
      rating: 4.6,
      pages: 1,
      size: '0.3 MB',
      dateAdded: '2025-10-05',
      isDownloaded: false,
      thumbnail: ''
    },
    {
      id: 3,
      title: 'Research Paper Outline',
      description: 'Professional template for organizing research papers and academic writing.',
      category: 'writing',
      downloads: 650,
      rating: 4.7,
      pages: 3,
      size: '0.7 MB',
      dateAdded: '2025-10-08',
      isDownloaded: true,
      thumbnail: ''
    },
    {
      id: 4,
      title: 'Flashcard Template',
      description: 'Editable flashcard design for creating custom study cards.',
      category: 'study-tools',
      downloads: 1420,
      rating: 4.9,
      pages: 1,
      size: '0.2 MB',
      dateAdded: '2025-10-10',
      isDownloaded: false,
      thumbnail: ''
    },
    {
      id: 5,
      title: 'Exam Preparation Checklist',
      description: 'Step-by-step checklist to ensure you\'re fully prepared for exams.',
      category: 'planning',
      downloads: 2100,
      rating: 4.5,
      pages: 1,
      size: '0.1 MB',
      dateAdded: '2025-10-12',
      isDownloaded: true,
      thumbnail: ''
    }
  ];

  const filteredTemplates = templates.filter(template => 
    (activeCategory === 'all' || template.category.toLowerCase() === activeCategory.toLowerCase()) &&
    (template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     template.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get icon based on template category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'planning': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'notes': return <StickyNote className="h-5 w-5 text-green-600" />;
      case 'writing': return <FileText className="h-5 w-5 text-purple-600" />;
      case 'study-tools': return <BookOpen className="h-5 w-5 text-orange-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
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
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Templates</h1>
              <p className="text-lg text-gray-600">
                Download professionally designed templates to enhance your study workflow
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select 
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="planning">Planning</option>
                <option value="notes">Notes</option>
                <option value="writing">Writing</option>
                <option value="study-tools">Study Tools</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Downloads</p>
                <p className="text-2xl font-bold text-green-600">15,890</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Download className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold text-purple-600">4.7</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Star className="h-6 w-6 text-purple-600 fill-current" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New This Month</p>
                <p className="text-2xl font-bold text-orange-600">4</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'All Templates' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Templates`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getCategoryIcon(template.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{template.title}</h3>
                      <p className="text-sm text-gray-600">{template.pages} pages • {template.size}</p>
                    </div>
                  </div>
                  {template.isDownloaded && (
                    <div className="p-1 bg-green-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{template.rating}</span>
                    <span className="text-sm text-gray-500">({template.downloads})</span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Template Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Template Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Planning Templates</h3>
              <p className="text-gray-600 mb-4">
                Study schedules, calendars, and planning tools to organize your learning.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">12 templates</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <StickyNote className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Note-Taking</h3>
              <p className="text-gray-600 mb-4">
                Structured templates for effective note-taking and information capture.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">8 templates</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing Templates</h3>
              <p className="text-gray-600 mb-4">
                Outlines, formats, and structures for academic and creative writing.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">6 templates</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Tools</h3>
              <p className="text-gray-600 mb-4">
                Flashcards, quizzes, and other tools to enhance your study sessions.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">10 templates</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;