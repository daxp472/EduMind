import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Upload, Search, Filter, Download, Eye, Star, Clock, FileText, Image, Video, Music } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const materials = [
    {
      id: 1,
      name: 'Calculus Fundamentals.pdf',
      type: 'pdf',
      subject: 'Mathematics',
      category: 'Notes',
      size: '2.4 MB',
      uploadDate: '2024-03-15',
      lastAccessed: '2024-03-18',
      favorite: true,
      description: 'Comprehensive notes on calculus fundamentals including limits, derivatives, and integrals'
    },
    {
      id: 2,
      name: 'Physics Lab Report Template.docx',
      type: 'document',
      subject: 'Physics',
      category: 'Templates',
      size: '156 KB',
      uploadDate: '2024-03-10',
      lastAccessed: '2024-03-17',
      favorite: false,
      description: 'Standard template for physics lab reports with proper formatting'
    },
    {
      id: 3,
      name: 'Spanish Vocabulary Flashcards.pdf',
      type: 'pdf',
      subject: 'Languages',
      category: 'Flashcards',
      size: '890 KB',
      uploadDate: '2024-03-12',
      lastAccessed: '2024-03-19',
      favorite: true,
      description: 'Essential Spanish vocabulary with pronunciation guides'
    },
    {
      id: 4,
      name: 'Algorithm Visualization.mp4',
      type: 'video',
      subject: 'Computer Science',
      category: 'Videos',
      size: '45.2 MB',
      uploadDate: '2024-03-08',
      lastAccessed: '2024-03-16',
      favorite: false,
      description: 'Visual explanation of sorting algorithms and their complexity'
    },
    {
      id: 5,
      name: 'Chemistry Periodic Table.png',
      type: 'image',
      subject: 'Chemistry',
      category: 'References',
      size: '1.8 MB',
      uploadDate: '2024-03-14',
      lastAccessed: '2024-03-18',
      favorite: true,
      description: 'High-resolution periodic table with element properties'
    },
    {
      id: 6,
      name: 'Biology Study Guide.pdf',
      type: 'pdf',
      subject: 'Biology',
      category: 'Study Guides',
      size: '3.1 MB',
      uploadDate: '2024-03-11',
      lastAccessed: '2024-03-17',
      favorite: false,
      description: 'Comprehensive study guide for cell biology and genetics'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: materials.length },
    { id: 'Notes', name: 'Notes', count: 1 },
    { id: 'Templates', name: 'Templates', count: 1 },
    { id: 'Flashcards', name: 'Flashcards', count: 1 },
    { id: 'Videos', name: 'Videos', count: 1 },
    { id: 'References', name: 'References', count: 1 },
    { id: 'Study Guides', name: 'Study Guides', count: 1 }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects', count: materials.length },
    { id: 'Mathematics', name: 'Mathematics', count: 1 },
    { id: 'Physics', name: 'Physics', count: 1 },
    { id: 'Languages', name: 'Languages', count: 1 },
    { id: 'Computer Science', name: 'Computer Science', count: 1 },
    { id: 'Chemistry', name: 'Chemistry', count: 1 },
    { id: 'Biology', name: 'Biology', count: 1 }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    return matchesSearch && matchesCategory && matchesSubject;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      default:
        return FileText;
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-100';
      case 'document':
        return 'text-blue-600 bg-blue-100';
      case 'image':
        return 'text-green-600 bg-green-100';
      case 'video':
        return 'text-purple-600 bg-purple-100';
      case 'audio':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleFavorite = (materialId) => {
    toast.success('Favorite status updated!');
  };

  const downloadFile = (material) => {
    toast.success(`Downloading ${material.name}...`);
  };

  const previewFile = (material) => {
    toast.success(`Opening ${material.name} for preview...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Materials</h1>
            <p className="text-lg text-gray-600">Organize and access your learning resources</p>
          </div>
          <button
            onClick={() => toast.success('File upload feature coming soon!')}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Files</span>
          </button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.count})
                </option>
              ))}
            </select>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </motion.div>

        {/* Materials Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMaterials.map((material) => {
                const FileIcon = getFileIcon(material.type);
                return (
                  <div key={material.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${getFileColor(material.type)}`}>
                          <FileIcon className="h-6 w-6" />
                        </div>
                        <button
                          onClick={() => toggleFavorite(material.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            material.favorite 
                              ? 'text-yellow-500 bg-yellow-100' 
                              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100'
                          }`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 truncate" title={material.name}>
                        {material.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {material.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{material.subject}</span>
                        <span>{material.size}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(material.lastAccessed).toLocaleDateString()}</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {material.category}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => previewFile(material)}
                          className="flex-1 flex items-center justify-center space-x-1 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">Preview</span>
                        </button>
                        <button
                          onClick={() => downloadFile(material)}
                          className="flex-1 flex items-center justify-center space-x-1 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredMaterials.map((material) => {
                  const FileIcon = getFileIcon(material.type);
                  return (
                    <div key={material.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${getFileColor(material.type)}`}>
                          <FileIcon className="h-6 w-6" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {material.name}
                            </h3>
                            {material.favorite && (
                              <Star className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{material.subject}</span>
                            <span>{material.category}</span>
                            <span>{material.size}</span>
                            <span>Last accessed: {new Date(material.lastAccessed).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => previewFile(material)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => downloadFile(material)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleFavorite(material.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              material.favorite 
                                ? 'text-yellow-500 bg-yellow-100' 
                                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100'
                            }`}
                          >
                            <Star className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No materials found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters, or upload some new materials.
            </p>
            <button
              onClick={() => toast.success('File upload feature coming soon!')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Upload Your First File
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudyMaterials;