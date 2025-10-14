import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, Download, Bookmark, Star, Clock, User, BookMarked, FileText, Presentation, StickyNote } from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for library resources
  const libraryResources = [
    {
      id: 1,
      title: 'Advanced Calculus Textbook',
      type: 'book',
      subject: 'Mathematics',
      author: 'Dr. James Stewart',
      rating: 4.8,
      downloads: 1240,
      pages: 850,
      size: '15.2 MB',
      dateAdded: '2025-10-01',
      isBookmarked: true,
      thumbnail: ''
    },
    {
      id: 2,
      title: 'Organic Chemistry Lecture Notes',
      type: 'document',
      subject: 'Chemistry',
      author: 'Prof. Sarah Williams',
      rating: 4.6,
      downloads: 890,
      pages: 45,
      size: '3.1 MB',
      dateAdded: '2025-10-05',
      isBookmarked: false,
      thumbnail: ''
    },
    {
      id: 3,
      title: 'World History Presentation',
      type: 'presentation',
      subject: 'History',
      author: 'Dr. Michael Chen',
      rating: 4.7,
      downloads: 650,
      pages: 32,
      size: '8.7 MB',
      dateAdded: '2025-10-08',
      isBookmarked: true,
      thumbnail: ''
    },
    {
      id: 4,
      title: 'Shakespeare Study Guide',
      type: 'document',
      subject: 'Literature',
      author: 'Prof. Emma Davis',
      rating: 4.9,
      downloads: 1420,
      pages: 28,
      size: '2.3 MB',
      dateAdded: '2025-10-10',
      isBookmarked: false,
      thumbnail: ''
    },
    {
      id: 5,
      title: 'Spanish Grammar Cheatsheet',
      type: 'note',
      subject: 'Languages',
      author: 'Maria Rodriguez',
      rating: 4.5,
      downloads: 2100,
      pages: 5,
      size: '1.1 MB',
      dateAdded: '2025-10-12',
      isBookmarked: true,
      thumbnail: ''
    }
  ];

  const filteredResources = libraryResources.filter(resource => 
    (activeCategory === 'all' || resource.subject.toLowerCase() === activeCategory.toLowerCase()) &&
    (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort resources based on selected option
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookMarked className="h-5 w-5 text-blue-600" />;
      case 'document': return <FileText className="h-5 w-5 text-green-600" />;
      case 'presentation': return <Presentation className="h-5 w-5 text-purple-600" />;
      case 'note': return <StickyNote className="h-5 w-5 text-yellow-600" />;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Library</h1>
              <p className="text-lg text-gray-600">
                Access thousands of educational resources created by experts and learners
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select 
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  <option value="all">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="history">History</option>
                  <option value="literature">Literature</option>
                  <option value="languages">Languages</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select 
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
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
                <p className="text-gray-600 text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900">3,240</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Downloads</p>
                <p className="text-2xl font-bold text-green-600">45,890</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Download className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Contributors</p>
                <p className="text-2xl font-bold text-purple-600">1,240</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold text-orange-600">4.7</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Star className="h-6 w-6 text-orange-600 fill-current" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'All Resources' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Resources`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.author}</p>
                    </div>
                  </div>
                  <button className={`p-2 rounded-lg ${resource.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}>
                    <Bookmark className="h-4 w-4" fill={resource.isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {resource.subject}
                  </span>
                  <span>{resource.pages} pages</span>
                  <span>{resource.size}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{resource.rating}</span>
                    <span className="text-sm text-gray-500">({resource.downloads})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{resource.dateAdded}</span>
                  </div>
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

        {/* Upload Resource Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Share Your Resources</h3>
                <p className="opacity-90">
                  Contribute to the community by uploading your study materials and resources
                </p>
              </div>
              <button className="py-3 px-6 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Upload Resource
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Library;