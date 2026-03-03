import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../providers/achievements_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class AchievementsScreen extends StatefulWidget {
  const AchievementsScreen({super.key});

  @override
  State<AchievementsScreen> createState() => _AchievementsScreenState();
}

class _AchievementsScreenState extends State<AchievementsScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      context.read<AchievementsProvider>().fetchAchievements();
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
          'NEURAL ACHIEVEMENTS',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: Consumer<AchievementsProvider>(
        builder: (context, provider, _) {
          if (provider.isLoading && provider.achievements.isEmpty) {
            return const Center(child: CircularProgressIndicator(color: AppColors.primary));
          }

          final achievements = provider.achievements;

          if (achievements.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(LucideIcons.award, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                  const SizedBox(height: 16),
                  const Text(
                    'NO ACHIEVEMENTS YET',
                    style: TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.w900),
                  ),
                ],
              ),
            );
          }

          return GridView.builder(
            padding: const EdgeInsets.all(24),
            physics: const BouncingScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 0.85,
            ),
            itemCount: achievements.length,
            itemBuilder: (context, index) {
              final ach = achievements[index];
              final unlocked = ach['unlocked'] == true;
              final colorStr = ach['color']?.toString() ?? '0xFF3B82F6';
              final color = Color(int.parse(colorStr.replaceAll('#', '0xFF')));

              return PremiumCard(
                padding: const EdgeInsets.all(20),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: unlocked ? color.withOpacity(0.1) : Colors.white.withOpacity(0.02),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        _getAchievementIcon(ach['icon']?.toString() ?? ''),
                        size: 32,
                        color: unlocked ? color : AppColors.textMuted.withOpacity(0.3),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      (ach['name'] ?? 'Unknown').toString().toUpperCase(),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        fontSize: 11,
                        letterSpacing: 0.5,
                        color: unlocked ? Colors.white : AppColors.textMuted,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      ach['description'] ?? ach['desc'] ?? '',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.w600,
                        height: 1.4,
                        color: unlocked ? AppColors.textSecondary : AppColors.textMuted.withOpacity(0.5),
                      ),
                    ),
                  ],
                ).animate().fadeIn(delay: (index * 50).ms).scale(begin: const Offset(0.9, 0.9)),
              );
            },
          );
        },
      ),
    );
  }

  IconData _getAchievementIcon(String iconName) {
    switch (iconName.toLowerCase()) {
      case 'medal': return LucideIcons.medal;
      case 'award': return LucideIcons.award;
      case 'zap': return LucideIcons.zap;
      case 'star': return LucideIcons.star;
      case 'book': return LucideIcons.book;
      case 'users': return LucideIcons.users;
      default: return LucideIcons.award;
    }
  }
}
