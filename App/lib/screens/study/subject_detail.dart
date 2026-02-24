import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SubjectDetailScreen extends StatelessWidget {
  final String subjectName;

  const SubjectDetailScreen({super.key, required this.subjectName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(subjectName)),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          _buildTopicItem('Introduction to Biology', true),
          _buildTopicItem('Cell Structure & Function', true),
          _buildTopicItem('Genetics and Inheritance', false),
          _buildTopicItem('Ecology and Ecosystems', false),
          _buildTopicItem('Human Anatomy', false),
        ],
      ),
    );
  }

  Widget _buildTopicItem(String title, bool isCompleted) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
      child: Row(
        children: [
          Icon(isCompleted ? LucideIcons.checkCircle : LucideIcons.circle, color: isCompleted ? Colors.green : Colors.white24),
          const SizedBox(width: 16),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          const Spacer(),
          const Icon(LucideIcons.chevronRight, size: 16, color: Colors.white24),
        ],
      ),
    );
  }
}
