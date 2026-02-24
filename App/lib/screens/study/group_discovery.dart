import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class GroupDiscoveryScreen extends StatelessWidget {
  const GroupDiscoveryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final groups = [
      {'name': 'Medical Scholars', 'members': '1.2k members', 'tag': 'Medical'},
      {'name': 'Legal Mindset', 'members': '850 members', 'tag': 'Law'},
      {'name': 'Code Crafters', 'members': '2.1k members', 'tag': 'CS'},
      {'name': 'History Buffs', 'members': '430 members', 'tag': 'History'},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Study Groups')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(AppConstants.defaultPadding),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search for groups...',
                prefixIcon: const Icon(LucideIcons.search, size: 20),
                fillColor: AppConstants.surfaceColor,
                filled: true,
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: AppConstants.defaultPadding),
              itemCount: groups.length,
              itemBuilder: (context, index) {
                final group = groups[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(20)),
                  child: Row(
                    children: [
                      CircleAvatar(
                        backgroundColor: AppConstants.primaryColor.withOpacity(0.1),
                        child: Text(group['tag']!, style: const TextStyle(color: AppConstants.primaryColor, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                      const SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(group['name']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          Text(group['members']!, style: const TextStyle(color: Colors.white54, fontSize: 12)),
                        ],
                      ),
                      const Spacer(),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          minimumSize: const Size(80, 40),
                          padding: EdgeInsets.zero,
                          textStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                        child: const Text('JOIN'),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
