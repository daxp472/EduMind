import 'package:flutter/material.dart';
import '../../core/constants.dart';

class PrivacySettingsScreen extends StatelessWidget {
  const PrivacySettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Privacy Settings')),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          _buildToggle('Public Profile', true, 'Allow others to find you'),
          _buildToggle('Show Progress', false, 'Let study groups see your activity'),
          _buildToggle('Data Sharing', true, 'Share app data for AI improvements'),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent.withOpacity(0.1), foregroundColor: Colors.redAccent),
            child: const Text('DELETE ALL DATA'),
          ),
        ],
      ),
    );
  }

  Widget _buildToggle(String label, bool value, String subtitle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(subtitle, style: const TextStyle(color: Colors.white54, fontSize: 11)),
            ],
          ),
          Switch(value: value, onChanged: (v) {}),
        ],
      ),
    );
  }
}
