import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class FlashcardDeckListScreen extends StatelessWidget {
  const FlashcardDeckListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final decks = [
      {'name': 'BIOLOGY: CELLULAR PHASES', 'count': '24 DATA NODES', 'color': const Color(0xFF10B981)},
      {'name': 'NEURAL CALCULUS: DERIVATIVES', 'count': '15 DATA NODES', 'color': AppColors.primary},
      {'name': 'ARCHAIC HISTORY: ROME', 'count': '40 DATA NODES', 'color': const Color(0xFFF97316)},
      {'name': 'ORGANIC CHEMISTRY: BONDS', 'count': '32 DATA NODES', 'color': const Color(0xFFF43F5E)},
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 120.0,
            floating: true,
            pinned: true,
            elevation: 0,
            backgroundColor: AppColors.background.withOpacity(0.9),
            flexibleSpace: const FlexibleSpaceBar(
              title: Text(
                'NEURAL DECKS',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                  color: Colors.white,
                ),
              ),
              centerTitle: true,
            ),
            actions: [
              IconButton(
                icon: const Icon(LucideIcons.search, size: 20, color: AppColors.textSecondary),
                onPressed: () {},
              ),
              const SizedBox(width: 8),
            ],
          ),
          SliverPadding(
            padding: const EdgeInsets.all(24),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final deck = decks[index];
                  final color = deck['color'] as Color;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: PremiumCard(
                      onTap: () => Navigator.pushNamed(context, '/flashcard_study', arguments: deck['name']),
                      padding: const EdgeInsets.all(24),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: color.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Icon(LucideIcons.layers, color: color, size: 20),
                          ),
                          const SizedBox(width: 20),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  (deck['name'] as String).toUpperCase(),
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w900,
                                    fontSize: 13,
                                    letterSpacing: 0.5,
                                    color: Colors.white,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  deck['count'] as String,
                                  style: const TextStyle(
                                    color: AppColors.textMuted,
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const Icon(LucideIcons.play, color: AppColors.primary, size: 16),
                        ],
                      ),
                    ),
                  ).animate().fadeIn(delay: (index * 50).ms).slideX(begin: 0.1);
                },
                childCount: decks.length,
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppColors.primary,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        child: const Icon(LucideIcons.plus, color: Colors.white),
      ).animate().scale(delay: 400.ms, curve: Curves.elasticOut),
    );
  }
}
