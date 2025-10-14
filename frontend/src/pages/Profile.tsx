import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, MapPin, CreditCard as Edit3, Camera, Award, BookOpen, Target, Zap, Clock, Loader, GraduationCap, TrendingUp, UserCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { analyticsAPI, academicAPI, achievementsAPI, activityAPI, studySessionsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define types for our data
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  earnedAt: string;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

interface StudyStats {
  totalHours: number;
  totalSessions: number;
  averageProductivity: number;
  subjectStats: Record<string, { hours: number; sessions: number }>;
}

interface AnalyticsData {
  learning: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    successRate: number;
    toolUsage: Record<string, number>;
    studyMaterials: number;
  };
  progress: {
    dailyUsage: Record<string, number>;
    studyMaterials: Array<{
      id: string;
      title: string;
      type: string;
      subject: string;
      createdAt: string;
    }>;
  };
  performance: {
    averageProcessingTime: number;
    averageTokens: number;
    mostUsedTool: string;
    totalToolsUsed: number;
  };
}

interface UserProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  institution: string;
  major: string;
  joinedDate: string;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate learner exploring the frontiers of AI-enhanced education.',
    location: 'San Francisco, CA',
    institution: 'University of California, Berkeley',
    major: 'Computer Science',
    joinedDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'January 2024'
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [studyStats, setStudyStats] = useState<StudyStats | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Student verification state - now handled in separate page

  // Fetch all user data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('edumind_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch all data in parallel
        const [
          academicResponse,
          achievementsResponse,
          activityResponse,
          studyStatsResponse,
          learningAnalyticsResponse,
          progressReportsResponse,
          performanceInsightsResponse
        ] = await Promise.all([
          academicAPI.getAcademicInfo(token),
          achievementsAPI.getAchievements(token),
          activityAPI.getRecentActivity(token),
          studySessionsAPI.getStudyStats(token),
          analyticsAPI.getLearningAnalytics(token),
          analyticsAPI.getProgressReports(token),
          analyticsAPI.getPerformanceInsights(token)
        ]);

        setAchievements(achievementsResponse.data);
        setRecentActivity(activityResponse.data);
        setStudyStats(studyStatsResponse.data);
        setAnalyticsData({
          learning: learningAnalyticsResponse.data,
          progress: progressReportsResponse.data,
          performance: performanceInsightsResponse.data
        });

        // Update profile data with academic info
        setProfileData(prev => ({
          ...prev,
          bio: academicResponse.data?.bio || prev.bio,
          location: academicResponse.data?.location || prev.location,
          institution: academicResponse.data?.institution || prev.institution,
          major: academicResponse.data?.major || prev.major
        }));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAllData();
    }
  }, [user]);

  const planDetails = {
    guest: { name: 'Guest', color: 'gray', limit: user?.usageLimit || 5, features: ['Basic AI tools', 'Limited usage'] },
    free: { name: 'Free', color: 'blue', limit: user?.usageLimit || 100, features: ['All AI tools', 'Basic analytics', 'Community access'] },
    student: { name: 'Student', color: 'green', limit: user?.usageLimit || 1000, features: ['All Free features', 'Higher limits', 'Priority support'] },
    pro: { name: 'Pro', color: 'purple', limit: user?.usageLimit || 5000, features: ['All Student features', 'Advanced analytics', 'Custom models'] },
    ultra: { name: 'Ultra', color: 'gold', limit: user?.usageLimit || 20000, features: ['All Pro features', 'Unlimited access', 'Dedicated support'] }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('edumind_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Update academic information
      const academicData = {
        bio: profileData.bio,
        location: profileData.location,
        institution: profileData.institution,
        major: profileData.major
      };

      await academicAPI.updateAcademicInfo(academicData, token);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const getPlanColor = (plan: string | undefined) => {
    switch (plan) {
      case 'guest': return 'bg-gray-500';
      case 'free': return 'bg-blue-500';
      case 'student': return 'bg-green-500';
      case 'pro': return 'bg-purple-500';
      case 'ultra': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getUsagePercentage = () => {
    if (!user || user.usageCount === undefined || user.usageLimit === undefined) return 0;
    return Math.min(100, (user.usageCount / user.usageLimit) * 100);
  };

  // Calculate stats from analytics data
  const calculateStats = () => {
    if (!analyticsData) return [];
    
    return [
      {
        icon: BookOpen,
        label: 'Notes Summarized',
        value: analyticsData.learning?.toolUsage?.summarizer || 0,
        color: 'from-blue-500 to-blue-600'
      },
      {
        icon: Target,
        label: 'Quizzes Generated',
        value: analyticsData.learning?.toolUsage?.['quiz-generator'] || 0,
        color: 'from-green-500 to-green-600'
      },
      {
        icon: Clock,
        label: 'Study Hours',
        value: studyStats?.totalHours || 0,
        color: 'from-purple-500 to-purple-600'
      },
      {
        icon: Award,
        label: 'Achievements',
        value: achievements.length,
        color: 'from-orange-500 to-orange-600'
      }
    ];
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors group-hover:scale-110 transform">
                <Camera className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                  />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                  />
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={2}
                    className="text-gray-600 bg-transparent border-2 border-gray-300 focus:border-blue-500 outline-none w-full p-2 rounded"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPlanColor(user?.subscriptionPlan)}`}>
                      {planDetails[user?.subscriptionPlan as keyof typeof planDetails]?.name || 'Free'} Plan
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{profileData.bio}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profileData.joinedDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Upgrade Plan</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Usage Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Usage Analytics</h2>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">
                {user?.usageCount || 0} / {user?.usageLimit || 0} requests used
              </span>
            </div>
          </div>

          {/* Usage Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Monthly Usage</span>
              <span>Resets on {user?.resetUsageAt ? new Date(user.resetUsageAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getUsagePercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Current Plan</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${getPlanColor(user?.subscriptionPlan)}`}></div>
                  <span className="font-bold text-lg">
                    {planDetails[user?.subscriptionPlan as keyof typeof planDetails]?.name || 'Free'} Plan
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {planDetails[user?.subscriptionPlan as keyof typeof planDetails]?.features.join(', ')}
                </p>
                <div className="text-sm">
                  <span className="font-medium">Usage Limit:</span> {user?.usageLimit || 0} requests/month
                </div>
                
                {/* Student Verification Status */}
                {user?.subscriptionPlan !== 'student' && user?.studentVerificationStatus && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Student Verification</h4>
                    <div className="flex items-center space-x-2">
                      {user.studentVerificationStatus === 'pending' && (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="text-yellow-700">Verification Pending</span>
                        </>
                      )}
                      {user.studentVerificationStatus === 'approved' && (
                        <>
                          <UserCheck className="h-4 w-4 text-green-500" />
                          <span className="text-green-700">Verified Student</span>
                        </>
                      )}
                      {user.studentVerificationStatus === 'rejected' && (
                        <>
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-red-700">Verification Rejected</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">AI Request Distribution</h3>
              <div className="space-y-3">
                {analyticsData?.learning?.toolUsage ? (
                  Object.entries(analyticsData.learning.toolUsage).map(([tool, count], index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">{tool.replace('-', ' ')}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No AI requests yet</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Student Verification Section (Only for non-student users) */}
        {user?.subscriptionPlan !== 'student' && user?.subscriptionPlan !== 'pro' && user?.subscriptionPlan !== 'ultra' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <UserCheck className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Student Verification</h2>
            </div>
            
            {user?.studentVerificationRequestedAt ? (
              user?.studentVerificationStatus === 'pending' ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-800">Verification Pending</h3>
                  </div>
                  <p className="text-yellow-700 mb-4">
                    Your student verification is currently under review. Admin will review your request and approve or reject it soon.
                  </p>
                  <p className="text-sm text-yellow-600">
                    Request submitted on: {user.studentVerificationRequestedAt ? new Date(user.studentVerificationRequestedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ) : user?.studentVerificationStatus === 'approved' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Student Verified</h3>
                  </div>
                  <p className="text-green-700">
                    Your student verification has been approved! You now have access to the Student plan features.
                  </p>
                </div>
              ) : user?.studentVerificationStatus === 'rejected' ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <X className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold text-red-800">Verification Rejected</h3>
                  </div>
                  <p className="text-red-700 mb-4">
                    Your student verification request was rejected. Please try again with clearer images.
                  </p>
                  <button
                    onClick={() => navigate('/student-verification')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : null
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  Upgrade to the Student plan by verifying your student status. Get 6 months of free access!
                </p>
                <button
                  onClick={() => navigate('/student-verification')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center mx-auto"
                >
                  <UserCheck className="h-5 w-5 mr-2" />
                  Apply for Student Verification
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <TrendingUp className="h-4 w-4" />
                <span>{achievements.length} earned</span>
              </div>
            </div>
            <div className="space-y-4">
              {achievements.slice(0, 4).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-colors">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(achievement.earnedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-gray-500 text-center py-4">No achievements yet. Keep learning to earn badges!</p>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Last 50 activities</span>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivity.slice(0, 4).map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'summary_created' ? 'bg-blue-100' :
                    activity.type === 'quiz_completed' ? 'bg-green-100' :
                    activity.type === 'note_added' ? 'bg-purple-100' :
                    activity.type === 'achievement_earned' ? 'bg-yellow-100' :
                    activity.type === 'study_session' ? 'bg-indigo-100' :
                    activity.type === 'ai_tool_used' ? 'bg-pink-100' :
                    'bg-orange-100'
                  }`}>
                    {activity.type === 'summary_created' && <BookOpen className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'quiz_completed' && <Target className="h-4 w-4 text-green-600" />}
                    {activity.type === 'note_added' && <Edit3 className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'achievement_earned' && <Award className="h-4 w-4 text-yellow-600" />}
                    {activity.type === 'study_session' && <Clock className="h-4 w-4 text-indigo-600" />}
                    {activity.type === 'ai_tool_used' && <Zap className="h-4 w-4 text-pink-600" />}
                    {activity.type === 'login' && <Mail className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-gray-500 text-center py-4">No recent activity. Start using the platform to see your activity here!</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mt-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
              {isEditing ? (
                <input
                  type="text"
                  name="institution"
                  value={profileData.institution}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.institution || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major/Field of Study</label>
              {isEditing ? (
                <input
                  type="text"
                  name="major"
                  value={profileData.major}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.major || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.location || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
              <p className="text-gray-900 py-2">{profileData.joinedDate}</p>
            </div>
          </div>
          
          {/* Study Stats */}
          <div className="mt-8">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Study Statistics</h2>
            </div>
            
            {studyStats && (studyStats.totalHours > 0 || studyStats.totalSessions > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Total Study Time</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{studyStats.totalHours.toFixed(1)} hours</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Study Sessions</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{studyStats.totalSessions}</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Productivity</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{studyStats.averageProductivity.toFixed(1)}%</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No study data yet. Start studying to track your progress!</p>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;