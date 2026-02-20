import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Shield,
  User,
  Palette,
  Database,
  CreditCard,
  LogOut,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

import { usePreferences } from '../context/PreferenceContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const { preferences, updatePreferences, loading } = usePreferences();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'ai', name: 'AI Preferences', icon: Database },
    { id: 'billing', name: 'Billing', icon: CreditCard }
  ];

  const handleSettingChange = (category: string, setting: string, value: any) => {
    updatePreferences({
      [category]: {
        ...(preferences as any)[category],
        [setting]: value
      }
    });
  };

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleExportData = () => {
    toast.success('Data export initiated. You will receive an email with your data within 24 hours.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion feature will be available soon.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-lg text-gray-400">Manage your account preferences and configurations</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl shadow-xl p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                      ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl shadow-xl">

              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.name || ''}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user?.email || ''}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white opacity-50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Passionate learner exploring AI-enhanced education."
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Change Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter new password"
                          className="w-full px-3 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-medium text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.notifications?.email}
                          onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-medium text-white">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.notifications?.push}
                          onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-medium text-white">Study Reminders</h3>
                        <p className="text-sm text-gray-500">Get reminders for your study sessions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.notifications?.studyReminders}
                          onChange={(e) => handleSettingChange('notifications', 'studyReminders', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-medium text-white">Weekly Reports</h3>
                        <p className="text-sm text-gray-500">Receive weekly learning progress reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.notifications?.weeklyReports}
                          onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Security */}
              {activeTab === 'privacy' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={preferences?.privacy?.profileVisibility}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                      >
                        <option value="public" className="bg-[#0a0a0a]">Public</option>
                        <option value="private" className="bg-[#0a0a0a]">Private</option>
                        <option value="friends" className="bg-[#0a0a0a]">Friends Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">Data Sharing</h3>
                        <p className="text-sm text-gray-500">Allow anonymized data sharing for research</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.privacy?.dataSharing}
                          onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <h3 className="text-lg font-medium text-white mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <button
                          onClick={handleExportData}
                          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          <span>Export My Data</span>
                        </button>

                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center space-x-2 px-6 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-medium hover:bg-red-600/20 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Theme
                      </label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleSettingChange('appearance', 'theme', 'light')}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${preferences?.appearance?.theme === 'light'
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-white/10 hover:border-white/20 text-gray-400'
                            }`}
                        >
                          <Sun className="h-5 w-5" />
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() => handleSettingChange('appearance', 'theme', 'dark')}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${preferences?.appearance?.theme === 'dark'
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                            : 'border-white/10 hover:border-white/20 text-gray-400'
                            }`}
                        >
                          <Moon className="h-5 w-5" />
                          <span>Dark</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Language
                      </label>
                      <select
                        value={preferences?.appearance?.language}
                        onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                      >
                        <option value="en" className="bg-[#0a0a0a]">English</option>
                        <option value="es" className="bg-[#0a0a0a]">Spanish</option>
                        <option value="fr" className="bg-[#0a0a0a]">French</option>
                        <option value="de" className="bg-[#0a0a0a]">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Font Size
                      </label>
                      <select
                        value={preferences?.appearance?.fontSize}
                        onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                      >
                        <option value="small" className="bg-[#0a0a0a]">Small</option>
                        <option value="medium" className="bg-[#0a0a0a]">Medium</option>
                        <option value="large" className="bg-[#0a0a0a]">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Preferences */}
              {activeTab === 'ai' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">AI Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-medium text-white">Personalized Recommendations</h3>
                        <p className="text-sm text-gray-500">Allow AI to provide personalized content recommendations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.ai?.personalizedRecommendations}
                          onChange={(e) => handleSettingChange('ai', 'personalizedRecommendations', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-medium text-white">Adaptive Difficulty</h3>
                        <p className="text-sm text-gray-500">Automatically adjust content difficulty based on performance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences?.ai?.adaptiveDifficulty}
                          onChange={(e) => handleSettingChange('ai', 'adaptiveDifficulty', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Content Filtering
                      </label>
                      <select
                        value={preferences?.ai?.contentFiltering}
                        onChange={(e) => handleSettingChange('ai', 'contentFiltering', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                      >
                        <option value="strict" className="bg-[#0a0a0a]">Strict</option>
                        <option value="moderate" className="bg-[#0a0a0a]">Moderate</option>
                        <option value="relaxed" className="bg-[#0a0a0a]">Relaxed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeTab === 'billing' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/5 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Current Plan: Student</h3>
                      <p className="text-gray-400 mb-4">$9.99/month • Renews on April 15, 2024</p>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          Upgrade Plan
                        </button>
                        <button className="px-4 py-2 border border-white/10 text-gray-400 rounded-lg hover:border-white/20 transition-colors">
                          Cancel Subscription
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <h3 className="text-lg font-medium text-white mb-4">Payment Method</h3>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-6 bg-indigo-600 rounded"></div>
                          <span className="font-medium text-white">•••• •••• •••• 4242</span>
                        </div>
                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                          <div>
                            <p className="font-medium text-white">March 2024</p>
                            <p className="text-sm text-gray-500">Student Plan</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">$9.99</p>
                            <button className="text-sm text-indigo-400 hover:text-indigo-300">Download</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-medium hover:bg-red-600/20 transition-colors mx-auto"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Settings;