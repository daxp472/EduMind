import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Sparkles, Copy, Download, Check,
  Target, BookOpen, Clock, Trash2, ChevronRight, AlertCircle,
  FileSearch, Layout, Presentation
} from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AISummarizer = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [summaryType, setSummaryType] = useState('general');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [aiService, setAiService] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('edumind_token');
      if (!token) return;
      setIsLoadingHistory(true);
      const res = await aiAPI.getHistory(token, 'summarizer');
      if (res.success) {
        setHistory(res.data);
      }
    } catch (err) {
      console.error('History fetch failed', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!inputText.trim() && !file) return;

    setIsGenerating(true);
    setSummary('');
    setAiService('');

    try {
      const token = localStorage.getItem('edumind_token') || '';
      let response;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', summaryType);
        formData.append('length', summaryLength);
        if (inputText.trim()) formData.append('text', inputText);
        response = await aiAPI.summarizeText(formData, token);
      } else {
        response = await aiAPI.summarizeText(
          { text: inputText, type: summaryType, length: summaryLength },
          token
        );
      }

      setSummary(response.data.summary);
      setAiService(response.data.aiService || '');
      toast.success('Summary generated!');
      fetchHistory(); // Refresh history
    } catch (error: any) {
      const isQuotaError = error.message.includes('429') || error.message.includes('Quota');
      if (isQuotaError) {
        toast.error('API Quota Reached. Please wait or upgrade.');
      } else {
        toast.error(error.message || 'Failed to generate summary');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard');
  };

  const handleDownloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `edumind-summary-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const selectFromHistory = (item: any) => {
    setSummary(item.output);
    setAiService(item.aiService);
    setShowHistory(false);
    toast.success('Loaded from history');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-inter">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20 relative">

        {/* Header Action Row */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="text-sm font-bold tracking-widest text-indigo-500 uppercase">AI Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Neural <span className="text-indigo-500">Summarizer</span>
            </h1>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all font-bold text-sm uppercase tracking-widest"
          >
            <Clock className="h-4 w-4" />
            <span>Vault</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/50 backdrop-blur-3xl rounded-[32px] p-8 border border-white/5 relative overflow-hidden group shadow-2xl shadow-indigo-500/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-xl font-bold flex items-center italic">
                <FileSearch className="h-5 w-5 mr-3 text-indigo-500" />
                Ingestion Matrix
              </h2>
              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-6 relative z-10">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-zinc-700 resize-none text-sm leading-relaxed"
                placeholder="Paste documentation, research papers, or project briefs here..."
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Synthesis Type</label>
                  <div className="relative">
                    <Layout className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500/50" />
                    <select
                      value={summaryType}
                      onChange={(e) => setSummaryType(e.target.value)}
                      className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-bold"
                    >
                      <option value="general">General</option>
                      <option value="academic">Academic</option>
                      <option value="bullet-points">Neural Nodes</option>
                      <option value="executive">Executive</option>
                      <option value="presentation">Deck Format</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Density</label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-bold"
                  >
                    <option value="short">Concise</option>
                    <option value="medium">Balanced</option>
                    <option value="long">Deep Analysis</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  accept=".txt,.pdf,.doc,.docx,image/*"
                />
                <div className={`flex items-center justify-center px-6 py-10 border-2 border-dashed rounded-[20px] transition-all group/upload ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                  <div className="text-center">
                    <Upload className={`h-10 w-10 mx-auto mb-4 transition-colors ${file ? 'text-indigo-500' : 'text-zinc-600 group-hover/upload:text-indigo-500'}`} />
                    <span className={`block font-bold text-sm ${file ? 'text-indigo-400' : 'text-zinc-500'}`}>
                      {file ? file.name : 'Drop intelligence packet here'}
                    </span>
                    <span className="text-[10px] text-zinc-600 mt-2 block tracking-[0.2em] uppercase font-black">PDF / DOCX / JPG</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={isGenerating || (!inputText.trim() && !file)}
                className="w-full relative group/btn overflow-hidden rounded-2xl h-16"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                <div className="absolute inset-[2px] bg-zinc-900 group-hover:bg-transparent transition-colors rounded-[14px] flex items-center justify-center font-black uppercase tracking-[0.2em] text-sm">
                  {isGenerating ? (
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                      </motion.div>
                      <span>Processing Neural Data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Presentation className="h-5 w-5" />
                      <span>Execute Synthesis</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/50 backdrop-blur-3xl rounded-[32px] p-8 border border-white/5 flex flex-col h-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] rounded-full" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h2 className="text-xl font-bold flex items-center italic">
                  <Sparkles className="h-5 w-5 mr-3 text-indigo-500" />
                  Synthesis Profile
                </h2>
                {aiService && (
                  <div className="flex items-center mt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Node: {aiService}</span>
                  </div>
                )}
              </div>
              {summary && (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCopySummary}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all group"
                    title="Copy to Clipboard"
                  >
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                  </button>
                  <button
                    onClick={handleDownloadSummary}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all group"
                    title="Download Protocol"
                  >
                    <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex-grow min-h-[400px] relative z-10 custom-scrollbar overflow-y-auto pr-2">
              <AnimatePresence mode="wait">
                {summary ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert max-w-none prose-headings:italic prose-headings:tracking-tighter prose-p:text-zinc-300 prose-p:font-medium prose-p:leading-relaxed"
                  >
                    <div className="p-1 px-4 border-l-2 border-indigo-500/30 bg-indigo-500/5 rounded-r-2xl mb-8">
                      <p className="text-xs uppercase font-black tracking-widest text-indigo-400 mb-1">Status: Fully Synthesized</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Encrypted via EduMind Neural Link</p>
                    </div>
                    <div className="whitespace-pre-wrap font-medium text-zinc-200">
                      {summary}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-12"
                  >
                    <div className="w-20 h-20 bg-indigo-500/5 rounded-full flex items-center justify-center mb-6 group">
                      <FileText className="h-10 w-10 text-zinc-800 group-hover:text-indigo-500/50 transition-colors duration-500 animate-pulse" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-600 mb-2 italic underline decoration-indigo-500/50 underline-offset-8">Awaiting Neural Link</p>
                    <p className="text-zinc-700 text-xs font-bold leading-relaxed max-w-[240px]">
                      Transmit documentation packets to generate high-fidelity synthesis protocols.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {summary && (
              <div className="mt-10 pt-8 border-t border-white/5 space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Cross-Module Integration</span>
                  <Sparkles className="h-3 w-3 text-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate('/ai-tools/quiz-generator', { state: { initialText: summary } })}
                    className="group relative bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 transition-all rounded-2xl p-4 text-left overflow-hidden h-24 flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Target className="h-12 w-12 text-indigo-500 -rotate-12" />
                    </div>
                    <Target className="h-6 w-6 text-indigo-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold text-xs uppercase tracking-widest">Forge Quiz</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-tighter block mt-0.5">Assessment Extraction</span>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/ai-tools/flashcards', { state: { initialText: summary } })}
                    className="group relative bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 transition-all rounded-2xl p-4 text-left overflow-hidden h-24 flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <BookOpen className="h-12 w-12 text-purple-500 rotate-12" />
                    </div>
                    <BookOpen className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold text-xs uppercase tracking-widest">Memory Nodes</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-tighter block mt-0.5">Flashcard Committal</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* History Sidebar/Slideover */}
        <AnimatePresence>
          {showHistory && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowHistory(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-white/10 z-[101] p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <Clock className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">Memory Vault</h2>
                  </div>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-zinc-400" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto space-y-4 custom-scrollbar pr-2">
                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full"
                      />
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-600">Syncing History...</span>
                    </div>
                  ) : history.length === 0 ? (
                    <div className="text-center py-20">
                      <AlertCircle className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
                      <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No records found</p>
                    </div>
                  ) : (
                    history.map((item, idx) => (
                      <motion.div
                        key={item._id || idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => selectFromHistory(item)}
                        className="p-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl cursor-pointer transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.aiService || 'EduMind AI'}</span>
                          <span className="text-[10px] text-zinc-600 font-bold">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-200 line-clamp-2 leading-relaxed mb-3 italic">
                          {item.input.length > 80 ? item.input.slice(0, 80) + '...' : item.input}
                        </p>
                        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-zinc-500">
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                          <span>Extraction Complete</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-[10px] text-center text-zinc-700 font-bold uppercase tracking-widest">EduMind Vault • End-to-End Encrypted</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Global Stats/Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12"
        >
          <div className="text-center">
            <p className="text-3xl font-black italic tracking-tighter text-white mb-1">0.8<span>s</span></p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">AVG LATENCY</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black italic tracking-tighter text-indigo-500 mb-1">99.9<span>%</span></p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">MODEL ACCURACY</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black italic tracking-tighter text-white mb-1">H.V</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">THROUGHPUT</p>
          </div>
        </motion.div>
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AISummarizer;
