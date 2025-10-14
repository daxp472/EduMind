import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Calendar, Trophy, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudyCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for community stats
  const communityStats = {
    totalMembers: 12540,
    onlineNow: 842,
    activeGroups: 320,
    eventsThisWeek: 18
  };
  
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'joined the group',
      target: 'Advanced Calculus Study Group',
      time: '2 min ago'
    },
    {
      id: 2,
      user: 'Sam Rivera',
      action: 'created a new event',
      target: 'Python Coding Marathon',
      time: '15 min ago'
    },
    {
      id: 3,
      user: 'Priya Sharma',
      action: 'achieved a new badge',
      target: 'Consistent Learner',
      time: '1 hour ago'
    },
    {
      id: 4,
      user: 'Marcus Chen',
      action: 'posted in forum',
      target: 'Tips for Organic Chemistry',
      time: '3 hours ago'
    }
  ];
  
  // Mock data for popular groups
  const popularGroups = [
    {
      id: 1,
      name: 'Machine Learning Enthusiasts',
      members: 1240,
      category: 'Technology',
      isJoined: true
    },
    {
      id: 2,
      name: 'Medical School Study Group',
      members: 890,
      category: 'Academics',
      isJoined: false
    },
    {
      id: 3,
      name: 'Language Exchange Community',
      members: 2100,
      category: 'Languages',
      isJoined: true
    },
    {
      id: 4,
      name: 'Competitive Programming',
      members: 1560,
      category: 'Computer Science',
      isJoined: false
    }
  ];
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'forums', label: 'Forums', icon: MessageCircle },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'leaderboards', label: 'Leaderboards', icon: Trophy }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Study Community</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with fellow learners, join study groups, participate in events, and climb the leaderboards.
            Our community helps you stay motivated and engaged in your learning journey.
          </p>
        </motion.div>
        
        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Users className="mx-auto text-indigo-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-800">{communityStats.totalMembers.toLocaleString()}</p>
            <p className="text-gray-600">Members</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-2xl font-bold text-gray-800">{communityStats.onlineNow}</p>
            <p className="text-gray-600">Online Now</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Users className="mx-auto text-indigo-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-800">{communityStats.activeGroups}</p>
            <p className="text-gray-600">Active Groups</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Calendar className="mx-auto text-indigo-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-800">{communityStats.eventsThisWeek}</p>
            <p className="text-gray-600">Events This Week</p>
          </div>
        </motion.div>
        
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden"
        >
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-300 ${activeTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          <div className="p-6">
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Users className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            <span className="text-indigo-600">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.target}</span>
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Popular Study Groups</h2>
                    <Link to="/community/groups" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {popularGroups.map((group) => (
                      <div key={group.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-800">{group.name}</h3>
                          {group.isJoined ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Joined
                            </span>
                          ) : (
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded-full transition-colors duration-300">
                              Join
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{group.category}</p>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Users size={16} />
                          <span className="text-sm">{group.members.toLocaleString()} members</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Other tabs would have their content here */}
            {activeTab !== 'overview' && (
              <div className="text-center py-12">
                <div className="inline-block bg-indigo-100 p-4 rounded-full mb-4">
                  {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || Users, { size: 32, className: "text-indigo-600" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Explore {tabs.find(tab => tab.id === activeTab)?.label}</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Dive deeper into our {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} section to connect with others and enhance your learning experience.
                </p>
                <Link 
                  to={`/community/${activeTab}`} 
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Go to {tabs.find(tab => tab.id === activeTab)?.label}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Find Study Buddies</h3>
            </div>
            <p className="text-gray-600 mb-4">Connect with learners who share similar goals and interests.</p>
            <Link 
              to="/community/buddies" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Buddies
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MessageCircle className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Join Discussions</h3>
            </div>
            <p className="text-gray-600 mb-4">Participate in topic-based discussions with the community.</p>
            <Link 
              to="/community/forums" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
            >
              Visit Forums
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Trophy className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">View Leaderboards</h3>
            </div>
            <p className="text-gray-600 mb-4">See how you rank against other learners in the community.</p>
            <Link 
              to="/community/leaderboards" 
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium"
            >
              Check Rankings
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudyCommunity;