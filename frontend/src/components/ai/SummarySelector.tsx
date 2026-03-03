import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    History, Search, Youtube, FileText, Globe,
    Calendar, ChevronRight, Sparkles, Loader2
} from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface SummarySelectorProps {
    onSelect: (content: string) => void;
    className?: string;
}

const SummarySelector = ({ onSelect, className = "" }: SummarySelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('edumind_token');
            if (!token) return;
            const res = await aiAPI.getHistory(token, 'summarizer');
            if (res.success) {
                setHistory(res.data);
            }
        } catch (err) {
            console.error('Failed to fetch summary history', err);
            toast.error('Could not retrieve memory vault');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchHistory();
        }
    }, [isOpen]);

    const filteredHistory = history.filter(item =>
        item.input.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.output && item.output.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getSourceIcon = (source: string) => {
        if (source?.toLowerCase().includes('youtube')) return <Youtube className="h-3 w-3" />;
        if (source?.toLowerCase().includes('file')) return <FileText className="h-3 w-3" />;
        return <Globe className="h-3 w-3" />;
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 border border-white/5 rounded-xl hover:bg-zinc-800 transition-all group"
            >
                <History className="h-4 w-4 text-indigo-500 group-hover:rotate-[-20deg] transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Memory Vault</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full mt-4 left-0 md:left-auto md:right-0 w-[350px] md:w-[450px] bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl z-[70] overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/5 bg-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center">
                                        <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
                                        Select Synthesis
                                    </h3>
                                    <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-md uppercase tracking-tighter">
                                        {history.length} Records
                                    </span>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-500" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search neural records..."
                                        className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-3 space-y-2">
                                {loading ? (
                                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                                        <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Accessing Core...</span>
                                    </div>
                                ) : filteredHistory.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <History className="h-8 w-8 text-zinc-800 mx-auto mb-3" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">No records found</p>
                                    </div>
                                ) : (
                                    filteredHistory.map((item) => (
                                        <button
                                            key={item._id}
                                            onClick={() => {
                                                onSelect(item.output);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left p-4 bg-white/[0.02] hover:bg-indigo-500/10 border border-white/5 rounded-2xl transition-all group relative overflow-hidden"
                                        >
                                            <div className="flex justify-between items-start mb-2 relative z-10">
                                                <div className="flex items-center space-x-2">
                                                    <div className="p-1.5 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                                        {getSourceIcon(item.metadata?.sourceType || 'text')}
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 group-hover:text-indigo-400">
                                                        {item.metadata?.summarizeType === 'YOUTUBE_VIDEO' ? 'YouTube' : 'Note'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-[9px] font-bold text-zinc-600">
                                                    <Calendar className="h-2.5 w-2.5 mr-1" />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <p className="text-xs font-bold text-zinc-300 line-clamp-2 leading-relaxed italic mb-1">
                                                {item.input.length > 100 ? item.input.slice(0, 100) + '...' : item.input}
                                            </p>
                                            <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-500 flex items-center">
                                                    Inject Content
                                                    <ChevronRight className="h-3 w-3 ml-1" />
                                                </span>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-white/5 bg-black/20 text-center">
                                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 flex items-center justify-center">
                                    EduMind Neural Selection Protocol v1.4
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.3);
        }
      `}</style>
        </div>
    );
};

export default SummarySelector;
