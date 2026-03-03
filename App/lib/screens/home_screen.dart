import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/auth_provider.dart';
import '../providers/activity_provider.dart';
import '../core/app_colors.dart';
import '../widgets/premium_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      context.read<ActivityProvider>().fetchRecentActivity();
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 160.0,
            floating: false,
            pinned: true,
            elevation: 0,
            automaticallyImplyLeading: false,
            backgroundColor: AppColors.background.withOpacity(0.95),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                children: [
                  Positioned(
                    top: -60,
                    right: -60,
                    child: Container(
                      width: 240,
                      height: 240,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColors.primary.withOpacity(0.03),
                      ),
                    ),
                  ),
                ],
              ),
              title: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'HELLO, ${user?.name.toUpperCase() ?? 'SCHOLAR'}',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      letterSpacing: -0.5,
                      color: Colors.white,
                    ),
                  ),
                  const Text(
                    'Operational intelligence active.',
                    style: TextStyle(
                      fontSize: 10,
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
              Container(
                margin: const EdgeInsets.only(right: 24, top: 12, bottom: 12),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.03),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: IconButton(
                  icon: const Icon(LucideIcons.bell, size: 18, color: AppColors.textSecondary),
                  onPressed: () {},
                ),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 12),
                  // Status Card
                  _buildStatusCard(context),
                  const SizedBox(height: 48),
                  _buildSectionHeader('CORE PROTOCOLS'),
                  const SizedBox(height: 24),
                  _buildToolGrid(context),
                  const SizedBox(height: 48),
                  _buildSectionHeader('NEURAL ACTIVITY'),
                  const SizedBox(height: 24),
                  _buildRecentActivity(),
                  const SizedBox(height: 120), // Space for bottom nav
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Row(
      children: [
        Container(
          width: 2,
          height: 16,
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(1),
            boxShadow: [
              BoxShadow(color: AppColors.primary.withOpacity(0.5), blurRadius: 4),
            ],
          ),
        ),
        const SizedBox(width: 12),
        Text(
          title,
          style: const TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w900,
            letterSpacing: 2.0,
            color: AppColors.textSecondary,
          ),
        ),
      ],
    ).animate().fadeIn().slideX(begin: -0.1);
  }

  Widget _buildStatusCard(BuildContext context) {
    return PremiumCard(
      padding: const EdgeInsets.all(32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'KNOWLEDGE INDEX',
                    style: TextStyle(
                      color: AppColors.textSecondary,
                      fontWeight: FontWeight.w900,
                      fontSize: 10,
                      letterSpacing: 1.5,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      const Text(
                        'LEVEL ',
                        style: TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 12,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const Text(
                        '14',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.w900,
                          letterSpacing: -1.0,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 20, offset: const Offset(0, 10)),
                  ],
                ),
                child: const Icon(LucideIcons.zap, color: AppColors.primary, size: 28),
              ),
            ],
          ),
          const SizedBox(height: 40),
          Stack(
            children: [
              Container(
                height: 8,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.03),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              AnimatedContainer(
                duration: 1.seconds,
                height: 8,
                width: (MediaQuery.of(context).size.width - 112) * 0.72,
                decoration: BoxDecoration(
                  gradient: AppColors.primaryGradient,
                  borderRadius: BorderRadius.circular(4),
                  boxShadow: [
                    BoxShadow(color: AppColors.primary.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
              ).animate().shimmer(duration: 2.seconds, color: Colors.white.withOpacity(0.2)),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              RichText(
                text: const TextSpan(
                  text: '8,240',
                  style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w900),
                  children: [
                    TextSpan(
                      text: ' / 10,000 NC',
                      style: TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
              ),
              const Text(
                '72% SYNC',
                style: TextStyle(
                  color: AppColors.primary,
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
        ],
      ),
    ).animate().fadeIn(duration: 800.ms).slideY(begin: 0.1);
  }

  Widget _buildToolGrid(BuildContext context) {
    final tools = [
      {'icon': LucideIcons.fileText, 'label': 'Summarize', 'color': AppColors.primary, 'route': '/summarizer'},
      {'icon': LucideIcons.helpCircle, 'label': 'Forge Quiz', 'color': AppColors.secondary, 'route': '/quiz_setup'},
      {'icon': LucideIcons.penTool, 'label': 'Essay Guru', 'color': const Color(0xFFF43F5E), 'route': '/essay_analyzer'},
      {'icon': LucideIcons.calculator, 'label': 'Math Solver', 'color': const Color(0xFFF59E0B), 'route': '/math_solver'},
      {'icon': LucideIcons.search, 'label': 'Library', 'color': const Color(0xFF3B82F6), 'route': '/history'},
      {'icon': LucideIcons.book, 'label': 'Vault', 'color': AppColors.accent, 'route': '/notes'},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1.0,
      ),
      itemCount: tools.length,
      itemBuilder: (context, index) {
        final tool = tools[index];
        final color = tool['color'] as Color;
        return PremiumCard(
          onTap: () => Navigator.pushNamed(context, tool['route'] as String),
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(tool['icon'] as IconData, color: color, size: 22),
              ),
              const Spacer(),
              Text(
                (tool['label'] as String).toUpperCase(),
                style: const TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 12,
                  letterSpacing: 0.5,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 6),
              Row(
                children: [
                  const Text(
                    'INITIALIZE',
                    style: TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 9,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.0,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Icon(LucideIcons.chevronRight, size: 10, color: color.withOpacity(0.5)),
                ],
              ),
            ],
          ),
        ).animate().fadeIn(delay: (index * 50).ms).scale(begin: const Offset(0.9, 0.9));
      },
    );
  }

  Widget _buildRecentActivity() {
    return Consumer<ActivityProvider>(
      builder: (context, activityProvider, _) {
        if (activityProvider.isLoading && activityProvider.activities.isEmpty) {
          return const Center(
            child: Padding(
              padding: EdgeInsets.all(32),
              child: CircularProgressIndicator(color: AppColors.primary),
            ),
          );
        }

        final activities = activityProvider.activities;

        if (activities.isEmpty) {
          return PremiumCard(
            padding: const EdgeInsets.all(32),
            child: Column(
              children: [
                Icon(LucideIcons.inbox, size: 32, color: AppColors.textMuted),
                const SizedBox(height: 12),
                const Text(
                  'NO RECENT ACTIVITY',
                  style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.0),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Start using AI tools to see your activity here.',
                  style: TextStyle(color: AppColors.textSecondary, fontSize: 10),
                ),
              ],
            ),
          );
        }

        return Column(
          children: activities.take(5).map((activity) {
            final type = activity['type'] ?? 'general';
            final color = _getActivityColor(type);
            final icon = _getActivityIcon(type);
            final title = activity['title'] ?? activity['type'] ?? 'Activity';
            final description = activity['description'] ?? '';
            final createdAt = activity['createdAt'] ?? '';

            return Container(
              margin: const EdgeInsets.only(bottom: 16),
              child: PremiumCard(
                padding: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: color.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Icon(icon, size: 20, color: color),
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            title.toString().toUpperCase(),
                            style: const TextStyle(
                              fontWeight: FontWeight.w900,
                              fontSize: 13,
                              letterSpacing: 0.5,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            description.toString().isNotEmpty ? description.toString() : _formatTime(createdAt.toString()),
                            style: const TextStyle(
                              color: AppColors.textMuted,
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Icon(LucideIcons.chevronRight, size: 14, color: Colors.white.withOpacity(0.1)),
                  ],
                ),
              ),
            );
          }).toList(),
        ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.1);
      },
    );
  }

  Color _getActivityColor(String type) {
    switch (type) {
      case 'summary': return AppColors.primary;
      case 'quiz': return AppColors.secondary;
      case 'tutor': return AppColors.accent;
      case 'flashcard': return const Color(0xFFF59E0B);
      case 'study': return AppColors.success;
      default: return AppColors.primary;
    }
  }

  IconData _getActivityIcon(String type) {
    switch (type) {
      case 'summary': return LucideIcons.fileText;
      case 'quiz': return LucideIcons.helpCircle;
      case 'tutor': return LucideIcons.messageSquare;
      case 'flashcard': return LucideIcons.layers;
      case 'study': return LucideIcons.bookOpen;
      default: return LucideIcons.zap;
    }
  }

  String _formatTime(String isoTime) {
    if (isoTime.isEmpty) return '';
    try {
      final dt = DateTime.parse(isoTime);
      final diff = DateTime.now().difference(dt);
      if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
      if (diff.inHours < 24) return '${diff.inHours}h ago';
      return '${diff.inDays}d ago';
    } catch (_) {
      return isoTime;
    }
  }
}

