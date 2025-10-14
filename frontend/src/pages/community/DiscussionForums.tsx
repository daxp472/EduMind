import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, Plus, Users, TrendingUp, Clock, ThumbsUp, MessageSquare, Send } from 'lucide-react';

const DiscussionForums = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for forum categories
  const categories = [
    { id: 'all', name: 'All Topics', count: 124 },
    { id: 'math', name: 'Mathematics', count: 32 },
    { id: 'science', name: 'Science', count: 28 },
    { id: 'literature', name: 'Literature', count: 19 },
    { id: 'history', name: 'History', count: 15 },
    { id: 'languages', name: 'Languages', count: 18 },
    { id: 'technology', name: 'Technology', count: 12 }
  ];

  // Mock data for forum posts
  const forumPosts = [
    {
      id: 1,
      title: 'Help with Calculus Integration Techniques',
      content: 'I\'m struggling with integration by parts. Can someone explain the ILATE rule and when to apply it?',
      author: 'Alex Johnson',
      category: 'math',
      replies: 12,
      likes: 24,
      timeAgo: '2 hours ago',
      tags: ['calculus', 'integration', 'math']
    },
    {
      id: 2,
      title: 'Best Resources for Organic Chemistry',
      content: 'Looking for recommendations on textbooks and online resources for organic chemistry. What has worked for you?',
      author: 'Sarah Williams',
      category: 'science',
      replies: 8,
      likes: 15,
      timeAgo: '4 hours ago',
      tags: ['chemistry', 'resources', 'organic']
    },
    {
      id: 3,
      title: 'Shakespearean Sonnets Analysis',
      content: 'Can someone help me understand the deeper meaning in Sonnet 18? The metaphors are confusing me.',
      author: 'Mike Chen',
      category: 'literature',
      replies: 5,
      likes: 9,
      timeAgo: '6 hours ago',
      tags: ['shakespeare', 'poetry', 'analysis']
    },
    {
      id: 4,
      title: 'World War II Timeline Discussion',
      content: 'What are the most important dates to remember for WW2? Creating a study timeline and want to make sure I include everything significant.',
      author: 'Emma Davis',
      category: 'history',
      replies: 7,
      likes: 11,
      timeAgo: '1 day ago',
      tags: ['ww2', 'timeline', 'dates']
    }
  ];

  const filteredPosts = forumPosts.filter(post => 
    (activeCategory === 'all' || post.category === activeCategory) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussion Forums</h1>
              <p className="text-lg text-gray-600">
                Join conversations, ask questions, and share knowledge with fellow learners
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                <Plus className="h-5 w-5" />
                <span>New Post</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                <p className="text-gray-600 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">1,240</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-green-600">842</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Posts</p>
                <p className="text-2xl font-bold text-purple-600">47</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Response Rate</p>
                <p className="text-2xl font-bold text-orange-600">89%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories and Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Forum Posts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.replies} replies</span>
                      </div>
                      <div className="text-sm text-gray-500">{post.timeAgo}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      by <span className="font-medium">{post.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* New Post Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start a New Discussion</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Discussion title"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="What would you like to discuss?"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
                <div className="flex items-center justify-between">
                  <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select category</option>
                    {categories.slice(1).map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <button className="flex items-center space-x-2 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Send className="h-4 w-4" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForums;