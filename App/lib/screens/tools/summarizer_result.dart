import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SummarizerResultScreen extends StatelessWidget {
  final String summary;

  const SummarizerResultScreen({super.key, required this.summary});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'ANALYSIS RESULT',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 2.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(LucideIcons.share2, color: AppColors.textMuted), onPressed: () {}),
          IconButton(icon: const Icon(LucideIcons.copy, color: AppColors.textMuted), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(LucideIcons.zap, color: AppColors.primary, size: 14),
                SizedBox(width: 8),
                Text(
                  'NEURAL EXTRACTION COMPLETE',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w900,
                    fontSize: 10,
                    letterSpacing: 1.2,
                  ),
                ),
              ],
            ).animate().fadeIn().slideX(begin: -0.1),
            const SizedBox(height: 16),
            PremiumCard(
              padding: const EdgeInsets.all(24),
              child: SelectableText(
                summary,
                style: const TextStyle(
                  fontSize: 15,
                  height: 1.7,
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.05),
            const SizedBox(height: 48),
            const Text(
              'COGNITIVE PROGRESSION',
              style: TextStyle(
                fontWeight: FontWeight.w900,
                color: AppColors.textMuted,
                fontSize: 10,
                letterSpacing: 1.2,
              ),
            ).animate().fadeIn(delay: 300.ms),
            const SizedBox(height: 20),
            _buildNextStep(
              context,
              LucideIcons.helpCircle,
              'GENERATE CHALLENGE',
              'Convert this summary into an interactive quiz.',
              AppColors.secondary,
              () => Navigator.pushNamed(context, '/quiz_setup', arguments: {'topic': 'Summary Context'}),
            ).animate().fadeIn(delay: 400.ms).slideX(begin: 0.1),
            _buildNextStep(
              context,
              LucideIcons.layers,
              'CREATE FLASHCARDS',
              'Build an active recall deck for long-term memory.',
              AppColors.accent,
              () {},
            ).animate().fadeIn(delay: 500.ms).slideX(begin: 0.1),
            _buildNextStep(
              context,
              LucideIcons.messageSquare,
              'CONSULT AI TUTOR',
              'Ask deep questions about this specific summary.',
              const Color(0xFF10B981),
              () => Navigator.pushNamed(context, '/ai_tutor'),
            ).animate().fadeIn(delay: 600.ms).slideX(begin: 0.1),
          ],
        ),
      ),
    );
  }

  Widget _buildNextStep(BuildContext context, IconData icon, String title, String subtitle, Color color, VoidCallback onTap) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: PremiumCard(
        padding: const EdgeInsets.all(20),
        child: InkWell(
          onTap: onTap,
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(icon, color: color, size: 20),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 0.5),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: const TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ),
              const Icon(LucideIcons.chevronRight, size: 16, color: AppColors.textMuted),
            ],
          ),
        ),
      ),
    );
  }
}
