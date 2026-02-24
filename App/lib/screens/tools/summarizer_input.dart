import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SummarizerInputScreen extends StatefulWidget {
  const SummarizerInputScreen({super.key});

  @override
  State<SummarizerInputScreen> createState() => _SummarizerInputScreenState();
}

class _SummarizerInputScreenState extends State<SummarizerInputScreen> {
  final _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Text Summarizer', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          IconButton(icon: const Icon(LucideIcons.history), onPressed: () {}),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Paste your study notes below and AI will make a short summary for you.',
              style: TextStyle(color: Colors.white70),
            ),
            const SizedBox(height: 24),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppConstants.surfaceColor,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: TextField(
                  controller: _textController,
                  maxLines: null,
                  decoration: const InputDecoration(
                    hintText: 'Type or paste text here...',
                    border: InputBorder.none,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                if (_textController.text.isNotEmpty) {
                  // Navigate to result (to be implemented)
                }
              },
              child: const Text('SUMMARIZE NOW'),
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
