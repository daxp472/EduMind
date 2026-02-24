import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class QuizSetupScreen extends StatefulWidget {
  const QuizSetupScreen({super.key});

  @override
  State<QuizSetupScreen> createState() => _QuizSetupScreenState();
}

class _QuizSetupScreenState extends State<QuizSetupScreen> {
  String _selectedDifficulty = 'Medium';
  int _questionCount = 10;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Quiz')),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Choose your topic and difficulty to start.'),
            const SizedBox(height: 32),
            _buildSection('TOPIC', TextField(decoration: InputDecoration(hintText: 'e.g. Ancient Rome', labelText: 'What should we quiz on?'))),
            const SizedBox(height: 24),
            _buildSection('DIFFICULTY', Row(
              children: ['Easy', 'Medium', 'Hard'].map((d) {
                final isSelected = _selectedDifficulty == d;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _selectedDifficulty = d),
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        color: isSelected ? AppConstants.primaryColor : AppConstants.surfaceColor,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(child: Text(d, style: TextStyle(fontWeight: FontWeight.bold, color: isSelected ? Colors.white : Colors.white70))),
                    ),
                  ),
                );
              }).toList(),
            )),
            const SizedBox(height: 24),
            _buildSection('QUESTION COUNT', Slider(
              value: _questionCount.toDouble(),
              min: 5,
              max: 20,
              divisions: 3,
              label: _questionCount.toString(),
              activeColor: AppConstants.primaryColor,
              onChanged: (v) => setState(() => _questionCount = v.round()),
            )),
            const Spacer(),
            ElevatedButton(
              onPressed: () {},
              child: const Text('START QUIZ'),
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(String title, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
        const SizedBox(height: 12),
        child,
      ],
    );
  }
}
