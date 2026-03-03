import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class PlannerCalendarScreen extends StatelessWidget {
  const PlannerCalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 120.0,
            floating: true,
            pinned: true,
            elevation: 0,
            backgroundColor: AppColors.background.withOpacity(0.9),
            flexibleSpace: const FlexibleSpaceBar(
              title: Text(
                'NEURAL CALENDAR',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                  color: Colors.white,
                ),
              ),
              centerTitle: true,
            ),
            actions: [
              IconButton(
                icon: const Icon(LucideIcons.list, size: 20, color: AppColors.textSecondary),
                onPressed: () {},
              ),
              const SizedBox(width: 8),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildCalendarBody(context),
                  const SizedBox(height: 48),
                  _buildSectionHeader('ACTIVE PROTOCOLS'),
                  const SizedBox(height: 24),
                  _buildTaskList(),
                  const SizedBox(height: 120),
                ],
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppColors.primary,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        child: const Icon(LucideIcons.plus, color: Colors.white),
      ).animate().scale(delay: 600.ms, curve: Curves.elasticOut),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w900,
            letterSpacing: 2.0,
            color: AppColors.textSecondary,
          ),
        ),
        Text(
          'VIEW ALL',
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w900,
            color: AppColors.primary.withOpacity(0.8),
            letterSpacing: 1.0,
          ),
        ),
      ],
    ).animate().fadeIn().slideX(begin: -0.1);
  }

  Widget _buildCalendarBody(BuildContext context) {
    return PremiumCard(
      padding: const EdgeInsets.all(28),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'FEBRUARY 2026',
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 16,
                      letterSpacing: -0.5,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'PHASE ALPHA: INITIALIZED',
                    style: TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 9,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  _buildNavIconButton(LucideIcons.chevronLeft),
                  const SizedBox(width: 8),
                  _buildNavIconButton(LucideIcons.chevronRight),
                ],
              ),
            ],
          ),
          const SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((d) => Text(d, style: const TextStyle(color: AppColors.textMuted, fontSize: 10, fontWeight: FontWeight.w900))).toList(),
          ),
          const SizedBox(height: 20),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 7,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
            ),
            itemCount: 28,
            itemBuilder: (context, index) {
              final isToday = index + 1 == 24;
              final hasEvent = [2, 10, 15, 24, 26].contains(index + 1);
              return Center(
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: isToday ? AppColors.primary : (hasEvent ? AppColors.primary.withOpacity(0.05) : Colors.transparent),
                    borderRadius: BorderRadius.circular(10),
                    border: hasEvent && !isToday ? Border.all(color: AppColors.primary.withOpacity(0.2)) : null,
                  ),
                  child: Center(
                    child: Text(
                      '${index + 1}',
                      style: TextStyle(
                        color: isToday ? Colors.white : (hasEvent ? Colors.white : AppColors.textMuted),
                        fontWeight: (isToday || hasEvent) ? FontWeight.w900 : FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    ).animate().fadeIn(duration: 600.ms).slideY(begin: 0.1);
  }

  Widget _buildNavIconButton(IconData icon) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: IconButton(
        icon: Icon(icon, size: 16, color: Colors.white),
        onPressed: () {},
        padding: const EdgeInsets.all(8),
        constraints: const BoxConstraints(),
      ),
    );
  }

  Widget _buildTaskList() {
    final tasks = [
      {'title': 'QUANTUM BIOLOGY SYNC', 'time': '14:00 - 15:30', 'done': true},
      {'title': 'NEURAL CALCULUS DRILL', 'time': '16:00 - 17:30', 'done': false},
      {'title': 'HISTORY ARCHIVE REVIEW', 'time': '19:00 - 20:30', 'done': false},
    ];

    return Column(
      children: tasks.asMap().entries.map((entry) {
        final index = entry.key;
        final task = entry.value;
        final isDone = task['done'] as bool;
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: PremiumCard(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: isDone ? AppColors.primary.withOpacity(0.1) : Colors.white.withOpacity(0.02),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: isDone ? AppColors.primary.withOpacity(0.5) : Colors.white.withOpacity(0.05)),
                  ),
                  child: isDone ? const Center(child: Icon(LucideIcons.check, size: 12, color: AppColors.primary)) : null,
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        task['title'] as String,
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 12,
                          letterSpacing: 0.5,
                          color: isDone ? AppColors.textMuted : Colors.white,
                          decoration: isDone ? TextDecoration.lineThrough : null,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        task['time'] as String,
                        style: const TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                const Icon(LucideIcons.chevronRight, size: 14, color: Colors.white10),
              ],
            ),
          ),
        ).animate().fadeIn(delay: (400 + index * 50).ms).slideX(begin: 0.05);
      }).toList(),
    );
  }
}
