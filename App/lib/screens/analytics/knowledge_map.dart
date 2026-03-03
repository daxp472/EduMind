import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../providers/analytics_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class KnowledgeMapScreen extends StatefulWidget {
  const KnowledgeMapScreen({super.key});

  @override
  State<KnowledgeMapScreen> createState() => _KnowledgeMapScreenState();
}

class _KnowledgeMapScreenState extends State<KnowledgeMapScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      context.read<AnalyticsProvider>().fetchStats();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'KNOWLEDGE ARCHITECTURE',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: Consumer<AnalyticsProvider>(
        builder: (context, provider, _) {
          if (provider.isLoading && provider.stats.isEmpty) {
            return const Center(child: CircularProgressIndicator(color: AppColors.primary));
          }

          final stats = provider.stats;
          final subjects = stats['subjects'] as List<dynamic>? ?? [];

          return SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            physics: const BouncingScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(),
                const SizedBox(height: 32),
                const Text(
                  'NEURAL NODES ACTIVATED',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w900,
                    color: AppColors.primary,
                    letterSpacing: 1.2,
                  ),
                ).animate().fadeIn(),
                const SizedBox(height: 16),
                if (subjects.isEmpty) 
                  _buildEmptyState()
                else
                  _buildMap(subjects),
                const SizedBox(height: 40),
                _buildInsights(stats),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildHeader() {
    return PremiumCard(
      padding: const EdgeInsets.all(24),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: const Icon(LucideIcons.gitMerge, color: AppColors.primary, size: 24),
          ),
          const SizedBox(width: 20),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SYNC OVERVIEW',
                  style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 0.5),
                ),
                SizedBox(height: 4),
                Text(
                  'Visualization of your cross-disciplinary knowledge network.',
                  style: TextStyle(color: AppColors.textMuted, fontSize: 11, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    ).animate().fadeIn().slideY(begin: -0.1);
  }

  Widget _buildMap(List<dynamic> subjects) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: subjects.asMap().entries.map((entry) {
        final index = entry.key;
        final subject = entry.value as Map<String, dynamic>;
        final score = (subject['score'] ?? 0.0) as double;
        
        return Container(
          width: (MediaQuery.of(context).size.width - 64) / 2,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: Colors.white.withOpacity(0.03)),
          ),
          child: Column(
            children: [
              Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    width: 60,
                    height: 60,
                    child: CircularProgressIndicator(
                      value: score / 100,
                      strokeWidth: 4,
                      backgroundColor: Colors.white.withOpacity(0.05),
                      color: _getSubjectColor(index),
                    ),
                  ),
                  Text(
                    '${score.round()}%',
                    style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 12),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                (subject['name'] ?? 'UNKNOWN').toString().toUpperCase(),
                textAlign: TextAlign.center,
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 0.5),
              ),
            ],
          ),
        ).animate().fadeIn(delay: (index * 100).ms).scale(begin: const Offset(0.9, 0.9));
      }).toList(),
    );
  }

  Widget _buildInsights(Map<String, dynamic> stats) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'ARCHITECTURAL INSIGHTS',
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w900,
            color: AppColors.accent,
            letterSpacing: 1.2,
          ),
        ).animate().fadeIn(delay: 400.ms),
        const SizedBox(height: 16),
        PremiumCard(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              _buildInsightRow(LucideIcons.trendingUp, 'Strongest Node', stats['strongestSubject'] ?? 'N/A'),
              const Divider(color: Colors.white10, height: 32),
              _buildInsightRow(LucideIcons.alertTriangle, 'Focus Required', stats['weakestSubject'] ?? 'N/A'),
              const Divider(color: Colors.white10, height: 32),
              _buildInsightRow(LucideIcons.zap, 'Neural Velocity', '${stats['velocity'] ?? 0} IQ/hr'),
            ],
          ),
        ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),
      ],
    );
  }

  Widget _buildInsightRow(IconData icon, String label, String value) {
    return Row(
      children: [
        Icon(icon, color: AppColors.textMuted, size: 16),
        const SizedBox(width: 16),
        Text(
          label,
          style: const TextStyle(color: AppColors.textSecondary, fontSize: 12, fontWeight: FontWeight.w500),
        ),
        const Spacer(),
        Text(
          value.toString().toUpperCase(),
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 12),
        ),
      ],
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        children: [
          Icon(LucideIcons.database, size: 48, color: AppColors.textMuted.withOpacity(0.3)),
          const SizedBox(height: 16),
          const Text(
            'NO NEURAL DATA YET',
            style: TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.w900),
          ),
        ],
      ),
    );
  }

  Color _getSubjectColor(int index) {
    const colors = [AppColors.primary, AppColors.secondary, AppColors.accent, AppColors.success, Colors.orange, Colors.purple];
    return colors[index % colors.length];
  }
}
