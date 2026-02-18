import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Brain, RotateCcw, Eye, EyeOff, Download, Shuffle, Sparkles } from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category?: string;
}

const FlashcardGenerator = () => {
  const location = useLocation();
  const [topic, setTopic] = useState(location.state?.initialText || '');
  const [difficulty, setDifficulty] = useState('medium');
  const [cardCount, setCardCount] = useState(10);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  const generateFlashcards = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for flashcard generation');
      return;
    }

    setIsGenerating(true);

    try {
      const token = localStorage.getItem('edumind_token') || '';
      const response = await aiAPI.generateFlashcards(
        { text: topic, numCards: cardCount },
        token
      );

      const rawCards = response.data.flashcards || [];
      const normalized: Flashcard[] = rawCards.map((c: any, idx: number) => ({
        id: idx + 1,
        front: c.front || c.question || c.term || '',
        back: c.back || c.answer || c.definition || '',
        category: c.category || topic
      }));

      setFlashcards(normalized);
      setCurrentCard(0);
      setIsFlipped(false);
      setStudyMode(true);
      toast.success('Flashcards generated successfully!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to generate flashcards';
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    toast.success('Cards shuffled!');
  };

  const resetStudy = () => {
    setStudyMode(false);
    setFlashcards([]);
    setCurrentCard(0);
    setIsFlipped(false);
    setTopic('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">

        {/* Neural Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-sm font-bold tracking-widest text-purple-500 uppercase">Memory Protocol</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            Cognitive <span className="text-purple-500">Buffer</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl">
            Initialize high-retention memory nodes. Quantize complex datasets into semantic fragments for rapid neural ingestion.
          </p>
        </motion.div>

        {!studyMode ? (
          /* Parameter Initialization */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
                <Brain className="h-6 w-6 mr-3 text-purple-500" />
                Buffer Parameters
              </h2>

              <div className="space-y-8 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1">Ingestion Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Astrophysics, Advanced Linguistics..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium placeholder:text-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Fidelity Grade</label>
                    <div className="flex p-1 bg-black/40 border border-white/5 rounded-2xl">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${difficulty === level
                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                            : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Fragment Count</label>
                    <div className="flex items-center space-x-4 h-[52px]">
                      <input
                        type="range"
                        min="5"
                        max="25"
                        value={cardCount}
                        onChange={(e) => setCardCount(parseInt(e.target.value))}
                        className="flex-grow h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                      <span className="text-lg font-black text-purple-500 min-w-[3ch]">{cardCount}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateFlashcards}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full relative group/btn overflow-hidden rounded-2xl p-px mt-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 animate-gradient-x" />
                  <div className="relative bg-zinc-900 group-hover:bg-transparent transition-colors rounded-[15px] py-5 px-6 flex items-center justify-center font-bold uppercase tracking-[0.2em] text-sm text-white">
                    {isGenerating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Brain className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-3 text-purple-500" />
                        Execute Generation
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Study Visualization */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Telemetry */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Session In Progress</span>
                  <span className="text-2xl font-black text-white">
                    FRAGMENT <span className="text-purple-500">{(currentCard + 1).toString().padStart(2, '0')}</span>
                    <span className="text-zinc-700 mx-2">/</span>
                    <span className="text-zinc-500">{flashcards.length.toString().padStart(2, '0')}</span>
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={shuffleCards}
                    className="p-3 bg-zinc-900 border border-white/5 text-zinc-500 rounded-xl hover:text-white transition-all group"
                    title="Shuffle Fragments"
                  >
                    <Shuffle className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </button>
                  <button
                    onClick={() => toast.success('Telemetry Exported')}
                    className="p-3 bg-zinc-900 border border-white/5 text-zinc-500 rounded-xl hover:text-white transition-all group"
                    title="Export Protocol"
                  >
                    <Download className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full"
                />
              </div>
            </div>

            {/* Neural Fragment Card */}
            <div className="mb-12 perspective-lg">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
                className="relative w-full h-[400px] cursor-pointer transform-style-preserve-3d"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front: Knowledge Node */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[40px] p-12 h-full flex flex-col justify-center items-center border border-white/5 relative group">
                    <div className="absolute top-8 left-8">
                      <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">{flashcards[currentCard]?.category}</span>
                      </div>
                    </div>
                    <div className="absolute top-8 right-8 text-zinc-800">
                      <Brain className="h-10 w-10 opacity-20" />
                    </div>

                    <div className="text-center max-w-xl">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-8 italic">Memory Node Input</p>
                      <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter uppercase italic">
                        {flashcards[currentCard]?.front}
                      </h3>
                    </div>

                    <div className="absolute bottom-8 text-zinc-600 animate-pulse">
                      <Eye className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Back: Quantized Insight */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <div className="bg-gradient-to-br from-zinc-900 to-indigo-950 rounded-[40px] p-12 h-full flex flex-col justify-center items-center border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                    <div className="text-center max-w-xl relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8 italic">Synthesized Insight</p>
                      <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                        {flashcards[currentCard]?.back}
                      </p>
                    </div>

                    <div className="absolute bottom-8 text-indigo-400">
                      <EyeOff className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-4 order-2 md:order-1">
                <button
                  onClick={prevCard}
                  disabled={currentCard === 0}
                  className="px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-white transition-all disabled:opacity-20"
                >
                  Previous Node
                </button>
                <button
                  onClick={nextCard}
                  disabled={currentCard === flashcards.length - 1}
                  className="px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-white transition-all disabled:opacity-20"
                >
                  Next Node
                </button>
              </div>

              <div className="order-1 md:order-2">
                <button
                  onClick={resetStudy}
                  className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-purple-500 hover:text-white transition-all flex items-center group shadow-xl hover:shadow-purple-500/20"
                >
                  <RotateCcw className="h-4 w-4 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                  Re-initialize
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default FlashcardGenerator;