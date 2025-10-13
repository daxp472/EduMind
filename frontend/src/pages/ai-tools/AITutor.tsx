import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Lightbulb, BookOpen, Calculator, Globe, Mic, Image, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI tutor. I'm here to help you learn anything you'd like. What subject would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('general');
  const messagesEndRef = useRef(null);

  const subjects = [
    { id: 'general', name: 'General', icon: Lightbulb, color: 'from-blue-500 to-blue-600' },
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'from-green-500 to-green-600' },
    { id: 'science', name: 'Science', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { id: 'language', name: 'Languages', icon: Globe, color: 'from-orange-500 to-orange-600' }
  ];

  const quickQuestions = [
    "Explain quantum physics in simple terms",
    "Help me solve this math problem",
    "What's the difference between DNA and RNA?",
    "How do I improve my writing skills?",
    "Explain the causes of World War I",
    "What is machine learning?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const responses = {
      math: "I'd be happy to help you with mathematics! Could you share the specific problem or concept you're working on? I can break it down step by step and explain the underlying principles.",
      science: "Science is fascinating! Whether it's physics, chemistry, biology, or earth science, I can help explain concepts, discuss experiments, or clarify any questions you have.",
      language: "Language learning is a wonderful journey! I can help with grammar, vocabulary, pronunciation tips, or even practice conversations. Which language are you interested in?",
      general: "That's a great question! Let me break this down for you in a way that's easy to understand. I'll provide examples and explain the key concepts step by step."
    };

    // Simple keyword matching for demo
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('math') || lowerMessage.includes('calculate') || lowerMessage.includes('solve')) {
      return responses.math;
    } else if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry')) {
      return responses.science;
    } else if (lowerMessage.includes('language') || lowerMessage.includes('grammar') || lowerMessage.includes('translate')) {
      return responses.language;
    } else {
      return responses.general;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = {
      id: Date.now() + 1,
      type: 'ai',
      content: generateAIResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Personal Tutor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized help with any subject, 24/7. Your AI tutor adapts to your learning style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            
            {/* Subject Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Subject</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                      selectedSubject === subject.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className={`p-2 bg-gradient-to-r ${subject.color} rounded-lg`}>
                      <subject.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Questions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Capabilities</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Speed</span>
                  <span className="font-semibold text-green-600">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subjects</span>
                  <span className="font-semibold text-blue-600">100+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-semibold text-purple-600">50+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-semibold text-orange-600">24/7</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl h-[600px] flex flex-col">
              
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Tutor</h3>
                    <p className="text-sm text-green-600">● Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`p-2 rounded-full ${
                        message.type === 'user' 
                          ? 'bg-blue-100' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Image className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Mic className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your studies..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="1"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AITutor;