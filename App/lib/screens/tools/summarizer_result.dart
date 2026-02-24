import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SummarizerResultScreen extends StatelessWidget {
  final String summary;

  const SummarizerResultScreen({super.key, required this.summary});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Summary Result'),
        actions: [
          IconButton(icon: const Icon(LucideIcons.share2), onPressed: () {}),
          IconButton(icon: const Icon(LucideIcons.copy), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppConstants.surfaceColor,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(LucideIcons.zap, color: Colors.amber, size: 18),
                      SizedBox(width: 8),
                      Text('AI GENERATED', style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    summary,
                    style: const TextStyle(fontSize: 16, height: 1.6),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            const Text('WHAT NEXT?', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
            const SizedBox(height: 16),
            _buildActionItem(LucideIcons.helpCircle, 'Create a Quiz from this', 'Turn these notes into questions'),
            _buildActionItem(LucideIcons.layoutGrid, 'Make Flashcards', 'Practice with active recall'),
          ],
        ),
      ),
    );
  }

  Widget _buildActionItem(IconData icon, String title, String subtitle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppConstants.surfaceColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppConstants.primaryColor),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(subtitle, style: const TextStyle(color: Colors.white54, fontSize: 12)),
            ],
          ),
          const Spacer(),
          const Icon(LucideIcons.chevronRight, color: Colors.white24),
        ],
      ),
    );
  }
}
