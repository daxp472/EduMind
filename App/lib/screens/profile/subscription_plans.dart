import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SubscriptionPlansScreen extends StatelessWidget {
  const SubscriptionPlansScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Upgrade Plan')),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          _buildPlanCard(
            'FREE',
            '0 / month',
            ['Basic AI Tools', '3 Summaries per day', 'Community Support'],
            false,
          ),
          const SizedBox(height: 24),
          _buildPlanCard(
            'PRO',
            '9.99 / month',
            ['Unlimited AI Tools', 'Priority Processing', 'Early Access Features', '24/7 Support'],
            true,
          ),
          const SizedBox(height: 24),
          _buildPlanCard(
            'STUDENT',
            '4.99 / month',
            ['Everything in Pro', 'Subject History', 'Offline Access'],
            false,
          ),
        ],
      ),
    );
  }

  Widget _buildPlanCard(String name, String price, List<String> features, bool isPopular) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppConstants.surfaceColor,
        borderRadius: BorderRadius.circular(24),
        border: isPopular ? Border.all(color: AppConstants.primaryColor, width: 2) : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (isPopular)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              margin: const EdgeInsets.only(bottom: 12),
              decoration: BoxDecoration(color: AppConstants.primaryColor, borderRadius: BorderRadius.circular(8)),
              child: const Text('MOST POPULAR', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
            ),
          Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white54)),
          const SizedBox(height: 8),
          Text('\$$price', style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 32)),
          const SizedBox(height: 24),
          const Divider(color: Colors.white10),
          const SizedBox(height: 24),
          ...features.map((f) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Row(children: [const Icon(LucideIcons.check, size: 16, color: Colors.green), const SizedBox(width: 12), Text(f)]),
          )),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: isPopular ? AppConstants.primaryColor : Colors.white10),
            child: Text(isPopular ? 'GO PRO NOW' : 'CHOOSE PLAN'),
          ),
        ],
      ),
    );
  }
}
