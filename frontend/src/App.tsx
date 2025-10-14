import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import EmailVerification from './pages/EmailVerification';
import AISummarizer from './pages/ai-tools/AISummarizer';
import QuizGenerator from './pages/ai-tools/QuizGenerator';
import AITutor from './pages/ai-tools/AITutor';
import StudyPlanner from './pages/ai-tools/StudyPlanner';
import FlashcardGenerator from './pages/ai-tools/FlashcardGenerator';
import EssayAnalyzer from './pages/ai-tools/EssayAnalyzer';
import ConceptMapper from './pages/ai-tools/ConceptMapper';
import LanguageTutor from './pages/ai-tools/LanguageTutor';
import MathSolver from './pages/ai-tools/MathSolver';
import ResearchAssistant from './pages/ai-tools/ResearchAssistant';

// Study Pages
import StudyRooms from './pages/study/StudyRooms';
import StudyGroups from './pages/study/StudyGroups';
import StudyTimer from './pages/study/StudyTimer';
import StudyGoals from './pages/study/StudyGoals';
import StudyCalendar from './pages/study/StudyCalendar';
import StudyMaterials from './pages/study/StudyMaterials';
import StudyNotes from './pages/study/StudyNotes';

// Analytics Pages
import LearningAnalytics from './pages/analytics/LearningAnalytics';
import ProgressReports from './pages/analytics/ProgressReports';
import PerformanceInsights from './pages/analytics/PerformanceInsights';
import LearningPaths from './pages/analytics/LearningPaths';

// Community Pages
import StudyCommunity from './pages/community/StudyCommunity';
import StudyBuddies from './pages/community/StudyBuddies';
import DiscussionForums from './pages/community/DiscussionForums';
import StudyEvents from './pages/community/StudyEvents';
import Leaderboards from './pages/community/Leaderboards';

// Resources Pages
import Library from './pages/resources/Library';
import Courses from './pages/resources/Courses';
import Tutorials from './pages/resources/Tutorials';
import Templates from './pages/resources/Templates';
import AIModels from './pages/resources/AIModels';

import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/help" element={<Help />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* AI Tools Routes */}
              <Route path="/ai-tools/summarizer" element={
                <ProtectedRoute>
                  <AISummarizer />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/quiz-generator" element={
                <ProtectedRoute>
                  <QuizGenerator />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/tutor" element={
                <ProtectedRoute>
                  <AITutor />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/study-planner" element={
                <ProtectedRoute>
                  <StudyPlanner />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/flashcards" element={
                <ProtectedRoute>
                  <FlashcardGenerator />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/essay-analyzer" element={
                <ProtectedRoute>
                  <EssayAnalyzer />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/concept-mapper" element={
                <ProtectedRoute>
                  <ConceptMapper />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/language-tutor" element={
                <ProtectedRoute>
                  <LanguageTutor />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/math-solver" element={
                <ProtectedRoute>
                  <MathSolver />
                </ProtectedRoute>
              } />
              <Route path="/ai-tools/research-assistant" element={
                <ProtectedRoute>
                  <ResearchAssistant />
                </ProtectedRoute>
              } />

              {/* Study Routes */}
              <Route path="/study/rooms" element={
                <ProtectedRoute>
                  <StudyRooms />
                </ProtectedRoute>
              } />
              <Route path="/study/groups" element={
                <ProtectedRoute>
                  <StudyGroups />
                </ProtectedRoute>
              } />
              <Route path="/study/timer" element={
                <ProtectedRoute>
                  <StudyTimer />
                </ProtectedRoute>
              } />
              <Route path="/study/goals" element={
                <ProtectedRoute>
                  <StudyGoals />
                </ProtectedRoute>
              } />
              <Route path="/study/calendar" element={
                <ProtectedRoute>
                  <StudyCalendar />
                </ProtectedRoute>
              } />
              <Route path="/study/materials" element={
                <ProtectedRoute>
                  <StudyMaterials />
                </ProtectedRoute>
              } />
              <Route path="/study/notes" element={
                <ProtectedRoute>
                  <StudyNotes />
                </ProtectedRoute>
              } />

              {/* Analytics Routes */}
              <Route path="/analytics/learning" element={
                <ProtectedRoute>
                  <LearningAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/analytics/reports" element={
                <ProtectedRoute>
                  <ProgressReports />
                </ProtectedRoute>
              } />
              <Route path="/analytics/insights" element={
                <ProtectedRoute>
                  <PerformanceInsights />
                </ProtectedRoute>
              } />
              <Route path="/analytics/learning-paths" element={
                <ProtectedRoute>
                  <LearningPaths />
                </ProtectedRoute>
              } />

              {/* Community Routes */}
              <Route path="/community" element={
                <ProtectedRoute>
                  <StudyCommunity />
                </ProtectedRoute>
              } />
              <Route path="/community/buddies" element={
                <ProtectedRoute>
                  <StudyBuddies />
                </ProtectedRoute>
              } />
              <Route path="/community/forums" element={
                <ProtectedRoute>
                  <DiscussionForums />
                </ProtectedRoute>
              } />
              <Route path="/community/events" element={
                <ProtectedRoute>
                  <StudyEvents />
                </ProtectedRoute>
              } />
              <Route path="/community/leaderboards" element={
                <ProtectedRoute>
                  <Leaderboards />
                </ProtectedRoute>
              } />

              {/* Resources Routes */}
              <Route path="/resources/library" element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } />
              <Route path="/resources/courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />
              <Route path="/resources/tutorials" element={
                <ProtectedRoute>
                  <Tutorials />
                </ProtectedRoute>
              } />
              <Route path="/resources/templates" element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              } />
              <Route path="/resources/ai-models" element={
                <ProtectedRoute>
                  <AIModels />
                </ProtectedRoute>
              } />
              

              <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ScrollProgress />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <main className="pt-16">
            <AnimatedRoutes />
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;