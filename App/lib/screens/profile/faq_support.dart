import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class SupportFAQScreen extends StatelessWidget {
  const SupportFAQScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final faqs = [
      {'q': 'How does the AI summarizer work?', 'a': 'Our AI analyzes your text using advanced natural language processing to extract the most important points while removing fluff.'},
      {'q': 'Is my data secure?', 'a': 'Yes, all your notes and data are encrypted and stored securely. We do not share your private data with third parties.'},
      {'q': 'Can I study offline?', 'a': 'Offline access is available in our Student and Pro plans. You can download notes and flashcards for study anywhere.'},
      {'q': 'How do I cancel my subscription?', 'a': 'You can manage and cancel your subscription anytime from the Membership section in your profile settings.'},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Help & Support')),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          const Text('FREQUENTLY ASKED QUESTIONS', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
          const SizedBox(height: 16),
          ...faqs.map((faq) => Container(
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
            child: ExpansionTile(
              title: Text(faq['q']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              children: [Padding(padding: const EdgeInsets.all(16), child: Text(faq['a']!, style: const TextStyle(color: Colors.white70, height: 1.5)))],
            ),
          )),
          const SizedBox(height: 32),
          const Text('STILL NEED HELP?', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2)),
          const SizedBox(height: 16),
          _buildContactItem(LucideIcons.mail, 'Email Support', 'support@edumind.ai'),
          _buildContactItem(LucideIcons.messageCircle, 'Live Chat', 'Average wait: 5 mins'),
        ],
      ),
    );
  }

  Widget _buildContactItem(IconData icon, String title, String subtitle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
      child: Row(
        children: [
          Icon(icon, color: AppConstants.primaryColor),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(subtitle, style: const TextStyle(color: Colors.white54, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }
}
