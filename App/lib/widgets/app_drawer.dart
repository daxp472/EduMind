import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../core/app_colors.dart';
import '../providers/auth_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;

    return Drawer(
      backgroundColor: AppColors.background,
      child: Container(
        decoration: BoxDecoration(
          border: Border(right: BorderSide(color: Colors.white.withOpacity(0.05), width: 1)),
        ),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Drawer Header
              Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        gradient: AppColors.primaryGradient,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(color: AppColors.primary.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8)),
                        ],
                      ),
                      child: Center(
                        child: Text(
                          user?.name.substring(0, 1).toUpperCase() ?? 'E',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      user?.name.toUpperCase() ?? 'NEURAL SCHOLAR',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      user?.email.toLowerCase() ?? 'connection@active',
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ).animate().fadeIn().slideX(begin: -0.1),

              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 32),
                child: Divider(color: Colors.white10),
              ),

              Expanded(
                child: ListView(
                  padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _buildDrawerSection('SYSTEM CONFIG'),
                    _buildDrawerItem(
                      context,
                      LucideIcons.settings,
                      'TERMINAL SETTINGS',
                      () => Navigator.pushNamed(context, '/settings'),
                    ),
                    _buildDrawerItem(
                      context,
                      LucideIcons.shield,
                      'SECURITY PROTOCOLS',
                      () => Navigator.pushNamed(context, '/security'),
                    ),
                    const SizedBox(height: 24),
                    _buildDrawerSection('KNOWLEDGE BASE'),
                    _buildDrawerItem(
                      context,
                      LucideIcons.helpCircle,
                      'SUPPORT HUB (FAQ)',
                      () => Navigator.pushNamed(context, '/help'),
                    ),
                    _buildDrawerItem(
                      context,
                      LucideIcons.info,
                      'SYSTEM ARCHITECTURE',
                      () => Navigator.pushNamed(context, '/about'),
                    ),
                    _buildDrawerItem(
                      context,
                      LucideIcons.fileText,
                      'LEGAL DIRECTIVES',
                      () => Navigator.pushNamed(context, '/privacy'),
                    ),
                  ],
                ),
              ),

              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 32),
                child: Divider(color: Colors.white10),
              ),

              Padding(
                padding: const EdgeInsets.all(32.0),
                child: InkWell(
                  onTap: () {
                    context.read<AuthProvider>().logout();
                    Navigator.pushReplacementNamed(context, '/login');
                  },
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF43F5E).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(LucideIcons.logOut, color: Color(0xFFF43F5E), size: 18),
                      ),
                      const SizedBox(width: 16),
                      const Text(
                        'TERMINATE SESSION',
                        style: TextStyle(
                          color: Color(0xFFF43F5E),
                          fontWeight: FontWeight.w900,
                          fontSize: 10,
                          letterSpacing: 1.2,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDrawerSection(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 16, bottom: 12, top: 8),
      child: Text(
        title,
        style: const TextStyle(
          color: AppColors.textMuted,
          fontSize: 9,
          fontWeight: FontWeight.w900,
          letterSpacing: 2.0,
        ),
      ),
    );
  }

  Widget _buildDrawerItem(BuildContext context, IconData icon, String label, VoidCallback onTap) {
    return ListTile(
      onTap: onTap,
      dense: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      leading: Icon(icon, color: AppColors.textSecondary, size: 18),
      title: Text(
        label,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.w900,
          letterSpacing: 0.5,
        ),
      ),
      trailing: const Icon(LucideIcons.chevronRight, size: 14, color: Colors.white10),
    ).animate().fadeIn(delay: 100.ms);
  }
}
