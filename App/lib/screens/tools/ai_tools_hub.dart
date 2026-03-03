import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../core/app_colors.dart';

class AIToolsHubScreen extends StatelessWidget {
  const AIToolsHubScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final tools = [
      {
        'title': 'AI Summarizer',
        'desc': 'Convert long videos & text into concise insights.',
        'icon': LucideIcons.fileText,
        'color': AppColors.primary,
        'route': '/summarizer',
        'tag': 'YOUTUBE SUPPORT'
      },
      {
        'title': 'Quiz Forge',
        'desc': 'Generate practice tests from any study material.',
        'icon': LucideIcons.helpCircle,
        'color': AppColors.secondary,
        'route': '/quiz_setup',
        'tag': 'SMART GEN'
      },
      {
        'title': 'AI Tutor',
        'desc': '24/7 interactive learning assistant for any subject.',
        'icon': LucideIcons.messageSquare,
        'color': AppColors.accent,
        'route': '/ai_tutor',
        'tag': 'INTERACTIVE'
      },
      {
        'title': 'Essay Guru',
        'desc': 'Advanced analysis and feedback for your writing.',
        'icon': LucideIcons.penTool,
        'color': const Color(0xFFF43F5E),
        'route': '/essay_analyzer',
        'tag': 'COMPOSITION'
      },
      {
        'title': 'Math Solver',
        'desc': 'Step-by-step solutions for complex equations.',
        'icon': LucideIcons.calculator,
        'color': const Color(0xFFF59E0B),
        'route': '/math_solver',
        'tag': 'SOLVER'
      },
      {
        'title': 'Research Aid',
        'desc': 'Find and synthesize academic resources faster.',
        'icon': LucideIcons.search,
        'color': const Color(0xFF3B82F6),
        'route': '/research_assistant',
        'tag': 'ACADEMIC'
      },
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 120.0,
            floating: false,
            pinned: true,
            elevation: 0,
            automaticallyImplyLeading: false,
            backgroundColor: AppColors.background,
            flexibleSpace: const FlexibleSpaceBar(
              title: Text(
                'AI PROTOCOLS',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                ),
              ),
              centerTitle: false,
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(24.0),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final tool = tools[index];
                  return _buildToolCard(context, tool, index);
                },
                childCount: tools.length,
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
    );
  }

  Widget _buildToolCard(BuildContext context, Map<String, dynamic> tool, int index) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      child: InkWell(
        onTap: () => Navigator.pushNamed(context, tool['route'] as String),
        borderRadius: BorderRadius.circular(28),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(28),
            border: Border.all(color: Colors.white.withOpacity(0.03)),
          ),
          child: Row(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: (tool['color'] as Color).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Icon(tool['icon'] as IconData, color: tool['color'] as Color, size: 28),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          (tool['title'] as String).toUpperCase(),
                          style: const TextStyle(
                            fontWeight: FontWeight.w900,
                            fontSize: 14,
                            letterSpacing: -0.5,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: (tool['color'] as Color).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            tool['tag'] as String,
                            style: TextStyle(
                              fontSize: 7,
                              fontWeight: FontWeight.w900,
                              color: tool['color'] as Color,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      tool['desc'] as String,
                      style: const TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              const Icon(LucideIcons.chevronRight, size: 20, color: AppColors.textMuted),
            ],
          ),
        ),
      ),
    ).animate().fadeIn(delay: (index * 100).ms, duration: 500.ms).slideX(begin: 0.1, curve: Curves.easeOut);
  }
}
