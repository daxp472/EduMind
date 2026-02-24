import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../core/constants.dart';

class FlashcardStudyScreen extends StatefulWidget {
  const FlashcardStudyScreen({super.key});

  @override
  State<FlashcardStudyScreen> createState() => _FlashcardStudyScreenState();
}

class _FlashcardStudyScreenState extends State<FlashcardStudyScreen> {
  bool _showAnswer = false;
  int _currentIndex = 0;

  final List<Map<String, String>> _cards = [
    {'q': 'What is the powerhouse of the cell?', 'a': 'Mitochondria'},
    {'q': 'Who wrote "Romeo and Juliet"?', 'a': 'William Shakespeare'},
    {'q': 'What is the square root of 144?', 'a': '12'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Studying: ${_cards.length} Cards')),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          children: [
            LinearProgressIndicator(value: (_currentIndex + 1) / _cards.length, backgroundColor: Colors.white10),
            const SizedBox(height: 48),
            Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _showAnswer = !_showAnswer),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(32),
                  decoration: BoxDecoration(
                    color: AppConstants.surfaceColor,
                    borderRadius: BorderRadius.circular(32),
                    border: Border.all(color: AppConstants.primaryColor.withOpacity(0.3)),
                  ),
                  child: Center(
                    child: Text(
                      _showAnswer ? _cards[_currentIndex]['a']! : _cards[_currentIndex]['q']!,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                  ).animate(target: _showAnswer ? 1 : 0).flip(duration: 400.ms),
                ),
              ),
            ),
            const SizedBox(height: 48),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {
                      if (_currentIndex < _cards.length - 1) setState(() { _currentIndex++; _showAnswer = false; });
                    },
                    child: const Text('AGAIN'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      if (_currentIndex < _cards.length - 1) setState(() { _currentIndex++; _showAnswer = false; });
                      else Navigator.pop(context);
                    },
                    child: const Text('GOT IT'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
