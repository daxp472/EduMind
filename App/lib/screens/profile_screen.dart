import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/auth_provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.user;

    return Scaffold(
      backgroundColor: AppConstants.backgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('ID PROFILE', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, letterSpacing: 1)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          children: [
            CircleAvatar(
              radius: 50,
              backgroundColor: AppConstants.surfaceColor,
              child: Icon(LucideIcons.user, size: 40, color: AppConstants.primaryColor),
            ),
            const SizedBox(height: 20),
            Text(
              user?.name.toUpperCase() ?? 'UNKNOWN ARCHITECT',
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 4),
            Text(
              user?.email ?? 'offline@vault.com',
              style: const TextStyle(color: Colors.white54),
            ),
            const SizedBox(height: 32),
            _buildProfileItem(context, LucideIcons.shield, 'SUBSCRIPTION', user?.subscriptionPlan.toUpperCase() ?? 'FREE', '/subscription'),
            _buildProfileItem(context, LucideIcons.settings, 'SETTINGS', 'CONFIGURE', '/settings'),
            _buildProfileItem(context, LucideIcons.history, 'ACTIVITY LOG', 'VIEW', '/activity'),
            _buildProfileItem(context, LucideIcons.award, 'ACHIEVEMENTS', 'VIEW', '/achievements'),
            _buildProfileItem(context, LucideIcons.helpCircle, 'GET HELP', 'SUPPORT', '/help'),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: () {
                auth.logout();
                Navigator.of(context).pushNamedAndRemoveUntil('/landing', (route) => false);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red.withOpacity(0.1),
                foregroundColor: Colors.redAccent,
                side: BorderSide(color: Colors.redAccent.withOpacity(0.2)),
              ),
              child: const Text('LOGOUT'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileItem(BuildContext context, IconData icon, String title, String value, String route) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, route),
      borderRadius: BorderRadius.circular(16),
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppConstants.surfaceColor,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            Icon(icon, color: Colors.white54, size: 20),
            const SizedBox(width: 16),
            Text(title, style: const TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 12)),
            const Spacer(),
            Text(value, style: const TextStyle(color: AppConstants.primaryColor, fontWeight: FontWeight.bold, fontSize: 12)),
            const SizedBox(width: 8),
            const Icon(LucideIcons.chevronRight, size: 14, color: Colors.white24),
          ],
        ),
      ),
    );
  }
}
