import 'package:flutter/material.dart';
import '../../core/constants.dart';

class NotificationSettingsScreen extends StatelessWidget {
  const NotificationSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Notifications')),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          _buildToggle('Push Notifications', true),
          _buildToggle('Email Updates', false),
          _buildToggle('Study Reminders', true),
          _buildToggle('Quiz Results', true),
          _buildToggle('Community Mentions', false),
        ],
      ),
    );
  }

  Widget _buildToggle(String label, bool value) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
          Switch(value: value, onChanged: (v) {}, activeColor: AppConstants.primaryColor),
        ],
      ),
    );
  }
}
