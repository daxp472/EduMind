import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_button.dart';
import 'package:flutter_animate/flutter_animate.dart';

class QuizResultScreen extends StatelessWidget {
  final int score;
  final int total;

  const QuizResultScreen({super.key, required this.score, required this.total});

  @override
  Widget build(BuildContext context) {
    final percentage = (score / total * 100).round();
    final isStellar = percentage >= 80;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          gradient: RadialGradient(
            center: Alignment.topCenter,
            radius: 1.2,
            colors: [
              (isStellar ? AppColors.success : AppColors.secondary).withOpacity(0.1),
              AppColors.background,
            ],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'CHALLENGE CONCLUDED',
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    color: AppColors.textMuted,
                    letterSpacing: 2.0,
                    fontSize: 12,
                  ),
                ).animate().fadeIn().slideY(begin: -0.2),
                const SizedBox(height: 64),
                Stack(
                  alignment: Alignment.center,
                  children: [
                    SizedBox(
                      height: 240,
                      width: 240,
                      child: CircularProgressIndicator(
                        value: score / total,
                        strokeWidth: 2,
                        backgroundColor: Colors.white.withOpacity(0.05),
                        valueColor: AlwaysStoppedAnimation<Color>(
                          isStellar ? AppColors.success : AppColors.secondary,
                        ),
                      ),
                    ),
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '$percentage%',
                          style: const TextStyle(
                            fontSize: 72,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -2.0,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          '$score OUT OF $total RAW SCORE',
                          style: const TextStyle(
                            color: AppColors.textMuted,
                            fontWeight: FontWeight.w900,
                            fontSize: 10,
                            letterSpacing: 1.0,
                          ),
                        ),
                      ],
                    ),
                  ],
                ).animate().scale(duration: 800.ms, curve: Curves.elasticOut),
                const SizedBox(height: 64),
                Text(
                  isStellar ? 'NEURAL SYNC ACHIEVED' : 'COGNITIVE RECALIBRATION REQUIRED',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    letterSpacing: -0.5,
                  ),
                  textAlign: TextAlign.center,
                ).animate().fadeIn(delay: 400.ms),
                const SizedBox(height: 12),
                Text(
                  'You have earned ${(score * 10)} Neural Credits for this session.',
                  style: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                ).animate().fadeIn(delay: 600.ms),
                const SizedBox(height: 80),
                PremiumButton(
                  text: 'RETURN TO NEXUS',
                  icon: LucideIcons.home,
                  onPressed: () => Navigator.pushReplacementNamed(context, '/home'),
                ).animate().fadeIn(delay: 800.ms).slideY(begin: 0.2),
                const SizedBox(height: 16),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    'REVIEW MEMORY LOGS',
                    style: TextStyle(
                      color: AppColors.textMuted,
                      fontWeight: FontWeight.w900,
                      fontSize: 12,
                      letterSpacing: 1.0,
                    ),
                  ),
                ).animate().fadeIn(delay: 1000.ms),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
