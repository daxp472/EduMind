import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'CONFIGURATIONS',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        children: [
          _buildSettingsGroup('NEURAL ACCOUNT', [
            _buildSettingsItem(LucideIcons.user, 'IDENTITY PROFILE', 'Manage your biometric data', () {}),
            _buildSettingsItem(LucideIcons.lock, 'SECURITY PROTOCOLS', 'Encryption and access logs', () {}),
            _buildSettingsItem(LucideIcons.bell, 'NOTIFICATION SYNC', 'Real-time alert coordination', () {}),
          ]),
          const SizedBox(height: 32),
          _buildSettingsGroup('INTERFACE PREFERENCES', [
            _buildSettingsItem(
              LucideIcons.moon,
              'DARK MODE',
              'Optimal low-light visibility',
              () {},
              trailing: Switch(
                value: true,
                onChanged: (v) {},
                activeColor: AppColors.primary,
                activeTrackColor: AppColors.primary.withOpacity(0.2),
              ),
            ),
            _buildSettingsItem(LucideIcons.globe, 'LINGUISTIC ENGINE', 'System language selection', () {}, value: 'ENGLISH (US)'),
          ]),
          const SizedBox(height: 32),
          _buildSettingsGroup('KNOWLEDGE SUPPORT', [
            _buildSettingsItem(LucideIcons.helpCircle, 'RECURRING QUERIES (FAQ)', 'Instant help documentation', () {}),
            _buildSettingsItem(LucideIcons.info, 'ABOUT PROJECT EDUMIND', 'System architecture and legal', () {}),
            _buildSettingsItem(LucideIcons.fileText, 'PRIVACY DIRECTIVES', 'Data handling transparency', () {}),
          ]),
          const SizedBox(height: 48),
          TextButton(
            onPressed: () {},
            child: const Text(
              'TERMINATE SESSION (LOGOUT)',
              style: TextStyle(
                color: Color(0xFFF43F5E),
                fontWeight: FontWeight.w900,
                fontSize: 10,
                letterSpacing: 1.5,
              ),
            ),
          ).animate().fadeIn(delay: 800.ms),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildSettingsGroup(String title, List<Widget> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8, bottom: 16),
          child: Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w900,
              color: AppColors.textMuted,
              fontSize: 10,
              letterSpacing: 1.2,
            ),
          ),
        ),
        PremiumCard(
          padding: EdgeInsets.zero,
          child: Column(children: items),
        ),
      ],
    ).animate().fadeIn().slideY(begin: 0.05);
  }

  Widget _buildSettingsItem(IconData icon, String title, String subtitle, VoidCallback onTap, {Widget? trailing, String? value}) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      leading: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.03),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, size: 18, color: Colors.white70),
      ),
      title: Text(
        title,
        style: const TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w900,
          letterSpacing: 0.2,
          color: Colors.white,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(
          fontSize: 10,
          color: AppColors.textMuted,
          fontWeight: FontWeight.w500,
        ),
      ),
      trailing: trailing ?? Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (value != null)
            Text(
              value,
              style: const TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w900),
            ),
          const SizedBox(width: 8),
          const Icon(LucideIcons.chevronRight, size: 14, color: AppColors.textMuted),
        ],
      ),
      onTap: onTap,
    );
  }
}
