import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/theme.dart';
import 'providers/auth_provider.dart';
import 'providers/activity_provider.dart';
import 'providers/study_provider.dart';
import 'providers/analytics_provider.dart';
import 'providers/ai_provider.dart';
import 'providers/achievements_provider.dart';
import 'screens/landing_screen.dart';
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/home_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/reset_password_screen.dart';
import 'screens/main_navigation.dart';
import 'screens/tools/summarizer_input.dart';
import 'screens/tools/summarizer_result.dart';
import 'screens/tools/quiz_setup.dart';
import 'screens/tools/quiz_result.dart';
import 'screens/tools/ai_tutor.dart';
import 'screens/tools/history_vault.dart';
import 'screens/tools/flashcard_list.dart';
import 'screens/tools/flashcard_study.dart';
import 'screens/study/subject_list.dart';
import 'screens/study/subject_detail.dart';
import 'screens/study/planner_calendar.dart';
import 'screens/study/group_discovery.dart';
import 'screens/study/group_chat.dart';
import 'screens/profile/settings_screen.dart';
import 'screens/profile/edit_profile.dart';
import 'screens/profile/notification_settings.dart';
import 'screens/profile/privacy_settings.dart';
import 'screens/profile/security_settings.dart';
import 'screens/profile/subscription_plans.dart';
import 'screens/profile/faq_support.dart';
import 'screens/profile/about_app.dart';
import 'screens/profile/activity_log.dart';
import 'screens/profile/achievements.dart';
import 'screens/tools/math_solver.dart';
import 'screens/tools/essay_analyzer.dart';
import 'screens/tools/research_assistant.dart';
import 'screens/study/notes_list.dart';
import 'screens/study/note_editor.dart';
import 'screens/analytics/knowledge_map.dart';
import 'screens/analytics/analytics_hub.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const EduMindApp());
}

class EduMindApp extends StatelessWidget {
  const EduMindApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..tryAutoLogin()),
        ChangeNotifierProvider(create: (_) => ActivityProvider()),
        ChangeNotifierProvider(create: (_) => StudyProvider()),
        ChangeNotifierProvider(create: (_) => AnalyticsProvider()),
        ChangeNotifierProvider(create: (_) => AIProvider()),
        ChangeNotifierProvider(create: (_) => AchievementsProvider()),
      ],
      child: MaterialApp(
        title: 'EduMind',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        home: const AuthWrapper(),
        routes: {
          '/main': (context) => const MainNavigation(),
          '/onboarding': (context) => const OnboardingScreen(),
          '/landing': (context) => const LandingScreen(),
          '/login': (context) => const LoginScreen(),
          '/signup': (context) => const SignupScreen(),
          '/reset_password': (context) => const ResetPasswordScreen(),
          '/home': (context) => const MainNavigation(), // Point home to MainNav
          '/profile': (context) => const ProfileScreen(),
          
          // AI Tools
          '/summarizer': (context) => const SummarizerInputScreen(),
          '/summarizer_result': (context) => const SummarizerResultScreen(summary: 'This is a sample AI generated summary of your notes...'),
          '/quiz_setup': (context) => const QuizSetupScreen(),
          '/quiz_result': (context) => const QuizResultScreen(score: 8, total: 10),
          '/ai_tutor': (context) => const AITutorScreen(),
          '/history': (context) => const HistoryVaultScreen(),
          '/flashcards': (context) => const FlashcardDeckListScreen(),
          '/flashcard_study': (context) => const FlashcardStudyScreen(),
          '/math_solver': (context) => const MathSolverScreen(),
          '/essay_analyzer': (context) => const EssayAnalyzerScreen(),
          '/research_assistant': (context) => const ResearchAssistantScreen(),

          // Study Hub
          '/subjects': (context) => const SubjectListScreen(),
          '/subject_detail': (context) => SubjectDetailScreen(subjectName: ModalRoute.of(context)!.settings.arguments as String),
          '/planner': (context) => const PlannerCalendarScreen(),
          '/groups': (context) => const GroupDiscoveryScreen(),
          '/group_chat': (context) => const GroupChatScreen(groupName: 'Medical Scholars'),
          '/notes': (context) => const NotesListScreen(),
          '/note_editor': (context) {
            final id = ModalRoute.of(context)?.settings.arguments as String?;
            return NoteEditorScreen(noteId: id);
          },

          // Profile & Settings
          '/edit_profile': (context) => const EditProfileScreen(),
          '/settings': (context) => const SettingsScreen(),
          '/notifications': (context) => const NotificationSettingsScreen(),
          '/privacy': (context) => const PrivacySettingsScreen(),
          '/security': (context) => const SecuritySettingsScreen(),
          '/subscription': (context) => const SubscriptionPlansScreen(),
          '/help': (context) => const SupportFAQScreen(),
          '/about': (context) => const AboutAppScreen(),
          '/activity': (context) => const ActivityLogScreen(),
          '/achievements': (context) => const AchievementsScreen(),

          // Analytics
          '/analytics': (context) => const AnalyticsHubScreen(),
          '/knowledge_map': (context) => const KnowledgeMapScreen(),
        },
      ),
    );
  }
}

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, _) {
        if (auth.isLoading) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        }
        
        if (auth.isAuthenticated) {
          return const MainNavigation();
        }
        
        return const LandingScreen();
      },
    );
  }
}
