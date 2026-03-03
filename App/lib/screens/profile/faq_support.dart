import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SupportFAQScreen extends StatelessWidget {
  const SupportFAQScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final faqs = [
      {'q': 'HOW DOES THE NEURAL SUMMARIZER OPERATE?', 'a': 'Our AI utilizes proprietary NLP architectures to distill complex data into high-density insights, stripping away cognitive noise.'},
      {'q': 'IS MY DATA ENCRYPTED END-TO-END?', 'a': 'Yes. All knowledge injections and study metrics are secured with AES-256 encryption. Your privacy is our primary directive.'},
      {'q': 'CAN I ACCESS KNOWLEDGE OFFLINE?', 'a': 'Local caching is available in our PRO and NEXUS tiers, allowing for deep study without an uplink.'},
      {'q': 'HOW DO I TERMINATE MY SUBSCRIPTION?', 'a': 'You can manage your membership status via the Membership portal in your profile configurations.'},
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'SUPPORT HUB',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        children: [
          const Text(
            'RECURRING QUERIES (FAQ)',
            style: TextStyle(
              fontWeight: FontWeight.w900,
              color: AppColors.textMuted,
              fontSize: 10,
              letterSpacing: 1.2,
            ),
          ).animate().fadeIn().slideX(begin: -0.1),
          const SizedBox(height: 20),
          ...faqs.asMap().entries.map((entry) {
            final index = entry.key;
            final faq = entry.value;
            return Container(
              margin: const EdgeInsets.only(bottom: 16),
              child: PremiumCard(
                padding: EdgeInsets.zero,
                child: Theme(
                  data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    tilePadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    iconColor: AppColors.primary,
                    collapsedIconColor: AppColors.textMuted,
                    title: Text(
                      faq['q']!,
                      style: const TextStyle(
                        fontWeight: FontWeight.w900,
                        fontSize: 11,
                        letterSpacing: 0.5,
                        color: Colors.white,
                      ),
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 20, right: 20, bottom: 20),
                        child: Text(
                          faq['a']!,
                          style: const TextStyle(
                            color: AppColors.textSecondary,
                            height: 1.6,
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ).animate().fadeIn(delay: (index * 100).ms).slideY(begin: 0.1);
          }),
          const SizedBox(height: 48),
          const Text(
            'DIRECT UPLINK (HELP)',
            style: TextStyle(
              fontWeight: FontWeight.w900,
              color: AppColors.textMuted,
              fontSize: 10,
              letterSpacing: 1.2,
            ),
          ).animate().fadeIn(delay: 500.ms),
          const SizedBox(height: 20),
          _buildContactItem(
            LucideIcons.mail,
            'NEURAL SUPPORT EMAIL',
            'ops@edumind.terminal',
            AppColors.primary,
          ).animate().fadeIn(delay: 600.ms).slideX(begin: 0.1),
          _buildContactItem(
            LucideIcons.messageCircle,
            'LIVE COMMS CHANNEL',
            'Average latency: 120s',
            AppColors.success,
          ).animate().fadeIn(delay: 700.ms).slideX(begin: 0.1),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildContactItem(IconData icon, String title, String subtitle, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: PremiumCard(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 11,
                      letterSpacing: 0.5,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
