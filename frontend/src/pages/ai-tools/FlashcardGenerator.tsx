import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Brain, RotateCcw, Eye, EyeOff, Download, Share2, Shuffle } from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category?: string;
}

const FlashcardGenerator = () => {
  const [topic, setTopic] = useState('');
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
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Flashcard Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create intelligent flashcards from any topic with our AI-powered system
          </p>
        </motion.div>

        {!studyMode ? (
          /* Setup Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Flashcards</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic or Subject
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Machine Learning, World History, Biology..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['easy', 'medium', 'hard'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`p-3 rounded-xl border-2 font-medium capitalize transition-colors ${difficulty === level
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Cards: {cardCount}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={cardCount}
                    onChange={(e) => setCardCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5</span>
                    <span>25</span>
                  </div>
                </div>

                <button
                  onClick={generateFlashcards}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Generating Flashcards...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-6 w-6" />
                      <span>Generate AI Flashcards</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Study Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Card {currentCard + 1} of {flashcards.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={shuffleCards}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Shuffle className="h-4 w-4" />
                    <span className="text-sm">Shuffle</span>
                  </button>
                  <button
                    onClick={() => toast.success('Flashcards downloaded!')}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Export</span>
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Flashcard */}
            <div className="mb-8">
              <div
                className="relative w-full h-80 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center items-center border-l-4 border-pink-500">
                      <div className="text-center">
                        <div className="text-sm text-pink-600 font-medium mb-4">
                          {flashcards[currentCard]?.category}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                          {flashcards[currentCard]?.front}
                        </h3>
                        <div className="flex items-center justify-center space-x-2 text-gray-500">
                          <Eye className="h-5 w-5" />
                          <span className="text-sm">Click to reveal answer</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center items-center">
                      <div className="text-center">
                        <div className="text-pink-200 font-medium mb-4 text-sm">
                          Answer
                        </div>
                        <p className="text-lg leading-relaxed mb-6">
                          {flashcards[currentCard]?.back}
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-pink-200">
                          <EyeOff className="h-5 w-5" />
                          <span className="text-sm">Click to hide answer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={prevCard}
                disabled={currentCard === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-6 py-3 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
                >
                  {isFlipped ? 'Show Question' : 'Show Answer'}
                </button>
              </div>

              <button
                onClick={nextCard}
                disabled={currentCard === flashcards.length - 1}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* Study Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetStudy}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>New Set</span>
              </button>
              <button
                onClick={() => toast.success('Flashcards shared!')}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Set</span>
              </button>
            </div>

            {/* Study Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-2xl font-bold text-pink-600 mb-2">{flashcards.length}</div>
                <div className="text-gray-600">Total Cards</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">{currentCard + 1}</div>
                <div className="text-gray-600">Current Card</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {Math.round(((currentCard + 1) / flashcards.length) * 100)}%
                </div>
                <div className="text-gray-600">Progress</div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default FlashcardGenerator;