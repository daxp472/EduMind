import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          _buildSettingsGroup('ACCOUNT', [
            _buildSettingsItem(LucideIcons.user, 'Edit Profile', () {}),
            _buildSettingsItem(LucideIcons.lock, 'Security', () {}),
            _buildSettingsItem(LucideIcons.bell, 'Notifications', () {}),
          ]),
          const SizedBox(height: 24),
          _buildSettingsGroup('APP PREFERENCES', [
            _buildSettingsItem(LucideIcons.moon, 'Dark Mode', () {}, trailing: Switch(value: true, onChanged: (v) {})),
            _buildSettingsItem(LucideIcons.globe, 'Language', () {}, value: 'English'),
          ]),
          const SizedBox(height: 24),
          _buildSettingsGroup('SUPPORT', [
            _buildSettingsItem(LucideIcons.helpCircle, 'Help & FAQ', () {}),
            _buildSettingsItem(LucideIcons.info, 'About EduMind', () {}),
            _buildSettingsItem(LucideIcons.fileText, 'Privacy Policy', () {}),
          ]),
          const SizedBox(height: 40),
          TextButton(
            onPressed: () {},
            child: const Text('Logout', style: TextStyle(color: Colors.redAccent)),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsGroup(String title, List<Widget> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: AppConstants.surfaceColor,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(children: items),
        ),
      ],
    );
  }

  Widget _buildSettingsItem(IconData icon, String title, VoidCallback onTap, {Widget? trailing, String? value}) {
    return ListTile(
      leading: Icon(icon, size: 20, color: Colors.white70),
      title: Text(title, style: const TextStyle(fontSize: 15)),
      trailing: trailing ?? Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (value != null) Text(value, style: const TextStyle(color: Colors.white54, fontSize: 13)),
          const SizedBox(width: 8),
          const Icon(LucideIcons.chevronRight, size: 16, color: Colors.white24),
        ],
      ),
      onTap: onTap,
    );
  }
}
