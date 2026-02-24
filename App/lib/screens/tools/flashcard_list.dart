import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class FlashcardDeckListScreen extends StatelessWidget {
  const FlashcardDeckListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final decks = [
      {'name': 'Biology: Cells', 'count': '24 Cards', 'color': Colors.green},
      {'name': 'Math: Formulas', 'count': '15 Cards', 'color': Colors.blue},
      {'name': 'History: Rome', 'count': '40 Cards', 'color': Colors.orange},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Flashcards')),
      body: ListView.builder(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        itemCount: decks.length,
        itemBuilder: (context, index) {
          final deck = decks[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 16),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(20)),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: (deck['color'] as Color).withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                  child: Icon(LucideIcons.layoutGrid, color: deck['color'] as Color),
                ),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(deck['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    Text(deck['count'] as String, style: const TextStyle(color: Colors.white54, fontSize: 12)),
                  ],
                ),
                const Spacer(),
                const Icon(LucideIcons.play, color: AppConstants.primaryColor, size: 20),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(onPressed: () {}, child: const Icon(LucideIcons.plus)),
    );
  }
}
