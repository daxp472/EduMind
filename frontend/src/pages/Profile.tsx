import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Edit3, Camera, BookOpen, Target, Zap, Clock, Loader, GraduationCap, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { analyticsAPI, academicAPI, achievementsAPI, activityAPI, studySessionsAPI } from '../services/api';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'subscription'>('overview');

  const [profileData, setProfileData] = useState<UserProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Academic explorer leveraging AI to master complex concepts faster.',
    location: 'San Francisco, CA',
    institution: 'Stanford University',
    major: 'Computer Science',
    joinedDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Jan 2024'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [studyStats, setStudyStats] = useState<StudyStats | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('edumind_token');
        if (!token) throw new Error('Auth session expired');

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

        setProfileData(prev => ({
          ...prev,
          bio: academicResponse.data?.bio || prev.bio,
          location: academicResponse.data?.location || prev.location,
          institution: academicResponse.data?.institution || prev.institution,
          major: academicResponse.data?.major || prev.major
        }));
      } catch (err: unknown) {
        console.error(err instanceof Error ? err.message : 'Connection failed');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAllData();
  }, [user]);

  const planDetails = {
    guest: { name: 'Guest', color: 'text-zinc-400', bg: 'bg-zinc-400/10', limit: 5 },
    free: { name: 'Explorer', color: 'text-blue-400', bg: 'bg-blue-400/10', limit: 25 },
    student: { name: 'Scholar', color: 'text-emerald-400', bg: 'bg-emerald-400/10', limit: 1000 },
    pro: { name: 'Innovator', color: 'text-indigo-400', bg: 'bg-indigo-400/10', limit: 5000 },
    ultra: { name: 'Visionary', color: 'text-amber-400', bg: 'bg-amber-400/10', limit: 20000 }
  };

  const currentPlan = planDetails[(user?.subscriptionPlan as keyof typeof planDetails) || 'free'];

  const getUsagePercentage = () => {
    if (!user || !user.usageLimit) return 0;
    return Math.min(100, ((user.usageCount || 0) / user.usageLimit) * 100);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader className="h-10 w-10 text-indigo-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">

        {/* Profile Info Glass Card */}
        <section className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-[120px] -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-10 md:p-16 backdrop-blur-3xl flex flex-col lg:flex-row gap-12 items-center lg:items-start"
          >
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center text-4xl md:text-5xl font-black shadow-2xl overflow-hidden">
                {profileData.name.charAt(0)}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center border-4 border-zinc-900 group-hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl font-black tracking-tight">{profileData.name}</h1>
                <div className={`inline-flex self-center md:self-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${currentPlan.bg} ${currentPlan.color}`}>
                  {currentPlan.name} Tier
                </div>
              </div>
              <p className="text-zinc-400 text-lg mb-6 max-w-2xl">{profileData.bio}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-zinc-500 font-medium">
                <div className="flex items-center gap-2"><MapPin size={16} className="text-indigo-400" /> {profileData.location}</div>
                <div className="flex items-center gap-2"><GraduationCap size={16} className="text-indigo-400" /> {profileData.institution}</div>
                <div className="flex items-center gap-2"><Calendar size={16} className="text-indigo-400" /> Joined {profileData.joinedDate}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-8 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="px-8 py-3 bg-zinc-800 text-white rounded-xl font-bold text-sm hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <Zap size={16} className="text-indigo-400" /> Upgrade
              </button>
            </div>
          </motion.div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex space-x-8 mb-10 border-b border-white/5">
          {['overview', 'academic', 'subscription'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">

            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                {/* AI Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Summaries', value: analyticsData?.learning?.toolUsage?.summarizer || 142, icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
                    { label: 'Quizzes', value: analyticsData?.learning?.toolUsage?.['quiz-generator'] || 58, icon: Target, color: 'from-purple-500 to-pink-600' },
                    { label: 'Study Hours', value: studyStats?.totalHours || 24.5, icon: Clock, color: 'from-emerald-500 to-teal-600' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                        <stat.icon size={20} className="text-white" />
                      </div>
                      <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Achievement Grid */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Star className="text-amber-400" /> Mastery Progress
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.length > 0 ? achievements.map((ach, i) => (
                      <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-zinc-900 transition-colors">
                        <div className="text-3xl filter grayscale opacity-50 contrast-125">{ach.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm tracking-tight">{ach.title}</h4>
                          <p className="text-[10px] text-zinc-500">{ach.description}</p>
                        </div>
                        <div className="text-[10px] font-black text-indigo-400">+{ach.points} XP</div>
                      </div>
                    )) : (
                      <div className="md:col-span-2 py-10 border border-dashed border-zinc-800 rounded-3xl text-center text-zinc-600">
                        No achievements unlocked yet. Time to study!
                      </div>
                    )}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'academic' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Institution</label>
                    <p className="text-xl font-bold">{profileData.institution}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Major</label>
                    <p className="text-xl font-bold">{profileData.major}</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Academic Bio</label>
                    <p className="text-zinc-300 leading-relaxed italic border-l-2 border-indigo-500 pl-4">{profileData.bio}</p>
                  </div>
                </div>
                <button className="text-indigo-400 text-xs font-bold hover:underline">Verify Student Credentials →</button>
              </motion.div>
            )}

            {activeTab === 'subscription' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                      <h2 className="text-3xl font-black mb-2">{currentPlan.name} Plan</h2>
                      <p className="text-indigo-100 text-sm opacity-80 max-w-xs">You're currently on our most popular student tier. Upgrade to unlock custom AI model fine-tuning.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                      <p className="text-2xl font-black">Active</p>
                    </div>
                  </div>
                  <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-10">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-xl font-bold">Monthly Quota</h3>
                      <p className="text-zinc-500 text-xs uppercase font-black tracking-widest mt-1">Resets in 14 days</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black">{user?.usageCount || 0}</span>
                      <span className="text-zinc-500 text-sm font-bold ml-1">/ {user?.usageLimit || currentPlan.limit}</span>
                    </div>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-4 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getUsagePercentage()}%` }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Unlimited Summaries', '24/7 AI Tutor', 'Early Beta access', 'Cloud Sync'].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full" /> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar: Activity & Settings */}
          <div className="space-y-10">
            <section className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8">
              <h2 className="text-xl font-bold mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3"><Clock size={20} className="text-indigo-400" /> Feed</div>
                <button className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-tighter">Clear</button>
              </h2>
              <div className="space-y-8">
                {recentActivity.length > 0 ? recentActivity.slice(0, 5).map((act, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className={`w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0`}>
                      <Zap size={14} className="text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-zinc-200 truncate">{act.title}</h4>
                      <p className="text-[10px] font-medium text-zinc-500 mt-1">{new Date(act.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 opacity-20">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase">Silent Mode</p>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8">
              <h2 className="text-xl font-bold mb-6">Quick Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Public Profile', enabled: true },
                  { label: 'Weekly Reports', enabled: true },
                  { label: 'Sound Effects', enabled: false }
                ].map((opt, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                    <span className="text-xs font-bold text-zinc-400">{opt.label}</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${opt.enabled ? 'bg-indigo-600' : 'bg-zinc-800'}`}>
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${opt.enabled ? 'left-6' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all">
                Sign Out
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
