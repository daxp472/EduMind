import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Shield, 
  User, 
  Palette, 
  Globe, 
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

const Settings = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    // Profile Settings
    notifications: {
      email: true,
      push: true,
      marketing: false,
      studyReminders: true,
      weeklyReports: true
    },
    // Privacy Settings
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analyticsOptOut: false
    },
    // Appearance Settings
    appearance: {
      theme: 'light',
      language: 'en',
      fontSize: 'medium'
    },
    // AI Settings
    ai: {
      personalizedRecommendations: true,
      adaptiveDifficulty: true,
      contentFiltering: 'moderate'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'ai', name: 'AI Preferences', icon: Database },
    { id: 'billing', name: 'Billing', icon: CreditCard }
  ];

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-lg text-gray-600">Manage your account preferences and configurations</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
            <div className="bg-white rounded-2xl shadow-lg">

              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Passionate learner exploring AI-enhanced education."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Change Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter new password"
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.email}
                          onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.push}
                          onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Study Reminders</h3>
                        <p className="text-sm text-gray-500">Get reminders for your study sessions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.studyReminders}
                          onChange={(e) => handleSettingChange('notifications', 'studyReminders', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Weekly Reports</h3>
                        <p className="text-sm text-gray-500">Receive weekly learning progress reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.weeklyReports}
                          onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Security */}
              {activeTab === 'privacy' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Data Sharing</h3>
                        <p className="text-sm text-gray-500">Allow anonymized data sharing for research</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.privacy.dataSharing}
                          onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <button
                          onClick={handleExportData}
                          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          <span>Export My Data</span>
                        </button>
                        
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleSettingChange('appearance', 'theme', 'light')}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                            settings.appearance.theme === 'light'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Sun className="h-5 w-5" />
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() => handleSettingChange('appearance', 'theme', 'dark')}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                            settings.appearance.theme === 'dark'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Moon className="h-5 w-5" />
                          <span>Dark</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.appearance.language}
                        onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                      </label>
                      <select
                        value={settings.appearance.fontSize}
                        onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Preferences */}
              {activeTab === 'ai' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Personalized Recommendations</h3>
                        <p className="text-sm text-gray-500">Allow AI to provide personalized content recommendations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.ai.personalizedRecommendations}
                          onChange={(e) => handleSettingChange('ai', 'personalizedRecommendations', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Adaptive Difficulty</h3>
                        <p className="text-sm text-gray-500">Automatically adjust content difficulty based on performance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.ai.adaptiveDifficulty}
                          onChange={(e) => handleSettingChange('ai', 'adaptiveDifficulty', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content Filtering
                      </label>
                      <select
                        value={settings.ai.contentFiltering}
                        onChange={(e) => handleSettingChange('ai', 'contentFiltering', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="strict">Strict</option>
                        <option value="moderate">Moderate</option>
                        <option value="relaxed">Relaxed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeTab === 'billing' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Plan: Student</h3>
                      <p className="text-gray-600 mb-4">$9.99/month • Renews on April 15, 2024</p>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Upgrade Plan
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                          Cancel Subscription
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-6 bg-blue-600 rounded"></div>
                          <span className="font-medium">•••• •••• •••• 4242</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">March 2024</p>
                            <p className="text-sm text-gray-500">Student Plan</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$9.99</p>
                            <button className="text-sm text-blue-600 hover:text-blue-700">Download</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">February 2024</p>
                            <p className="text-sm text-gray-500">Student Plan</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$9.99</p>
                            <button className="text-sm text-blue-600 hover:text-blue-700">Download</button>
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
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors mx-auto"
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