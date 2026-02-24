import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class HistoryVaultScreen extends StatelessWidget {
  const HistoryVaultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('History Vault')),
      body: DefaultTabController(
        length: 3,
        child: Column(
          children: [
            const TabBar(
              tabs: [
                Tab(text: 'Summaries'),
                Tab(text: 'Quizzes'),
                Tab(text: 'Tutor Logs'),
              ],
            ),
            Expanded(
              child: TabBarView(
                children: [
                  _buildHistoryList('Summary of Biology Chapter 4'),
                  _buildHistoryList('Quiz: Quantum Mechanics'),
                  _buildHistoryList('Chat: Calculus Integration'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryList(String title) {
    return ListView.builder(
      padding: const EdgeInsets.all(AppConstants.defaultPadding),
      itemCount: 8,
      itemBuilder: (context, index) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
          child: Row(
            children: [
              const Icon(LucideIcons.fileText, color: AppConstants.primaryColor),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                    const Text('Saved on Feb 20, 2026', style: TextStyle(color: Colors.white54, fontSize: 12)),
                  ],
                ),
              ),
              const Icon(LucideIcons.chevronRight, color: Colors.white24),
            ],
          ),
        );
      },
    );
  }
}
