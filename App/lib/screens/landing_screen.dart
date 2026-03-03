import 'package:flutter/material.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_button.dart';
import '../../widgets/edumind_logo.dart';
import 'package:flutter_animate/flutter_animate.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Ambient Glow
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.primary.withOpacity(0.05),
              ),
            ),
          ).animate().fadeIn(duration: 2.seconds),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Spacer(),
                  // Branding
                  const EduMindLogo(size: 64).animate().fadeIn().scale(begin: const Offset(0.8, 0.8)),
                  const SizedBox(height: 32),
                  const Text(
                    'NEURAL LEARNING\nECOSYSTEM',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 4.0,
                      color: AppColors.primary,
                    ),
                  ).animate().fadeIn(delay: 200.ms).slideX(begin: -0.1),
                  const SizedBox(height: 16),
                  const Text(
                    'EDUMIND',
                    style: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w900,
                      letterSpacing: -1.0,
                      color: Colors.white,
                      height: 1.0,
                    ),
                  ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.1),
                  const SizedBox(height: 24),
                  const Text(
                    'The professional gateway to AI-driven knowledge distillation. Summarize, challenge, and master any subject with cinematic precision.',
                    style: TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 15,
                      height: 1.6,
                      fontWeight: FontWeight.w500,
                    ),
                  ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),
                  const Spacer(),
                  // Actions
                  Column(
                    children: [
                      PremiumButton(
                        text: 'INITIALIZE EXPERIENCE',
                        onPressed: () => Navigator.pushNamed(context, '/signup'),
                      ).animate().fadeIn(delay: 700.ms).scale(begin: const Offset(0.9, 0.9)),
                      const SizedBox(height: 20),
                      TextButton(
                        onPressed: () => Navigator.pushNamed(context, '/login'),
                        style: TextButton.styleFrom(
                          minimumSize: const Size(double.infinity, 56),
                        ),
                        child: const Text(
                          'EXISTING USER LOGIN',
                          style: TextStyle(
                            color: AppColors.textMuted,
                            fontWeight: FontWeight.w900,
                            fontSize: 11,
                            letterSpacing: 1.5,
                          ),
                        ),
                      ).animate().fadeIn(delay: 900.ms),
                    ],
                  ),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
