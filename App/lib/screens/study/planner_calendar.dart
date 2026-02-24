import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class PlannerCalendarScreen extends StatelessWidget {
  const PlannerCalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Study Planner')),
      body: Column(
        children: [
          // Simplified Calendar View
          Container(
            padding: const EdgeInsets.all(16),
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppConstants.surfaceColor,
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('February 2026', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                    Row(
                      children: [
                        IconButton(icon: const Icon(LucideIcons.chevronLeft), onPressed: () {}),
                        IconButton(icon: const Icon(LucideIcons.chevronRight), onPressed: () {}),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                // Days of week
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => Text(d, style: const TextStyle(color: Colors.white54))).toList(),
                ),
                const SizedBox(height: 12),
                // Simple placeholder for dates
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 7),
                  itemCount: 28,
                  itemBuilder: (context, index) {
                    final isToday = index + 1 == 24;
                    return Center(
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: isToday ? AppConstants.primaryColor : Colors.transparent,
                          shape: BoxShape.circle,
                        ),
                        child: Text('${index + 1}', style: TextStyle(color: isToday ? Colors.white : Colors.white70)),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('TODAY\'S TASKS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, letterSpacing: 1.2)),
                TextButton(onPressed: () {}, child: const Text('Add Task')),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildTaskItem('Biology Review', '2:00 PM - 3:30 PM', true),
                _buildTaskItem('Math Exercises', '4:00 PM - 5:00 PM', false),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTaskItem(String title, String time, bool isDone) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppConstants.surfaceColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(isDone ? LucideIcons.checkCircle : LucideIcons.circle, color: isDone ? Colors.green : Colors.white24),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: TextStyle(fontWeight: FontWeight.bold, decoration: isDone ? TextDecoration.lineThrough : null)),
              Text(time, style: const TextStyle(color: Colors.white54, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }
}
