import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class NotesListScreen extends StatelessWidget {
  const NotesListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final notes = [
      {'title': 'Biology: Respiration', 'date': '2 hours ago', 'preview': 'Focus on the cellular respiration process tonight and focus on...'},
      {'title': 'Math Formulas', 'date': 'Yesterday', 'preview': 'Calculus derivatives and integrals to remember...'},
      {'title': 'History Notes', 'date': 'Feb 20', 'preview': 'The rise of the Roman Empire and its impact on modern...'},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('My Notes')),
      body: ListView.builder(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        itemCount: notes.length,
        itemBuilder: (context, index) {
          final note = notes[index];
          return InkWell(
            onTap: () => Navigator.pushNamed(context, '/note_editor', arguments: 'id_$index'),
            child: Container(
              margin: const EdgeInsets.only(bottom: 16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppConstants.surfaceColor,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(note['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                      const Icon(LucideIcons.cloudOff, size: 12, color: AppConstants.primaryColor),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(note['preview']!, style: const TextStyle(color: Colors.white54, fontSize: 13, height: 1.4), maxLines: 2, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 16),
                  Text(note['date']!, style: const TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/note_editor'),
        backgroundColor: AppConstants.primaryColor,
        child: const Icon(LucideIcons.plus),
      ),
    );
  }
}
