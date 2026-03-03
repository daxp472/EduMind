import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Lightbulb,
  Calculator, Globe, Sparkles,
  Brain, Zap, Target
} from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import SummarySelector from '../../components/ai/SummarySelector';

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Neural link established. I am your specialized Tutor Core. Which knowledge sector shall we explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [context, setContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { id: 'general', name: 'General', icon: Lightbulb, color: 'indigo' },
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'blue' },
    { id: 'science', name: 'Science', icon: Brain, color: 'purple' },
    { id: 'language', name: 'Languages', icon: Globe, color: 'emerald' }
  ];

  const quickQuestions = [
    "Explain quantum physics simply",
    "Help me with calculus fundamentals",
    "DNA vs RNA key differences",
    "Neural network architecture basics",
    "Analysis of 18th century literature",
    "Explain the theory of relativity"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textOverride) setInputMessage('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('edumind_token') || '';
      const response = await aiAPI.askTutor({
        message: textToSend,
        context: context // Inject summary context if selected
      }, token);

      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.answer || response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error: any) {
      if (error.message.includes('QUOTA_EXCEEDED')) {
        toast.error(error.message.replace('QUOTA_EXCEEDED: ', ''));
      } else {
        toast.error(error.message || 'Transmission failed. Re-link required.');
      }

      // Remove the user message if it failed so they can try again? 
      // Or just keep it and let them try again.
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSummarySelect = (selectedContent: string) => {
    setContext(selectedContent);
    toast.success('Context injected into Neural Link');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-inter">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Bot className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="text-sm font-bold tracking-widest text-indigo-500 uppercase">Personal AI Core</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Neural <span className="text-indigo-500">Tutor</span>
            </h1>
          </motion.div>

          {/* Memory Vault Context Selector */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Active Context</p>
              <p className="text-xs font-bold text-white">{context ? 'Summary Loaded' : 'Pure AI Logic'}</p>
            </div>
            <SummarySelector onSelect={handleSummarySelect} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[700px]">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6 hidden lg:flex flex-col h-full"
          >
            {/* Subject Selection */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex-grow overflow-y-auto custom-scrollbar">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Subject Matrix</h3>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all border ${selectedSubject === subject.id
                      ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/5 hover:border-white/10'
                      }`}
                  >
                    <div className={`p-2 rounded-lg bg-${subject.color}-500/10`}>
                      <subject.icon className={`h-4 w-4 text-${subject.color}-500`} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">{subject.name}</span>
                  </button>
                ))}
              </div>

              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-10 mb-6">Quick Linkage</h3>
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="group flex items-center text-left p-3 text-[10px] font-bold text-zinc-500 bg-white/[0.01] hover:bg-indigo-500/10 hover:text-white rounded-xl transition-all border border-white/5"
                  >
                    <Zap className="h-3 w-3 mr-2 text-indigo-500/50 group-hover:text-amber-500" />
                    <span className="line-clamp-1">{question}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Status */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">Active Core</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center opacity-80">
                  <span className="text-[10px] uppercase font-black tracking-widest">Speed</span>
                  <span className="text-[10px] uppercase font-black">Ultra</span>
                </div>
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-1/2 bg-white h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 h-full"
          >
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] h-full flex flex-col overflow-hidden backdrop-blur-3xl shadow-2xl relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -z-10" />

              {/* Chat Header */}
              <div className="px-8 py-6 border-b border-white/5 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="p-3 bg-indigo-500/10 rounded-2xl relative">
                        <Bot className="h-6 w-6 text-indigo-500" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-[#090909] rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Neural Core v2.0</h3>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
                        <Target className="h-2.5 w-2.5 mr-1 text-green-500" />
                        Synchronized
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 md:space-x-8">
                    <div className="text-center hidden md:block">
                      <p className="text-lg font-black italic tracking-tighter text-white">0.4s</p>
                      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Latency</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar pr-2">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-4 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                        <div className={`mt-1 p-2 rounded-xl transition-all ${message.type === 'user'
                          ? 'bg-zinc-800'
                          : 'bg-indigo-500/20'
                          }`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-zinc-400" />
                          ) : (
                            <Bot className="h-4 w-4 text-indigo-500" />
                          )}
                        </div>
                        <div className={`p-5 rounded-3xl relative ${message.type === 'user'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 rounded-tr-none'
                          : 'bg-white/5 text-zinc-200 border border-white/5 rounded-tl-none'
                          }`}>
                          <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{message.content}</p>
                          <div className={`flex items-center mt-3 space-x-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}>
                            <span className={`text-[10px] font-black uppercase tracking-tighter ${message.type === 'user' ? 'text-indigo-200' : 'text-zinc-600'
                              }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {!message.type === 'user' && (
                              <Zap className="h-2 w-2 text-indigo-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-indigo-500/20 rounded-xl">
                        <Bot className="h-4 w-4 text-indigo-500" />
                      </div>
                      <div className="bg-white/5 p-4 py-3 rounded-2xl border border-white/5 rounded-tl-none">
                        <div className="flex space-x-1.5 pt-1">
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-500/60 rounded-full" />
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500/30 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="px-8 pb-8 pt-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-10 group-focus-within:opacity-25 transition-opacity duration-500" />
                  <div className="relative bg-black/40 border-2 border-white/5 rounded-[28px] p-2 flex items-center focus-within:border-indigo-500/30 transition-all group">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Transmit study inquiry to core..."
                      className="flex-1 bg-transparent px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none resize-none min-h-[56px] font-medium"
                      rows={1}
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping}
                      className={`p-4 bg-indigo-500 text-white rounded-2xl shadow-lg transition-all ${!inputMessage.trim() || isTyping ? 'opacity-30 scale-95' : 'hover:scale-105 active:scale-95 group-hover:shadow-indigo-500/40'
                        }`}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 flex items-center">
                    <Sparkles className="h-3 w-3 mr-2 text-indigo-500/50" />
                    Neural Transmission protocol v2.8 (Full Duplex)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AITutor;