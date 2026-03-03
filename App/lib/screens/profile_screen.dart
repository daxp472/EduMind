import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../core/app_colors.dart';
import '../widgets/premium_card.dart';
import '../widgets/premium_button.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.user;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          SliverAppBar(
            expandedHeight: 200.0,
            floating: false,
            pinned: true,
            elevation: 0,
            automaticallyImplyLeading: false,
            backgroundColor: AppColors.background,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppColors.primary.withOpacity(0.1), Colors.black],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const SizedBox(height: 40),
                      Container(
                        width: 100,
                        height: 100,
                        decoration: BoxDecoration(
                          gradient: AppColors.primaryGradient,
                          borderRadius: BorderRadius.circular(32),
                        ),
                        child: Center(
                          child: Text(
                            user?.name.substring(0, 1).toUpperCase() ?? 'S',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 40,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              title: Text(
                user?.name.toUpperCase() ?? 'SCHOLAR',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.0,
                ),
              ),
              centerTitle: true,
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  Text(
                    user?.email ?? 'offline@vault.com',
                    style: const TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 32),
                  _buildProfileItem(context, LucideIcons.shield, 'SUBSCRIPTION', user?.subscriptionPlan.toUpperCase() ?? 'FREE', '/subscription'),
                  _buildProfileItem(context, LucideIcons.settings, 'SETTINGS', 'CONFIGURE', '/settings'),
                  _buildProfileItem(context, LucideIcons.history, 'ACTIVITY LOG', 'VIEW', '/activity'),
                  _buildProfileItem(context, LucideIcons.award, 'ACHIEVEMENTS', 'VIEW', '/achievements'),
                  _buildProfileItem(context, LucideIcons.helpCircle, 'GET HELP', 'SUPPORT', '/help'),
                  const SizedBox(height: 40),
                  PremiumButton(
                    text: 'SECURE LOGOUT',
                    color: AppColors.error.withOpacity(0.1),
                    onPressed: () {
                      auth.logout();
                      Navigator.of(context).pushNamedAndRemoveUntil('/landing', (route) => false);
                    },
                  ),
                  const SizedBox(height: 100),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileItem(BuildContext context, IconData icon, String title, String value, String route) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: PremiumCard(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: InkWell(
          onTap: () => Navigator.pushNamed(context, route),
          child: Row(
            children: [
              Icon(icon, color: AppColors.primary, size: 20),
              const SizedBox(width: 16),
              Text(
                title,
                style: const TextStyle(color: Colors.white70, fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 0.5),
              ),
              const Spacer(),
              Text(
                value,
                style: const TextStyle(color: AppColors.textMuted, fontWeight: FontWeight.bold, fontSize: 11),
              ),
              const SizedBox(width: 8),
              const Icon(LucideIcons.chevronRight, size: 14, color: AppColors.textMuted),
            ],
          ),
        ),
      ),
    );
  }
}
