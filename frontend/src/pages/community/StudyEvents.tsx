import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Search, Plus, Filter, ChevronRight, Star, Award } from 'lucide-react';

const StudyEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for study events
  const studyEvents = [
    {
      id: 1,
      title: 'Mathematics Study Group',
      description: 'Weekly problem-solving session for calculus students. Bring your questions and join collaborative learning.',
      date: '2025-10-15',
      time: '14:00 - 16:00',
      location: 'Library Room 301',
      attendees: 12,
      maxAttendees: 20,
      category: 'math',
      organizer: 'Dr. Smith',
      rating: 4.8,
      isOnline: false
    },
    {
      id: 2,
      title: 'Literature Discussion Circle',
      description: 'Monthly book discussion on classic literature. This month: Pride and Prejudice by Jane Austen.',
      date: '2025-10-18',
      time: '18:00 - 19:30',
      location: 'Online (Zoom)',
      attendees: 25,
      maxAttendees: 30,
      category: 'literature',
      organizer: 'Prof. Johnson',
      rating: 4.9,
      isOnline: true
    },
    {
      id: 3,
      title: 'Physics Problem Workshop',
      description: 'Hands-on workshop for solving complex physics problems. Focus on mechanics and thermodynamics.',
      date: '2025-10-20',
      time: '15:00 - 17:00',
      location: 'Science Building B205',
      attendees: 8,
      maxAttendees: 15,
      category: 'science',
      organizer: 'Dr. Williams',
      rating: 4.7,
      isOnline: false
    },
    {
      id: 4,
      title: 'History Study Session',
      description: 'Review session for upcoming history exam. Focus on World War II and Cold War topics.',
      date: '2025-10-22',
      time: '19:00 - 21:00',
      location: 'Online (Google Meet)',
      attendees: 18,
      maxAttendees: 25,
      category: 'history',
      organizer: 'Prof. Davis',
      rating: 4.6,
      isOnline: true
    },
    {
      id: 5,
      title: 'Language Exchange Meetup',
      description: 'Practice speaking Spanish with native speakers. All levels welcome!',
      date: '2025-10-25',
      time: '17:00 - 18:30',
      location: 'Student Center Lounge',
      attendees: 14,
      maxAttendees: 20,
      category: 'languages',
      organizer: 'Maria Rodriguez',
      rating: 4.9,
      isOnline: false
    }
  ];

  const filteredEvents = studyEvents.filter(event => 
    (activeFilter === 'all' || event.category === activeFilter) &&
    (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Events</h1>
              <p className="text-lg text-gray-600">
                Join upcoming study sessions, workshops, and collaborative learning events
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                <Plus className="h-5 w-5" />
                <span>Create Event</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {['all', 'math', 'science', 'literature', 'history', 'languages'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
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
                <p className="text-gray-600 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">This Week</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Online Events</p>
                <p className="text-2xl font-bold text-purple-600">15</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
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

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeFilter === 'all' ? 'Upcoming Events' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Events`}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-gray-600 text-sm">Organized by {event.organizer}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{event.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                    {event.isOnline && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Online
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <span>Join Event</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Award className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Event Calendar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar</h2>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-7 gap-4 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-700 py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days - simplified for demo */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 4; // Adjust for starting day
                const isCurrentMonth = day > 0 && day <= 31;
                const isToday = day === 14; // Today is Oct 14
                const hasEvent = day === 15 || day === 18 || day === 20 || day === 22 || day === 25;
                
                return (
                  <div 
                    key={i} 
                    className={`h-16 rounded-lg flex flex-col items-center justify-center p-1 ${
                      isCurrentMonth 
                        ? isToday 
                          ? 'bg-blue-100 border-2 border-blue-500' 
                          : 'hover:bg-gray-50 cursor-pointer'
                        : 'text-gray-400 bg-gray-50'
                    }`}
                  >
                    {isCurrentMonth && (
                      <>
                        <span className="text-sm font-medium">{day}</span>
                        {hasEvent && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center">
              <button className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Full Calendar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudyEvents;