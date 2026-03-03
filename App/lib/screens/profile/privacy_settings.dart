import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class PrivacySettingsScreen extends StatelessWidget {
  const PrivacySettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'PRIVACY PROTOCOLS',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        children: [
          _buildToggle('NEURAL VISIBILITY', true, 'Allow other nodes to discover your profile'),
          _buildToggle('PROGRESS INSIGHTS', false, 'Enable study groups to monitor your synchronization'),
          _buildToggle('DATA CONTRIBUTION', true, 'Share anonymized telemetry to improve neural models'),
          const SizedBox(height: 48),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: TextButton(
              onPressed: () {},
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 20),
                backgroundColor: const Color(0xFFF43F5E).withOpacity(0.05),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: BorderSide(color: const Color(0xFFF43F5E).withOpacity(0.2)),
                ),
              ),
              child: const Text(
                'WIPE ALL NEURAL DATA',
                style: TextStyle(
                  color: Color(0xFFF43F5E),
                  fontWeight: FontWeight.w900,
                  fontSize: 11,
                  letterSpacing: 2.0,
                ),
              ),
            ),
          ).animate().fadeIn(delay: 400.ms),
        ],
      ),
    );
  }

  Widget _buildToggle(String label, bool value, String subtitle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: PremiumCard(
        padding: const EdgeInsets.all(20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 12,
                      letterSpacing: 0.5,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 10,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
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
