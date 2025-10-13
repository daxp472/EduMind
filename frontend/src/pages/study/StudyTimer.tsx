import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, RotateCcw, Settings, Coffee, BookOpen, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('study'); // 'study', 'shortBreak', 'longBreak'
  const [session, setSession] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [settings, setSettings] = useState({
    studyTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4,
    autoStartBreaks: true,
    notifications: true
  });

  const modes = {
    study: { duration: settings.studyTime * 60, label: 'Study Time', color: 'from-blue-500 to-blue-600', icon: BookOpen },
    shortBreak: { duration: settings.shortBreak * 60, label: 'Short Break', color: 'from-green-500 to-green-600', icon: Coffee },
    longBreak: { duration: settings.longBreak * 60, label: 'Long Break', color: 'from-purple-500 to-purple-600', icon: Coffee }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === 'study') {
      setTotalSessions(prev => prev + 1);
      const nextSession = session + 1;
      
      if (nextSession % settings.sessionsUntilLongBreak === 0) {
        setMode('longBreak');
        setTimeLeft(modes.longBreak.duration);
        toast.success('Great work! Time for a long break!');
      } else {
        setMode('shortBreak');
        setTimeLeft(modes.shortBreak.duration);
        toast.success('Study session complete! Take a short break.');
      }
      setSession(nextSession);
    } else {
      setMode('study');
      setTimeLeft(modes.study.duration);
      toast.success('Break time over! Ready for another study session?');
    }

    if (settings.autoStartBreaks && mode === 'study') {
      setTimeout(() => setIsRunning(true), 1000);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  };

  const customTimers = [
    { name: 'Quick Focus', duration: 15, icon: Target },
    { name: 'Deep Work', duration: 90, icon: BookOpen },
    { name: 'Review Session', duration: 30, icon: Clock },
    { name: 'Break Time', duration: 10, icon: Coffee }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Timer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Boost your productivity with Pomodoro technique and custom study timers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Mode Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-2xl p-2">
                  {Object.entries(modes).map(([key, modeData]) => (
                    <button
                      key={key}
                      onClick={() => switchMode(key)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        mode === key
                          ? `bg-gradient-to-r ${modeData.color} text-white`
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {modeData.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="relative w-80 h-80 mx-auto mb-8">
                  <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - getProgress() / 100)}`}
                      className={`${mode === 'study' ? 'text-blue-500' : mode === 'shortBreak' ? 'text-green-500' : 'text-purple-500'} transition-all duration-1000`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-900 mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-lg text-gray-600">
                        Session {session}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleTimer}
                    className={`flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${modes[mode].color} text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105`}
                  >
                    {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    <span>{isRunning ? 'Pause' : 'Start'}</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className="flex items-center space-x-2 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Reset</span>
                  </button>
                </div>
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
            
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sessions Completed</span>
                  <span className="font-bold text-blue-600">{totalSessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Focus Time</span>
                  <span className="font-bold text-green-600">{totalSessions * settings.studyTime}m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Session</span>
                  <span className="font-bold text-purple-600">{session}</span>
                </div>
              </div>
            </div>

            {/* Custom Timers */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Timers</h3>
              <div className="space-y-3">
                {customTimers.map((timer, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMode('study');
                      setTimeLeft(timer.duration * 60);
                      setIsRunning(false);
                      toast.success(`${timer.name} timer set for ${timer.duration} minutes`);
                    }}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                  >
                    <timer.icon className="h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{timer.name}</div>
                      <div className="text-sm text-gray-500">{timer.duration} minutes</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-900">Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Study Time: {settings.studyTime}m
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={settings.studyTime}
                    onChange={(e) => setSettings(prev => ({ ...prev, studyTime: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Break: {settings.shortBreak}m
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={settings.shortBreak}
                    onChange={(e) => setSettings(prev => ({ ...prev, shortBreak: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Long Break: {settings.longBreak}m
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="30"
                    value={settings.longBreak}
                    onChange={(e) => setSettings(prev => ({ ...prev, longBreak: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoStart"
                    checked={settings.autoStartBreaks}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoStartBreaks: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoStart" className="ml-2 block text-sm text-gray-700">
                    Auto-start breaks
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default StudyTimer;