import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Calendar, Clock, BookOpen, MessageSquare, Video } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyGroups = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const studyGroups = [
    {
      id: 1,
      name: 'Advanced Calculus Study Circle',
      subject: 'Mathematics',
      description: 'Weekly sessions focusing on calculus problems and concepts',
      members: 12,
      maxMembers: 15,
      nextSession: '2024-03-20 18:00',
      difficulty: 'Advanced',
      isPrivate: false,
      admin: 'Prof. Johnson',
      tags: ['Calculus', 'Problem Solving', 'Exam Prep']
    },
    {
      id: 2,
      name: 'Physics Lab Partners',
      subject: 'Physics',
      description: 'Collaborative physics experiments and lab report discussions',
      members: 8,
      maxMembers: 10,
      nextSession: '2024-03-21 14:30',
      difficulty: 'Intermediate',
      isPrivate: false,
      admin: 'Sarah Chen',
      tags: ['Lab Work', 'Experiments', 'Reports']
    },
    {
      id: 3,
      name: 'Computer Science Bootcamp',
      subject: 'Computer Science',
      description: 'Coding challenges, algorithm practice, and project collaboration',
      members: 25,
      maxMembers: 30,
      nextSession: '2024-03-19 20:00',
      difficulty: 'Beginner',
      isPrivate: false,
      admin: 'Alex Kumar',
      tags: ['Programming', 'Algorithms', 'Projects']
    },
    {
      id: 4,
      name: 'Medical School Prep',
      subject: 'Biology',
      description: 'MCAT preparation and medical school entrance exam practice',
      members: 15,
      maxMembers: 20,
      nextSession: '2024-03-22 16:00',
      difficulty: 'Advanced',
      isPrivate: true,
      admin: 'Dr. Martinez',
      tags: ['MCAT', 'Medical School', 'Practice Tests']
    },
    {
      id: 5,
      name: 'Spanish Conversation Club',
      subject: 'Languages',
      description: 'Practice Spanish speaking and cultural discussions',
      members: 18,
      maxMembers: 25,
      nextSession: '2024-03-20 19:30',
      difficulty: 'Intermediate',
      isPrivate: false,
      admin: 'Maria Rodriguez',
      tags: ['Speaking', 'Culture', 'Conversation']
    }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects', count: studyGroups.length },
    { id: 'Mathematics', name: 'Mathematics', count: 1 },
    { id: 'Physics', name: 'Physics', count: 1 },
    { id: 'Computer Science', name: 'Computer Science', count: 1 },
    { id: 'Biology', name: 'Biology', count: 1 },
    { id: 'Languages', name: 'Languages', count: 1 }
  ];

  const myGroups = studyGroups.slice(0, 2); // Mock user's groups

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || group.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const joinGroup = (groupId) => {
    toast.success('Successfully joined the study group!');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
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
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Groups
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join collaborative study groups, share knowledge, and learn together with peers from around the world
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'browse'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Browse Groups
            </button>
            <button
              onClick={() => setActiveTab('my-groups')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'my-groups'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Groups
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'create'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Group
            </button>
          </div>
        </motion.div>

        {activeTab === 'browse' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search study groups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Study Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                      </div>
                      {group.isPrivate && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          Private
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {group.members}/{group.maxMembers} members
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(group.difficulty)}`}>
                        {group.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{group.subject}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(group.nextSession).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Admin: {group.admin}
                      </div>
                      <button
                        onClick={() => joinGroup(group.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Join Group
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'my-groups' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* My Groups */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Study Groups</h2>
                <div className="space-y-4">
                  {myGroups.map((group) => (
                    <div key={group.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.subject}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toast.success('Joining video call...')}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Video className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toast.success('Opening chat...')}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{group.members} members</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Next: {new Date(group.nextSession).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
                <div className="space-y-4">
                  {myGroups.map((group) => (
                    <div key={group.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <span className="text-sm text-purple-600 font-medium">
                          {new Date(group.nextSession).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {new Date(group.nextSession).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                          Join Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Study Group</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your study group"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Select subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Biology">Biology</option>
                      <option value="Languages">Languages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Members: 15
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    defaultValue="15"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="private"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
                    Make this group private (invite only)
                  </label>
                </div>

                <button
                  onClick={() => toast.success('Study group created successfully!')}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Study Group</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudyGroups;