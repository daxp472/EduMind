import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lock, Globe, Plus, Search, Clock, BookOpen, Headphones, Coffee } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyRooms = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const studyRooms = [
    {
      id: 1,
      name: 'Deep Focus Zone',
      description: 'Silent study room for maximum concentration',
      category: 'Silent Study',
      participants: 24,
      maxParticipants: 50,
      isPrivate: false,
      background: 'Library',
      ambientSound: 'Rain',
      host: 'Sarah Chen',
      duration: '2h 15m',
      tags: ['Focus', 'Silent', 'Productivity']
    },
    {
      id: 2,
      name: 'CS Study Group',
      description: 'Computer Science students preparing for finals',
      category: 'Study Group',
      participants: 8,
      maxParticipants: 15,
      isPrivate: false,
      background: 'Modern Office',
      ambientSound: 'White Noise',
      host: 'Alex Kumar',
      duration: '45m',
      tags: ['Computer Science', 'Finals', 'Group Study']
    },
    {
      id: 3,
      name: 'Pomodoro Power Hour',
      description: '25-min focused sessions with 5-min breaks',
      category: 'Pomodoro',
      participants: 32,
      maxParticipants: 100,
      isPrivate: false,
      background: 'Minimalist',
      ambientSound: 'Forest',
      host: 'EduMind Bot',
      duration: '1h 30m',
      tags: ['Pomodoro', 'Productivity', 'Timer']
    },
    {
      id: 4,
      name: 'Medical School Prep',
      description: 'MCAT preparation and medical studies',
      category: 'Subject Specific',
      participants: 12,
      maxParticipants: 20,
      isPrivate: true,
      background: 'Medical Library',
      ambientSound: 'Calm',
      host: 'Dr. Martinez',
      duration: '3h 20m',
      tags: ['MCAT', 'Medicine', 'Intensive']
    },
    {
      id: 5,
      name: 'Language Learning Café',
      description: 'Practice languages with fellow learners',
      category: 'Language',
      participants: 18,
      maxParticipants: 25,
      isPrivate: false,
      background: 'Café',
      ambientSound: 'Café Ambience',
      host: 'Maria Rodriguez',
      duration: '1h 45m',
      tags: ['Languages', 'Speaking', 'Practice']
    },
    {
      id: 6,
      name: 'Math Problem Solving',
      description: 'Collaborative math problem solving session',
      category: 'Study Group',
      participants: 6,
      maxParticipants: 12,
      isPrivate: false,
      background: 'Classroom',
      ambientSound: 'None',
      host: 'Prof. Johnson',
      duration: '2h 5m',
      tags: ['Mathematics', 'Problem Solving', 'Collaboration']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Rooms', count: studyRooms.length },
    { id: 'Silent Study', name: 'Silent Study', count: 1 },
    { id: 'Study Group', name: 'Study Groups', count: 2 },
    { id: 'Pomodoro', name: 'Pomodoro', count: 1 },
    { id: 'Subject Specific', name: 'Subject Specific', count: 1 },
    { id: 'Language', name: 'Languages', count: 1 }
  ];

  const backgrounds = [
    'Library', 'Modern Office', 'Minimalist', 'Café', 'Nature', 'Classroom'
  ];

  const ambientSounds = [
    'None', 'Rain', 'White Noise', 'Forest', 'Ocean', 'Café Ambience', 'Fireplace'
  ];

  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    category: 'Study Group',
    maxParticipants: 10,
    isPrivate: false,
    background: 'Library',
    ambientSound: 'None'
  });

  const filteredRooms = studyRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const joinRoom = (roomId) => {
    toast.success('Joined study room successfully!');
  };

  const createRoom = () => {
    if (!newRoom.name || !newRoom.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Study room created successfully!');
    setActiveTab('browse');
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
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Study Rooms
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join focused study environments with ambient sounds, timers, and collaborative features
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
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Browse Rooms
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => setActiveTab('my-rooms')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'my-rooms'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Rooms
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
                    placeholder="Search study rooms..."
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
              </div>
            </div>

            {/* Study Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                        <p className="text-gray-600 text-sm">{room.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {room.isPrivate ? (
                          <Lock className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Globe className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {room.participants}/{room.maxParticipants}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{room.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{room.background}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Headphones className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{room.ambientSound}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Host: {room.host}
                      </div>
                      <button
                        onClick={() => joinRoom(room.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Join Room
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Study Room</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name *
                  </label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter room name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newRoom.description}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your study room"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newRoom.category}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Study Group">Study Group</option>
                      <option value="Silent Study">Silent Study</option>
                      <option value="Pomodoro">Pomodoro</option>
                      <option value="Subject Specific">Subject Specific</option>
                      <option value="Language">Language</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Participants: {newRoom.maxParticipants}
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="100"
                      value={newRoom.maxParticipants}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background
                    </label>
                    <select
                      value={newRoom.background}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, background: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {backgrounds.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ambient Sound
                    </label>
                    <select
                      value={newRoom.ambientSound}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, ambientSound: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {ambientSounds.map(sound => (
                        <option key={sound} value={sound}>{sound}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="private"
                    checked={newRoom.isPrivate}
                    onChange={(e) => setNewRoom(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
                    Make this room private (invite only)
                  </label>
                </div>

                <button
                  onClick={createRoom}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Study Room</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'my-rooms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <Coffee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms yet</h3>
            <p className="text-gray-600 mb-6">Create your first study room to get started</p>
            <button
              onClick={() => setActiveTab('create')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Create Room
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudyRooms;