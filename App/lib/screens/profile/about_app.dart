import 'package:flutter/material.dart';
import '../../core/constants.dart';

class AboutAppScreen extends StatelessWidget {
  const AboutAppScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('About EduMind')),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          children: [
            const SizedBox(height: 40),
            Container(
              height: 100,
              width: 100,
              decoration: BoxDecoration(color: AppConstants.primaryColor, borderRadius: BorderRadius.circular(24)),
              child: const Icon(Icons.auto_awesome, size: 60),
            ),
            const SizedBox(height: 24),
            const Text('EduMind AI', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const Text('Version 1.0.4', style: TextStyle(color: Colors.white54)),
            const SizedBox(height: 48),
            const Text(
              'EduMind is an AI-powered study companion designed to help students master their subjects through smart summaries, automatic quizzes, and active recall techniques.',
              textAlign: TextAlign.center,
              style: TextStyle(height: 1.6, color: Colors.white70),
            ),
            const Spacer(),
            const Text('Made with ❤️ for students worldwide', style: TextStyle(fontSize: 12, color: Colors.white24)),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
