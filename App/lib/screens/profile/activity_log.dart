import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../providers/activity_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class ActivityLogScreen extends StatefulWidget {
  const ActivityLogScreen({super.key});

  @override
  State<ActivityLogScreen> createState() => _ActivityLogScreenState();
}

class _ActivityLogScreenState extends State<ActivityLogScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      context.read<ActivityProvider>().fetchRecentActivity();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'NEURAL ACTIVITY LOG',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: Consumer<ActivityProvider>(
        builder: (context, provider, _) {
          if (provider.isLoading && provider.activities.isEmpty) {
            return const Center(child: CircularProgressIndicator(color: AppColors.primary));
          }

          final activities = provider.activities;

          if (activities.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(LucideIcons.activity, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                  const SizedBox(height: 16),
                  const Text(
                    'NO ACTIVITY FOUND',
                    style: TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.w900),
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(24),
            physics: const BouncingScrollPhysics(),
            itemCount: activities.length,
            itemBuilder: (context, index) {
              return _buildActivityItem(activities[index], index);
            },
          );
        },
      ),
    );
  }

  Widget _buildActivityItem(Map<String, dynamic> activity, int index) {
    final type = activity['type']?.toString() ?? 'general';
    final color = _getActivityColor(type);
    final icon = _getActivityIcon(type);
    final title = activity['title'] ?? activity['type'] ?? 'Activity';
    final description = activity['description'] ?? '';
    final createdAt = activity['createdAt']?.toString() ?? '';
    final points = activity['points']?.toString() ?? '+0 NC';

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: PremiumCard(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title.toString().toUpperCase(),
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 12,
                      letterSpacing: 0.5,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  points,
                  style: const TextStyle(
                    color: AppColors.success,
                    fontWeight: FontWeight.w900,
                    fontSize: 11,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  _formatTime(createdAt),
                  style: const TextStyle(color: AppColors.textMuted, fontSize: 8, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ],
        ),
      ),
    ).animate().fadeIn(delay: (index * 50).ms).slideX(begin: 0.05);
  }

  Color _getActivityColor(String type) {
    switch (type.toLowerCase()) {
      case 'summary': return AppColors.primary;
      case 'quiz': return AppColors.secondary;
      case 'tutor': return AppColors.accent;
      case 'study': return AppColors.success;
      case 'flashcard': return Colors.orange;
      default: return AppColors.primary;
    }
  }

  IconData _getActivityIcon(String type) {
    switch (type.toLowerCase()) {
      case 'summary': return LucideIcons.fileText;
      case 'quiz': return LucideIcons.helpCircle;
      case 'tutor': return LucideIcons.messageSquare;
      case 'study': return LucideIcons.bookOpen;
      case 'flashcard': return LucideIcons.layers;
      default: return LucideIcons.zap;
    }
  }

  String _formatTime(String isoTime) {
    if (isoTime.isEmpty) return 'RECENT';
    try {
      final dt = DateTime.parse(isoTime);
      return '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')} UTC';
    } catch (_) {
      return 'RECENT';
    }
  }
}
