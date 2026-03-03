import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/edumind_logo.dart';
import 'package:flutter_animate/flutter_animate.dart';

class AboutAppScreen extends StatelessWidget {
  const AboutAppScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'SYSTEM INFORMATION',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Column(
          children: [
            const Spacer(),
            const EduMindLogo(size: 100).animate().fadeIn().scale(begin: const Offset(0.8, 0.8)),
            const SizedBox(height: 32),
            const Text(
              'EDUMIND AI',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.w900,
                letterSpacing: -0.5,
                color: Colors.white,
              ),
            ).animate().fadeIn(delay: 200.ms),
            const Text(
              'NEURAL CORE V1.0.4',
              style: TextStyle(
                color: AppColors.primary,
                fontSize: 10,
                fontWeight: FontWeight.w900,
                letterSpacing: 2.0,
              ),
            ).animate().fadeIn(delay: 400.ms),
            const SizedBox(height: 64),
            const Text(
              'EduMind is an advanced AI-powered study ecosystem designed to amplify cognitive performance through high-density knowledge distillation, automated active recall protocols, and intelligent memory consolidation.',
              textAlign: TextAlign.center,
              style: TextStyle(
                height: 1.8,
                color: AppColors.textSecondary,
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.1),
            const Spacer(),
            const Text(
              'DEVELOPED BY THE NEURAL LABS COLLECTIVE',
              style: TextStyle(
                fontSize: 9,
                fontWeight: FontWeight.w900,
                color: AppColors.textMuted,
                letterSpacing: 1.5,
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}
