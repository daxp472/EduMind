import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class AchievementsScreen extends StatelessWidget {
  const AchievementsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final achievements = [
      {'name': 'Early Bird', 'desc': 'Studied before 7 AM', 'unlocked': true, 'icon': LucideIcons.sun},
      {'name': 'Quiz Master', 'desc': 'Got 100% on 5 quizzes', 'unlocked': true, 'icon': LucideIcons.award},
      {'name': 'Heavy Reader', 'desc': 'Summarized 10k words', 'unlocked': false, 'icon': LucideIcons.bookOpen},
      {'name': 'Social Butterly', 'desc': 'Joined 3 study groups', 'unlocked': false, 'icon': LucideIcons.users},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Achievements')),
      body: GridView.builder(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 16, mainAxisSpacing: 16, childAspectRatio: 0.8),
        itemCount: achievements.length,
        itemBuilder: (context, index) {
          final ach = achievements[index];
          final unlocked = ach['unlocked'] as bool;
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppConstants.surfaceColor,
              borderRadius: BorderRadius.circular(20),
              border: unlocked ? Border.all(color: AppConstants.primaryColor.withOpacity(0.5)) : null,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(ach['icon'] as IconData, size: 48, color: unlocked ? AppConstants.primaryColor : Colors.white10),
                const SizedBox(height: 16),
                Text(ach['name'] as String, style: TextStyle(fontWeight: FontWeight.bold, color: unlocked ? Colors.white : Colors.white24)),
                const SizedBox(height: 8),
                Text(ach['desc'] as String, textAlign: TextAlign.center, style: TextStyle(fontSize: 10, color: unlocked ? Colors.white54 : Colors.white10)),
              ],
            ),
          );
        },
      ),
    );
  }
}
