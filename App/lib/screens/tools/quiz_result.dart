import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../core/constants.dart';

class QuizResultScreen extends StatelessWidget {
  final int score;
  final int total;

  const QuizResultScreen({super.key, required this.score, required this.total});

  @override
  Widget build(BuildContext context) {
    final percentage = (score / total * 100).round();

    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(AppConstants.defaultPadding),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('QUIZ COMPLETED!', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, letterSpacing: 2)),
              const SizedBox(height: 48),
              Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    height: 200,
                    width: 200,
                    child: CircularProgressIndicator(
                      value: score / total,
                      strokeWidth: 12,
                      backgroundColor: Colors.white10,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppConstants.primaryColor),
                    ),
                  ),
                  Column(
                    children: [
                      Text('$percentage%', style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900)),
                      Text('$score / $total', style: const TextStyle(color: Colors.white54, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ],
              ).animate().scale(duration: 600.ms, curve: Curves.elasticOut),
              const SizedBox(height: 64),
              const Text('EXCELLENT WORK!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
              const SizedBox(height: 8),
              const Text('You have earned 45 Study Points.', style: TextStyle(color: Colors.white70)),
              const SizedBox(height: 64),
              ElevatedButton(
                onPressed: () => Navigator.pushReplacementNamed(context, '/home'),
                child: const Text('BACK TO DASHBOARD'),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () {},
                child: const Text('REVIEW ANSWERS', style: TextStyle(color: Colors.white54)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
