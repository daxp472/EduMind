import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class FlashcardStudyScreen extends StatefulWidget {
  const FlashcardStudyScreen({super.key});

  @override
  State<FlashcardStudyScreen> createState() => _FlashcardStudyScreenState();
}

class _FlashcardStudyScreenState extends State<FlashcardStudyScreen> {
  bool _showAnswer = false;
  int _currentIndex = 0;

  final List<Map<String, String>> _cards = [
    {'q': 'WHAT IS THE POWERHOUSE OF THE CELL?', 'a': 'MITOCHONDRIA: THE PRIMARY ENERGY CONVERTER ARCHITECTURE.'},
    {'q': 'WHO INITIALIZED THE ROMEO & JULIET PROTOCOL?', 'a': 'WILLIAM SHAKESPEARE: LITERARY CORE ARCHITECT.'},
    {'q': 'SQUARE ROOT OF 144?', 'a': '12: NUMERICAL CONSTANT.'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(LucideIcons.x, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'STUDYING: ${_currentIndex + 1} / ${_cards.length}',
          style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
        child: Column(
          children: [
            const SizedBox(height: 12),
            Stack(
              children: [
                Container(
                  height: 6,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.02),
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
                AnimatedContainer(
                  duration: 400.ms,
                  height: 6,
                  width: (MediaQuery.of(context).size.width - 48) * ((_currentIndex + 1) / _cards.length),
                  decoration: BoxDecoration(
                    gradient: AppColors.primaryGradient,
                    borderRadius: BorderRadius.circular(3),
                    boxShadow: [
                      BoxShadow(color: AppColors.primary.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 4)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 60),
            Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _showAnswer = !_showAnswer),
                child: PremiumCard(
                  padding: const EdgeInsets.all(40),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          _showAnswer ? 'RESPONSE' : 'QUERY',
                          style: TextStyle(
                            color: _showAnswer ? AppColors.secondary : AppColors.primary,
                            fontSize: 10,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 3.0,
                          ),
                        ),
                        const SizedBox(height: 40),
                        Text(
                          _showAnswer ? _cards[_currentIndex]['a']! : _cards[_currentIndex]['q']!,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                            letterSpacing: -0.5,
                            height: 1.4,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          'TAP TO FLIP',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.1),
                            fontSize: 9,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 2.0,
                          ),
                        ),
                      ],
                    ),
                  ),
                ).animate(target: _showAnswer ? 1 : 0).flip(duration: 500.ms, direction: Axis.horizontal),
              ),
            ),
            const SizedBox(height: 60),
            Row(
              children: [
                Expanded(
                  child: _buildActionButton(
                    'RE-SYNC',
                    LucideIcons.rotateCcw,
                    Colors.white.withOpacity(0.05),
                    () {
                      if (_currentIndex < _cards.length - 1) {
                        setState(() { _currentIndex++; _showAnswer = false; });
                      }
                    },
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildActionButton(
                    'GOT IT',
                    LucideIcons.check,
                    AppColors.primary.withOpacity(0.1),
                    () {
                      if (_currentIndex < _cards.length - 1) {
                        setState(() { _currentIndex++; _showAnswer = false; });
                      } else {
                        Navigator.pop(context);
                      }
                    },
                    isPrimary: true,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton(String label, IconData icon, Color bgColor, VoidCallback onTap, {bool isPrimary = false}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: isPrimary ? AppColors.primary.withOpacity(0.2) : Colors.white.withOpacity(0.05)),
          boxShadow: isPrimary ? [
            BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 20, offset: const Offset(0, 10)),
          ] : null,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 16, color: isPrimary ? AppColors.primary : Colors.white),
            const SizedBox(width: 12),
            Text(
              label,
              style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 12,
                letterSpacing: 1.0,
                color: isPrimary ? AppColors.primary : Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
