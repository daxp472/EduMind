import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../widgets/premium_button.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SubscriptionPlansScreen extends StatelessWidget {
  const SubscriptionPlansScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'MEMBERSHIP TIERS',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        children: [
          _buildPlanCard(
            context,
            'NEURAL FREE',
            '0',
            ['3 KNOWLEDGE INJECTIONS / DAY', 'BASIC AI SUMMARIES', 'COMMUNITY UPLINK'],
            false,
            const Color(0xFF94A3B8),
            index: 0,
          ),
          const SizedBox(height: 24),
          _buildPlanCard(
            context,
            'STUDENT ELITE',
            '4.99',
            ['UNLIMITED SUMMARIES', 'SUBJECT VAULT ACCESS', 'OFFLINE DATA CACHING', 'AD-FREE INTERFACE'],
            false,
            const Color(0xFF10B981),
            index: 1,
          ),
          const SizedBox(height: 24),
          _buildPlanCard(
            context,
            'EDUMIND PRO',
            '9.99',
            ['PRIORITY NEURAL COMPUTE', 'DEEP VIDEO INTELLIGENCE', 'ALL ELITE FEATURES', '24/7 DIRECT SUPPORT'],
            true,
            AppColors.primary,
            index: 2,
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildPlanCard(BuildContext context, String name, String price, List<String> features, bool isPopular, Color accentColor, {required int index}) {
    return PremiumCard(
      padding: EdgeInsets.zero,
      child: Container(
        padding: const EdgeInsets.all(32),
        decoration: isPopular ? BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: accentColor.withOpacity(0.3), width: 1),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [accentColor.withOpacity(0.05), Colors.transparent],
          ),
        ) : null,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (isPopular)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                margin: const EdgeInsets.only(bottom: 20),
                decoration: BoxDecoration(
                  color: accentColor,
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [
                    BoxShadow(color: accentColor.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
                child: const Text(
                  'MOST POPULAR',
                  style: TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 1.0),
                ),
              ),
            Text(
              name.toUpperCase(),
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 10, color: accentColor, letterSpacing: 1.5),
            ),
            const SizedBox(height: 12),
            Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const Text('\$', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20, color: Colors.white, height: 2)),
                Text(price, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 40, color: Colors.white)),
                const Text(' / month', style: TextStyle(color: AppColors.textMuted, fontSize: 13, height: 2.5, fontWeight: FontWeight.w600)),
              ],
            ),
            const SizedBox(height: 32),
            const Divider(color: Colors.white10, height: 1),
            const SizedBox(height: 32),
            ...features.map((f) => Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: Row(
                children: [
                  Icon(LucideIcons.checkCircle2, size: 16, color: accentColor),
                  const SizedBox(width: 16),
                  Text(
                    f,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            )),
            const SizedBox(height: 32),
            PremiumButton(
              text: isPopular ? 'UPGRADE TO PRO' : 'SELECT TIER',
              color: isPopular ? accentColor : Colors.white.withOpacity(0.05),
              onPressed: () {},
            ),
          ],
        ),
      ),
    ).animate().fadeIn(delay: (index * 150).ms).slideY(begin: 0.1);
  }
}
