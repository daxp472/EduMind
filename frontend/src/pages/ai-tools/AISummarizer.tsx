import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Sparkles, Copy, Download, Check, Target, BookOpen } from 'lucide-react';
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
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to generate summary';
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };
  // ... rest of functions stay the same ...
  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleForgeQuiz = () => {
    navigate('/ai-tools/quiz-generator', { state: { initialText: summary } });
  };

  const handleCreateFlashcards = () => {
    navigate('/ai-tools/flashcards', { state: { initialText: summary } });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-indigo-500" />
            </div>
            <span className="text-sm font-bold tracking-widest text-indigo-500 uppercase">AI Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Neural <span className="text-indigo-500">Summarizer</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl">
            Execute high-fidelity analysis of complex documentation. Transform raw knowledge into structured intelligence protocols.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-indigo-500" />
              Ingestion Protocol
            </h2>

            <div className="space-y-6 relative z-10">
              <div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-zinc-700"
                  placeholder="Paste documentation hex-data or raw text here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">Synthesis Type</label>
                  <select
                    value={summaryType}
                    onChange={(e) => setSummaryType(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                  >
                    <option value="general">General Synthesis</option>
                    <option value="academic">Academic Analysis</option>
                    <option value="bullet-points">Neural Nodes</option>
                    <option value="executive">Executive Summary</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">Output Depth</label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                  >
                    <option value="short">Concise</option>
                    <option value="medium">Balanced</option>
                    <option value="long">Comprehensive</option>
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
                <div className="flex items-center justify-center px-6 py-8 border-2 border-dashed border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group/upload">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-zinc-500 mx-auto mb-3 group-hover/upload:text-indigo-500 transition-colors" />
                    <span className="text-zinc-400 block font-medium">
                      {file ? file.name : 'Upload PDF/Images/Docs'}
                    </span>
                    <span className="text-xs text-zinc-600 mt-1 block tracking-wider uppercase">Drag & Drop Protocol</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={isGenerating || (!inputText.trim() && !file)}
                className="w-full relative group/btn overflow-hidden rounded-2xl p-px"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                <div className="relative bg-zinc-900 group-hover:bg-transparent transition-colors rounded-[15px] py-4 px-6 flex items-center justify-center font-bold uppercase tracking-wider text-sm">
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 mr-2" />
                      Initialize Synthesis
                    </>
                  )}
                </div>
              </button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
                  Synthesis Output
                </h2>
                {aiService && <p className="text-xs font-black uppercase tracking-widest text-indigo-500/60 mt-1">Provider: {aiService}</p>}
              </div>
              {summary && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopySummary}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all"
                  >
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={handleDownloadSummary}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex-grow min-h-[300px] relative">
              {summary ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">{summary}</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-zinc-700" />
                  </div>
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">Awaiting Intelligence</p>
                  <p className="text-zinc-700 text-xs max-w-[200px]">Initialize ingestion protocol to generate neural summary.</p>
                </div>
              )}
            </div>

            {summary && (
              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Connected Modules</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleForgeQuiz}
                    className="group relative bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all rounded-2xl p-4 text-left"
                  >
                    <Target className="h-6 w-6 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="block font-bold text-sm uppercase tracking-wider">Forge Quiz</span>
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-tighter">Transform summary to assessment</span>
                  </button>
                  <button
                    onClick={handleCreateFlashcards}
                    className="group relative bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all rounded-2xl p-4 text-left"
                  >
                    <BookOpen className="h-6 w-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="block font-bold text-sm uppercase tracking-wider">Flashcards</span>
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-tighter">Commit summary to memory</span>
                  </button>
                </div>
              </div>
            )}

            {summary && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                <div className="flex items-start space-x-3">
                  <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">AI Tip</h4>
                    <p className="text-sm text-blue-100 font-medium">
                      Try adjusting the depth or focus of your synthesis by specifying key parameters you want to prioritize in the raw input.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Intelligence Architecture Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-zinc-900/40 border border-white/5 rounded-3xl p-10 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-3 mb-10">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Check className="h-5 w-5 text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tighter">Operational Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative group">
              <div className="absolute -inset-2 bg-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                  <Upload className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">1. Data Ingestion</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  Transmit multi-modal documentation or raw text strings into the neural processing buffer.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">2. Neural Processing</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  Advanced language models execute high-fidelity extraction of core intelligence nodes and semantic structures.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">3. Insight Delivery</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  Receive a structured knowledge protocol, ready for conversion into assessment or memory nodes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AISummarizer;