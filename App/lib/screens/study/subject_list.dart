import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SubjectListScreen extends StatelessWidget {
  const SubjectListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final subjects = [
      {'name': 'Mathematics', 'topics': '12 Topics', 'icon': LucideIcons.calculator, 'color': Colors.blue},
      {'name': 'Biology', 'topics': '8 Topics', 'icon': LucideIcons.dna, 'color': Colors.green},
      {'name': 'History', 'topics': '15 Topics', 'icon': LucideIcons.landmark, 'color': Colors.orange},
      {'name': 'Physics', 'topics': '10 Topics', 'icon': LucideIcons.zap, 'color': Colors.purple},
      {'name': 'Literature', 'topics': '6 Topics', 'icon': LucideIcons.book, 'color': Colors.red},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('My Subjects')),
      body: ListView.builder(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        itemCount: subjects.length,
        itemBuilder: (context, index) {
          final subject = subjects[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppConstants.surfaceColor,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: (subject['color'] as Color).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(subject['icon'] as IconData, color: subject['color'] as Color),
                ),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(subject['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    Text(subject['topics'] as String, style: const TextStyle(color: Colors.white54, fontSize: 12)),
                  ],
                ),
                const Spacer(),
                const Icon(LucideIcons.chevronRight, color: Colors.white24),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppConstants.primaryColor,
        child: const Icon(LucideIcons.plus),
      ),
    );
  }
}
