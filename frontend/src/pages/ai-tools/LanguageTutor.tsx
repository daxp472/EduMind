import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageSquare, Volume2, Mic, BookOpen, Award, Target, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const LanguageTutor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [userLevel, setUserLevel] = useState('beginner');
  const [activeTab, setActiveTab] = useState('lessons');

  const languages = [
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸', learners: '2.1M' },
    { id: 'french', name: 'French', flag: '🇫🇷', learners: '1.8M' },
    { id: 'german', name: 'German', flag: '🇩🇪', learners: '1.2M' },
    { id: 'italian', name: 'Italian', flag: '🇮🇹', learners: '890K' },
    { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹', learners: '750K' },
    { id: 'japanese', name: 'Japanese', flag: '🇯🇵', learners: '1.5M' }
  ];

  const lessons = {
    spanish: [
      {
        id: 1,
        title: 'Basic Greetings',
        level: 'beginner',
        duration: '15 min',
        progress: 100,
        phrases: [
          { spanish: 'Hola', english: 'Hello', pronunciation: 'OH-lah' },
          { spanish: '¿Cómo estás?', english: 'How are you?', pronunciation: 'KOH-moh ehs-TAHS' },
          { spanish: 'Muy bien, gracias', english: 'Very well, thank you', pronunciation: 'mwee bee-EHN GRAH-see-ahs' }
        ]
      },
      {
        id: 2,
        title: 'Numbers 1-20',
        level: 'beginner',
        duration: '20 min',
        progress: 75,
        phrases: [
          { spanish: 'Uno', english: 'One', pronunciation: 'OO-noh' },
          { spanish: 'Dos', english: 'Two', pronunciation: 'dohs' },
          { spanish: 'Tres', english: 'Three', pronunciation: 'trehs' }
        ]
      },
      {
        id: 3,
        title: 'Family Members',
        level: 'beginner',
        duration: '25 min',
        progress: 30,
        phrases: [
          { spanish: 'Familia', english: 'Family', pronunciation: 'fah-MEE-lee-ah' },
          { spanish: 'Madre', english: 'Mother', pronunciation: 'MAH-dreh' },
          { spanish: 'Padre', english: 'Father', pronunciation: 'PAH-dreh' }
        ]
      }
    ]
  };

  const achievements = [
    { title: 'First Steps', description: 'Completed your first lesson', earned: true, icon: '🎯' },
    { title: 'Streak Master', description: '7-day learning streak', earned: true, icon: '🔥' },
    { title: 'Pronunciation Pro', description: 'Perfect pronunciation score', earned: false, icon: '🎤' },
    { title: 'Grammar Guru', description: 'Mastered basic grammar', earned: false, icon: '📚' }
  ];

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    toast.success(`Starting lesson: ${lesson.title}`);
  };

  const playPronunciation = (text) => {
    toast.success(`Playing pronunciation: ${text}`);
  };

  const practiceConversation = () => {
    toast.success('Starting AI conversation practice!');
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
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Language Tutor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn languages naturally with AI-powered conversations, pronunciation feedback, and personalized lessons
          </p>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Language</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedLanguage === language.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{language.flag}</div>
                <div className="font-semibold">{language.name}</div>
                <div className="text-xs text-gray-500">{language.learners} learners</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Level Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setUserLevel(level)}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  userLevel === level
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="font-semibold text-lg capitalize mb-2">{level}</div>
                <div className="text-sm text-gray-600">
                  {level === 'beginner' && 'Start from the basics'}
                  {level === 'intermediate' && 'Build on existing knowledge'}
                  {level === 'advanced' && 'Perfect your fluency'}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              {['lessons', 'conversation', 'progress'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Tab */}
          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lessons List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {languages.find(l => l.id === selectedLanguage)?.name} Lessons
                  </h3>
                  <div className="space-y-4">
                    {lessons[selectedLanguage]?.map((lesson) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{lesson.duration}</span>
                              <span className="capitalize">{lesson.level}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => startLesson(lesson)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Start
                          </button>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{lesson.progress}% complete</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Lesson */}
              <div>
                {currentLesson ? (
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{currentLesson.title}</h3>
                    <div className="space-y-4">
                      {currentLesson.phrases.map((phrase, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-lg">{phrase.spanish}</span>
                            <button
                              onClick={() => playPronunciation(phrase.spanish)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-gray-700 mb-1">{phrase.english}</div>
                          <div className="text-sm text-gray-500 italic">{phrase.pronunciation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select a Lesson
                    </h3>
                    <p className="text-gray-600">
                      Choose a lesson from the list to start learning
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Conversation Tab */}
          {activeTab === 'conversation' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <MessageSquare className="h-16 w-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI Conversation Practice
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Practice real conversations with our AI tutor. Get instant feedback on pronunciation and grammar.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <Mic className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Voice Practice</h4>
                    <p className="text-sm text-gray-600">Practice pronunciation with AI feedback</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl">
                    <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Text Chat</h4>
                    <p className="text-sm text-gray-600">Chat with AI in your target language</p>
                  </div>
                </div>
                <button
                  onClick={practiceConversation}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  Start Conversation
                </button>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Overall Progress</span>
                      <span className="text-blue-600 font-semibold">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <div className="text-sm text-gray-600">Lessons Completed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">7</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl ${
                      achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}>
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Award className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default LanguageTutor;