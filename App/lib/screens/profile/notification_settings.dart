import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class NotificationSettingsScreen extends StatelessWidget {
  const NotificationSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'COMMUNICATION PROTOCOLS',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        children: [
          _buildToggle('PUSH NOTIFICATIONS', true),
          _buildToggle('NEURAL UPDATES (EMAIL)', false),
          _buildToggle('SYNC REMINDERS', true),
          _buildToggle('ANALYSIS RESULTS', true),
          _buildToggle('NETWORK MENTIONS', false),
        ],
      ),
    );
  }

  Widget _buildToggle(String label, bool value) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: PremiumCard(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 11,
                letterSpacing: 0.5,
                color: Colors.white,
              ),
            ),
            Switch(
              value: value,
              onChanged: (v) {},
              activeColor: AppColors.primary,
              activeTrackColor: AppColors.primary.withOpacity(0.2),
              inactiveTrackColor: Colors.white10,
            ),
          ],
        ),
      ),
    ).animate().fadeIn().slideX(begin: 0.05);
  }
}
