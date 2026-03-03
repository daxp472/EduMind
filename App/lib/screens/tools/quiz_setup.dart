import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../widgets/premium_button.dart';
import '../../providers/ai_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class QuizSetupScreen extends StatefulWidget {
  const QuizSetupScreen({super.key});

  @override
  State<QuizSetupScreen> createState() => _QuizSetupScreenState();
}

class _QuizSetupScreenState extends State<QuizSetupScreen> {
  String _selectedDifficulty = 'Medium';
  double _questionCount = 10;
  final _topicController = TextEditingController();

  @override
  void dispose() {
    _topicController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'QUIZ FORGE',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, letterSpacing: 1.5),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'CHALLENGE PARAMETERS',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w900,
                color: AppColors.secondary,
                letterSpacing: 1.2,
              ),
            ).animate().fadeIn().slideX(begin: -0.1),
            const SizedBox(height: 24),
            _buildSection(
              'KNOWLEDGE DOMAIN',
              PremiumCard(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                child: TextField(
                  controller: _topicController,
                  style: const TextStyle(color: Colors.white, fontSize: 14),
                  decoration: const InputDecoration(
                    hintText: 'e.g. Molecular Biology or WWII',
                    hintStyle: TextStyle(color: AppColors.textMuted, fontSize: 14),
                    border: InputBorder.none,
                  ),
                ),
              ),
            ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.05),
            const SizedBox(height: 32),
            _buildSection(
              'COGNITIVE LOAD (DIFFICULTY)',
              Row(
                children: ['Easy', 'Medium', 'Hard'].map((d) {
                  final isSelected = _selectedDifficulty == d;
                  return Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _selectedDifficulty = d),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        decoration: BoxDecoration(
                          color: isSelected ? AppColors.secondary : AppColors.surface,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected ? Colors.white24 : Colors.white.withOpacity(0.03),
                          ),
                          boxShadow: isSelected ? [
                            BoxShadow(
                              color: AppColors.secondary.withOpacity(0.3),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            )
                          ] : [],
                        ),
                        child: Center(
                          child: Text(
                            d.toUpperCase(),
                            style: TextStyle(
                              fontWeight: FontWeight.w900,
                              fontSize: 11,
                              color: isSelected ? Colors.white : AppColors.textMuted,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.05),
            const SizedBox(height: 32),
            _buildSection(
              'ITERATION COUNT: ${_questionCount.round()}',
              PremiumCard(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
                child: SliderTheme(
                  data: SliderTheme.of(context).copyWith(
                    activeTrackColor: AppColors.secondary,
                    inactiveTrackColor: Colors.white.withOpacity(0.05),
                    thumbColor: Colors.white,
                    overlayColor: AppColors.secondary.withOpacity(0.1),
                    valueIndicatorColor: AppColors.secondary,
                  ),
                  child: Slider(
                    value: _questionCount,
                    min: 5,
                    max: 20,
                    divisions: 3,
                    label: _questionCount.round().toString(),
                    onChanged: (v) => setState(() => _questionCount = v),
                  ),
                ),
              ),
            ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.05),
            const SizedBox(height: 48),
            Consumer<AIProvider>(
              builder: (context, provider, _) {
                return PremiumButton(
                  text: 'INITIATE FORGE',
                  icon: LucideIcons.flame,
                  color: AppColors.secondary,
                  isLoading: provider.isLoading,
                  onPressed: () => _handleForge(provider),
                ).animate().fadeIn(delay: 400.ms).scale(begin: const Offset(0.9, 0.9));
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(String title, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            color: Colors.white38,
            fontSize: 10,
            letterSpacing: 1.0,
          ),
        ),
        const SizedBox(height: 12),
        child,
      ],
    );
  }

  void _handleForge(AIProvider provider) async {
    if (_topicController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please specify a knowledge domain first.'),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }

    final result = await provider.generateQuiz(
      topic: _topicController.text,
      numQuestions: _questionCount.round(),
      difficulty: _selectedDifficulty.toLowerCase(),
    );
    
    if (mounted && result != null) {
      Navigator.pushNamed(context, '/quiz_screen', arguments: result);
    } else if (mounted && provider.error != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.error!),
          backgroundColor: AppColors.error,
        ),
      );
    }
  }
}
