import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class NotesListScreen extends StatelessWidget {
  const NotesListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final notes = [
      {'title': 'QUANTUM BIOLOGY: RESPIRATION', 'date': '2 HOURS AGO', 'preview': 'Analyzing the cellular respiration protocols and high-density energy transfer mechanisms...'},
      {'title': 'NEURAL CALCULUS', 'date': 'YESTERDAY', 'preview': 'Integration of multi-dimensional data streams and derivative analysis for predictive models...'},
      {'title': 'ARCHAIC HISTORY LOGS', 'date': 'FEB 20', 'preview': 'Deconstructing the socio-political architecture of the Roman Empire and its structural legacy...'},
      {'title': 'ORGANIC CHEMISTRY', 'date': 'FEB 18', 'preview': 'Molecular structural integrity analysis and synthesis pathways for high-stability compounds...'},
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
                'NEURAL VAULT',
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
                  final note = notes[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: PremiumCard(
                      onTap: () => Navigator.pushNamed(context, '/note_editor', arguments: 'id_$index'),
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Text(
                                  note['title']!,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w900,
                                    fontSize: 14,
                                    letterSpacing: 0.5,
                                    color: Colors.white,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              const Icon(LucideIcons.shieldCheck, size: 14, color: AppColors.primary),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            note['preview']!,
                            style: const TextStyle(
                              color: AppColors.textSecondary,
                              fontSize: 11,
                              height: 1.6,
                              fontWeight: FontWeight.w500,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                note['date']!,
                                style: const TextStyle(
                                  color: AppColors.textMuted,
                                  fontSize: 9,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: 1.0,
                                ),
                              ),
                              const Icon(LucideIcons.chevronRight, size: 14, color: Colors.white10),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ).animate().fadeIn(delay: (index * 50).ms).slideY(begin: 0.1);
                },
                childCount: notes.length,
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/note_editor'),
        backgroundColor: AppColors.primary,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        elevation: 10,
        child: const Icon(LucideIcons.plus, color: Colors.white),
      ).animate().scale(delay: 400.ms, curve: Curves.elasticOut),
    );
  }
}
