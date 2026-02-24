import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class MathSolverScreen extends StatefulWidget {
  const MathSolverScreen({super.key});

  @override
  State<MathSolverScreen> createState() => _MathSolverScreenState();
}

class _MathSolverScreenState extends State<MathSolverScreen> {
  final _problemController = TextEditingController();
  bool _isSolving = false;
  List<String>? _steps;

  void _solveProblem() {
    if (_problemController.text.isEmpty) return;
    setState(() {
      _isSolving = true;
      _steps = null;
    });
    
    // Simulate AI solving
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isSolving = false;
          _steps = [
            '1. Identify the equation components.',
            '2. Apply the quadratic formula x = [-b ± sqrt(b² - 4ac)] / 2a.',
            '3. Substitute the values: a=1, b=-5, c=6.',
            '4. Solve for x: x = 2 and x = 3.'
          ];
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Math Solver')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Enter a math problem or equation below.', style: TextStyle(color: Colors.white70)),
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
                    controller: _problemController,
                    maxLines: 3,
                    decoration: const InputDecoration(
                      hintText: 'e.g. x^2 - 5x + 6 = 0',
                      border: InputBorder.none,
                    ),
                  ),
                  const Divider(color: Colors.white10),
                  Row(
                    children: [
                      IconButton(icon: const Icon(LucideIcons.camera, size: 20), onPressed: () {}),
                      const Spacer(),
                      ElevatedButton(
                        onPressed: _isSolving ? null : _solveProblem,
                        style: ElevatedButton.styleFrom(minimumSize: const Size(100, 40)),
                        child: _isSolving ? const SizedBox(height: 18, width: 18, child: CircularProgressIndicator(strokeWidth: 2)) : const Text('SOLVE'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            if (_steps != null) ...[
              const SizedBox(height: 40),
              const Text('SOLUTION STEPS', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
              const SizedBox(height: 16),
              ..._steps!.map((step) => Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
                child: Text(step, style: const TextStyle(height: 1.5)),
              )),
            ],
          ],
        ),
      ),
    );
  }
}
