import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Clock, BookOpen, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Calculus Study Session',
      subject: 'Mathematics',
      type: 'study',
      date: '2024-03-20',
      startTime: '14:00',
      endTime: '16:00',
      description: 'Review derivatives and integrals',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Physics Lab Report Due',
      subject: 'Physics',
      type: 'deadline',
      date: '2024-03-22',
      startTime: '23:59',
      endTime: '23:59',
      description: 'Submit lab report on electromagnetic induction',
      color: 'red'
    },
    {
      id: 3,
      title: 'Spanish Conversation Practice',
      subject: 'Languages',
      type: 'practice',
      date: '2024-03-21',
      startTime: '18:00',
      endTime: '19:00',
      description: 'Weekly conversation practice with study group',
      color: 'green'
    },
    {
      id: 4,
      title: 'Computer Science Exam',
      subject: 'Computer Science',
      type: 'exam',
      date: '2024-03-25',
      startTime: '10:00',
      endTime: '12:00',
      description: 'Midterm exam covering algorithms and data structures',
      color: 'purple'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    subject: '',
    type: 'study',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    color: 'blue'
  });

  const eventTypes = [
    { id: 'study', name: 'Study Session', color: 'blue' },
    { id: 'exam', name: 'Exam', color: 'purple' },
    { id: 'deadline', name: 'Deadline', color: 'red' },
    { id: 'practice', name: 'Practice', color: 'green' },
    { id: 'review', name: 'Review', color: 'yellow' }
  ];

  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Languages', 'Biology', 'Chemistry'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      subject: '',
      type: 'study',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      color: 'blue'
    });
    setShowAddEvent(false);
    toast.success('Event added successfully!');
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getEventColor = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      red: 'bg-red-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      yellow: 'bg-yellow-500 text-white'
    };
    return colors[color] || colors.blue;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = formatDate(date) === formatDate(new Date());
      const isSelected = formatDate(date) === formatDate(selectedDate);

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-32 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded truncate ${getEventColor(event.color)}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Calendar</h1>
            <p className="text-lg text-gray-600">Plan and organize your study schedule</p>
          </div>
          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Add Event</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h2 className="text-2xl font-bold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 bg-gray-50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-4 text-center font-semibold text-gray-700 border-b border-gray-200">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            
            {/* Selected Date Events */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getEventColor(event.color).replace('text-white', '')}`}></div>
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="text-sm text-gray-500">{event.subject}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No events scheduled</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">Study Sessions</span>
                  </div>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700">Exams</span>
                  </div>
                  <span className="font-semibold text-purple-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span className="text-gray-700">Deadlines</span>
                  </div>
                  <span className="font-semibold text-red-600">3</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 3)
                  .map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <div className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()} at {event.startTime}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Event</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={newEvent.subject}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => {
                        const selectedType = eventTypes.find(t => t.id === e.target.value);
                        setNewEvent(prev => ({ 
                          ...prev, 
                          type: e.target.value,
                          color: selectedType?.color || 'blue'
                        }));
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {eventTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Add event description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={addEvent}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Add Event
                  </button>
                  <button
                    onClick={() => setShowAddEvent(false)}
                    className="flex-1 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudyCalendar;