import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../providers/study_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SubjectListScreen extends StatefulWidget {
  const SubjectListScreen({super.key});

  @override
  State<SubjectListScreen> createState() => _SubjectListScreenState();
}

class _SubjectListScreenState extends State<SubjectListScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      context.read<StudyProvider>().fetchMaterials();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 140.0,
            floating: true,
            pinned: true,
            elevation: 0,
            automaticallyImplyLeading: false,
            backgroundColor: AppColors.background.withOpacity(0.9),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                children: [
                  Positioned(
                    top: -40,
                    right: -40,
                    child: Container(
                      width: 160,
                      height: 160,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColors.primary.withOpacity(0.02),
                      ),
                    ),
                  ),
                ],
              ),
              title: const Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'SUBJECT VAULT',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2.0,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    'Operational knowledge clusters.',
                    style: TextStyle(
                      fontSize: 8,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textSecondary,
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
              centerTitle: false,
              titlePadding: const EdgeInsets.only(left: 24, bottom: 24),
            ),
            actions: [
              IconButton(
                icon: const Icon(LucideIcons.search, size: 20, color: AppColors.textSecondary),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(LucideIcons.plus, color: AppColors.primary, size: 22),
                onPressed: () {},
              ),
              const SizedBox(width: 8),
            ],
          ),
          Consumer<StudyProvider>(
            builder: (context, studyProvider, _) {
              if (studyProvider.isLoading && studyProvider.materials.isEmpty) {
                return const SliverFillRemaining(
                  child: Center(
                    child: CircularProgressIndicator(color: AppColors.primary),
                  ),
                );
              }

              final subjects = studyProvider.materials;

              if (subjects.isEmpty) {
                return SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(LucideIcons.bookOpen, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                        const SizedBox(height: 16),
                        const Text(
                          'NO SUBJECTS FOUND',
                          style: TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.w900, letterSpacing: 1.0),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Tap + to create your first study material.',
                          style: TextStyle(color: AppColors.textSecondary, fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return SliverPadding(
                padding: const EdgeInsets.all(24.0),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final subject = subjects[index];
                      return _buildSubjectCard(context, subject, index);
                    },
                    childCount: subjects.length,
                  ),
                ),
              );
            },
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 120)),
        ],
      ),
    );
  }

  Widget _buildSubjectCard(BuildContext context, Map<String, dynamic> subject, int index) {
    final name = subject['title'] ?? subject['name'] ?? 'Unknown Subject';
    final topics = subject['description'] ?? subject['topics'] ?? '0 RESEARCH NODES';
    final colorStr = subject['color']?.toString();
    final color = colorStr != null ? Color(int.parse(colorStr.replaceAll('#', '0xFF'))) : AppColors.primary;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: PremiumCard(
        padding: const EdgeInsets.all(24),
        onTap: () => Navigator.pushNamed(context, '/subject_detail', arguments: name),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(_getSubjectIcon(subject['type'] ?? ''), color: color, size: 22),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name.toString().toUpperCase(),
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 13,
                      letterSpacing: 0.5,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    topics.toString(),
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(LucideIcons.chevronRight, size: 14, color: Colors.white12),
          ],
        ),
      ),
    ).animate().fadeIn(delay: (index * 80).ms, duration: 500.ms).slideX(begin: 0.1, curve: Curves.easeOut);
  }

  IconData _getSubjectIcon(String type) {
    switch (type.toLowerCase()) {
      case 'math': return LucideIcons.calculator;
      case 'science': return LucideIcons.beaker;
      case 'biology': return LucideIcons.dna;
      case 'history': return LucideIcons.landmark;
      case 'physics': return LucideIcons.zap;
      case 'literature': return LucideIcons.book;
      default: return LucideIcons.bookOpen;
    }
  }
}
