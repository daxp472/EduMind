import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class EssayAnalyzerScreen extends StatefulWidget {
  const EssayAnalyzerScreen({super.key});

  @override
  State<EssayAnalyzerScreen> createState() => _EssayAnalyzerScreenState();
}

class _EssayAnalyzerScreenState extends State<EssayAnalyzerScreen> {
  final _essayController = TextEditingController();
  bool _isAnalyzing = false;
  Map<String, dynamic>? _results;

  void _analyzeEssay() {
    if (_essayController.text.isEmpty) return;
    setState(() {
      _isAnalyzing = true;
      _results = null;
    });

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isAnalyzing = false;
          _results = {
            'score': 85,
            'feedback': 'Strong thesis statement, but consider strengthening the transition between paragraph 2 and 3.',
            'grammar': '2 minor errors found.',
            'suggestions': ['Use more varied vocabulary', 'Explicitly link evidence to the main claim']
          };
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Essay Analyzer')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Paste your essay draft to receive AI feedback and improvements.', style: TextStyle(color: Colors.white70)),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppConstants.surfaceColor,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Column(
                children: [
                  TextField(
                    controller: _essayController,
                    maxLines: 8,
                    decoration: const InputDecoration(
                      hintText: 'Paste your essay here...',
                      border: InputBorder.none,
                    ),
                  ),
                  const Divider(color: Colors.white10),
                  ElevatedButton(
                    onPressed: _isAnalyzing ? null : _analyzeEssay,
                    child: _isAnalyzing ? const CircularProgressIndicator() : const Text('ANALYZE ESSAY'),
                  ),
                ],
              ),
            ),
            if (_results != null) ...[
              const SizedBox(height: 32),
              _buildMetricCard('OVERALL SCORE', '${_results!['score']}/100', Colors.green),
              const SizedBox(height: 16),
              _buildFeedbackGroup('FEEDBACK', _results!['feedback']),
              const SizedBox(height: 16),
              _buildFeedbackGroup('SUGGESTIONS', (_results!['suggestions'] as List).join('\n• ')),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildMetricCard(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(20), border: Border.all(color: color.withOpacity(0.2))),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          Text(value, style: TextStyle(fontWeight: FontWeight.w900, fontSize: 24, color: color)),
        ],
      ),
    );
  }

  Widget _buildFeedbackGroup(String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
        const SizedBox(height: 12),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
          child: Text(content, style: const TextStyle(height: 1.5)),
        ),
      ],
    );
  }
}
