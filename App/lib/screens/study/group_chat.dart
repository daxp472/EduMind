import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class GroupChatScreen extends StatelessWidget {
  final String groupName;

  const GroupChatScreen({super.key, required this.groupName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(groupName, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const Text('24 people online', style: TextStyle(fontSize: 10, color: Colors.green)),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: 10,
              itemBuilder: (context, index) {
                final isMe = index % 3 == 0;
                return Align(
                  alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isMe ? AppConstants.primaryColor : AppConstants.surfaceColor,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (!isMe) const Text('Student AI', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white54)),
                        Text('Working on the biology summary!', style: const TextStyle(fontSize: 14)),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            color: AppConstants.surfaceColor,
            child: SafeArea(
              child: Row(
                children: [
                  const Icon(LucideIcons.plusCircle, color: Colors.white24),
                  const SizedBox(width: 12),
                  const Expanded(child: TextField(decoration: InputDecoration(hintText: 'Type a message...', border: InputBorder.none))),
                  IconButton(icon: const Icon(LucideIcons.send, color: AppConstants.primaryColor), onPressed: () {}),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
