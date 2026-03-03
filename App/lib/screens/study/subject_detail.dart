import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SubjectDetailScreen extends StatelessWidget {
  final String subjectName;

  const SubjectDetailScreen({super.key, required this.subjectName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 180.0,
            floating: false,
            pinned: true,
            elevation: 0,
            backgroundColor: AppColors.background.withOpacity(0.95),
            leading: IconButton(
              icon: const Icon(LucideIcons.chevronLeft, color: Colors.white),
              onPressed: () => Navigator.pop(context),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                children: [
                   Positioned(
                    bottom: -20,
                    right: -20,
                    child: Icon(
                      LucideIcons.dna,
                      size: 140,
                      color: AppColors.primary.withOpacity(0.05),
                    ),
                  ),
                ],
              ),
              title: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    subjectName.toUpperCase(),
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w900,
                      letterSpacing: -0.5,
                      color: Colors.white,
                    ),
                  ),
                  const Text(
                    'Operational Knowledge Node',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textSecondary,
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
              centerTitle: false,
              titlePadding: const EdgeInsets.only(left: 24, bottom: 24),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildProgressOverview(),
                  const SizedBox(height: 40),
                  const Text(
                    'RESEARCH SEGMENTS',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2.0,
                      color: AppColors.textSecondary,
                    ),
                  ).animate().fadeIn().slideX(begin: -0.1),
                  const SizedBox(height: 16),
                  _buildTopicList(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgressOverview() {
    return PremiumCard(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'SYNC PROGRESS',
                style: TextStyle(
                  color: AppColors.textMuted,
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.5,
                ),
              ),
              Text(
                '40% COMPLETED',
                style: TextStyle(
                  color: AppColors.primary.withOpacity(0.8),
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: 0.4,
              backgroundColor: Colors.white.withOpacity(0.05),
              valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
              minHeight: 6,
            ),
          ),
        ],
      ),
    ).animate().fadeIn(delay: 200.ms).scale(begin: const Offset(0.95, 0.95));
  }

  Widget _buildTopicList() {
    final topics = [
      {'title': 'INTRODUCTION TO QUANTUM BIOLOGY', 'done': true},
      {'title': 'CELLULAR ARCHITECTURE & ENERGY', 'done': true},
      {'title': 'NEURAL SIGNALING PATHWAYS', 'done': false},
      {'title': 'GENETIC DATA TRANSLATION', 'done': false},
      {'title': 'SYNAPTIC PLASTICITY LOGS', 'done': false},
    ];

    return Column(
      children: topics.asMap().entries.map((entry) {
        final index = entry.key;
        final topic = entry.value;
        final isCompleted = topic['done'] as bool;

        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          child: PremiumCard(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            onTap: () {},
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: isCompleted ? AppColors.primary.withOpacity(0.1) : Colors.white.withOpacity(0.02),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    isCompleted ? LucideIcons.check : LucideIcons.lock,
                    size: 14,
                    color: isCompleted ? AppColors.primary : AppColors.textMuted.withOpacity(0.5),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Text(
                    topic['title'] as String,
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 11,
                      letterSpacing: 0.5,
                      color: isCompleted ? Colors.white : AppColors.textMuted,
                    ),
                  ),
                ),
                const Icon(LucideIcons.chevronRight, size: 14, color: Colors.white10),
              ],
            ),
          ),
        ).animate().fadeIn(delay: (300 + index * 50).ms).slideX(begin: 0.05);
      }).toList(),
    );
  }
}
