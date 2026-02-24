import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SecuritySettingsScreen extends StatelessWidget {
  const SecuritySettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Security')),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          _buildItem(LucideIcons.lock, 'Change Password', 'Update your account password'),
          _buildItem(LucideIcons.shield, 'Two-Factor Auth', 'Not enabled'),
          _buildItem(LucideIcons.smartphone, 'Connected Devices', '1 active device'),
        ],
      ),
    );
  }

  Widget _buildItem(IconData icon, String title, String subtitle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
      child: Row(
        children: [
          Icon(icon, color: AppConstants.primaryColor, size: 20),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(subtitle, style: const TextStyle(color: Colors.white54, fontSize: 12)),
            ],
          ),
          const Spacer(),
          const Icon(LucideIcons.chevronRight, size: 16, color: Colors.white24),
        ],
      ),
    );
  }
}
