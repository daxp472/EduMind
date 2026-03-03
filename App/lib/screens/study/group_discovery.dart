import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../providers/study_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class GroupDiscoveryScreen extends StatefulWidget {
  const GroupDiscoveryScreen({super.key});

  @override
  State<GroupDiscoveryScreen> createState() => _GroupDiscoveryScreenState();
}

class _GroupDiscoveryScreenState extends State<GroupDiscoveryScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      context.read<StudyProvider>().fetchGroups();
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
            expandedHeight: 120.0,
            floating: true,
            pinned: true,
            elevation: 0,
            backgroundColor: AppColors.background.withOpacity(0.9),
            flexibleSpace: const FlexibleSpaceBar(
              title: Text(
                'NEURAL NETWORKS',
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
                icon: const Icon(LucideIcons.filter, size: 20, color: AppColors.textSecondary),
                onPressed: () {},
              ),
              const SizedBox(width: 8),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.02),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: const TextField(
                  style: TextStyle(color: Colors.white, fontSize: 14),
                  decoration: InputDecoration(
                    hintText: 'Search for networks...',
                    hintStyle: TextStyle(color: AppColors.textMuted, fontSize: 13),
                    prefixIcon: Icon(LucideIcons.search, size: 18, color: AppColors.textSecondary),
                    border: InputBorder.none,
                  ),
                ),
              ).animate().fadeIn().slideY(begin: 0.1),
            ),
          ),
          Consumer<StudyProvider>(
            builder: (context, provider, _) {
              if (provider.isLoading && provider.groups.isEmpty) {
                return const SliverFillRemaining(
                  child: Center(child: CircularProgressIndicator(color: AppColors.primary)),
                );
              }

              final groups = provider.groups;

              if (groups.isEmpty) {
                return SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(LucideIcons.users, size: 48, color: AppColors.textMuted.withOpacity(0.5)),
                        const SizedBox(height: 16),
                        const Text(
                          'NO NETWORKS FOUND',
                          style: TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.w900),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return SliverPadding(
                padding: const EdgeInsets.all(24),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final group = groups[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: PremiumCard(
                          onTap: () => Navigator.pushNamed(context, '/group_chat', arguments: group['name']),
                          padding: const EdgeInsets.all(20),
                          child: Row(
                            children: [
                              Container(
                                width: 52,
                                height: 52,
                                decoration: BoxDecoration(
                                  color: AppColors.primary.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                child: Center(
                                  child: Text(
                                    (group['tag'] ?? group['category'] ?? 'NET').toString().toUpperCase().substring(0, index == 0 ? 3 : 2),
                                    style: const TextStyle(
                                      color: AppColors.primary,
                                      fontSize: 10,
                                      fontWeight: FontWeight.w900,
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 20),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      (group['name'] ?? 'Unknown Network').toString().toUpperCase(),
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w900,
                                        fontSize: 13,
                                        letterSpacing: 0.5,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      '${group['memberCount'] ?? group['members'] ?? '0'} NODES',
                                      style: const TextStyle(
                                        color: AppColors.textMuted,
                                        fontSize: 10,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              _buildJoinButton(context, group['id']?.toString() ?? ''),
                            ],
                          ),
                        ),
                      ).animate().fadeIn(delay: (200 + index * 50).ms).slideX(begin: 0.1);
                    },
                    childCount: groups.length,
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildJoinButton(BuildContext context, String groupId) {
    return InkWell(
      onTap: () async {
        if (groupId.isEmpty) return;
        final success = await context.read<StudyProvider>().joinGroup(groupId);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(success ? 'Joined network successfully' : 'Failed to join network'),
              backgroundColor: success ? AppColors.success : Colors.red,
            ),
          );
        }
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.primary.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.primary.withOpacity(0.2)),
        ),
        child: const Text(
          'JOIN',
          style: TextStyle(
            color: AppColors.primary,
            fontSize: 10,
            fontWeight: FontWeight.w900,
            letterSpacing: 1.0,
          ),
        ),
      ),
    );
  }
}
