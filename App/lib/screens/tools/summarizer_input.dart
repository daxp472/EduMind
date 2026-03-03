import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../widgets/premium_button.dart';
import '../../providers/ai_provider.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SummarizerInputScreen extends StatefulWidget {
  const SummarizerInputScreen({super.key});

  @override
  State<SummarizerInputScreen> createState() => _SummarizerInputScreenState();
}

class _SummarizerInputScreenState extends State<SummarizerInputScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final _textController = TextEditingController();
  final _urlController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _textController.dispose();
    _urlController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'SUMMARIZER PRO',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, letterSpacing: 1.5),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.history, color: AppColors.textMuted),
            onPressed: () => Navigator.pushNamed(context, '/history'),
          ),
        ],
      ),
      body: Column(
        children: [
          const SizedBox(height: 8),
          _buildTabBar(),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildTextInput(),
                _buildYouTubeInput(),
              ],
            ),
          ),
          _buildActionFooter(),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      padding: const EdgeInsets.all(6),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.03)),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withOpacity(0.3),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        indicatorSize: TabBarIndicatorSize.tab,
        labelColor: Colors.white,
        unselectedLabelColor: AppColors.textMuted,
        labelStyle: const TextStyle(fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 0.5),
        tabs: const [
          Tab(text: 'TEXT / NOTES'),
          Tab(text: 'YOUTUBE URL'),
        ],
      ),
    );
  }

  Widget _buildTextInput() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'KNOWLEDGE INJECTION',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              color: AppColors.primary,
              letterSpacing: 1.2,
            ),
          ).animate().fadeIn().slideX(begin: -0.1),
          const SizedBox(height: 16),
          PremiumCard(
            padding: const EdgeInsets.all(20),
            child: TextField(
              controller: _textController,
              maxLines: 12,
              style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.5),
              decoration: const InputDecoration(
                hintText: 'Paste your raw study material, notes, or research papers here...',
                hintStyle: TextStyle(color: AppColors.textMuted, fontSize: 14),
                border: InputBorder.none,
              ),
            ),
          ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.05),
        ],
      ),
    );
  }

  Widget _buildYouTubeInput() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'VIDEO INTELLIGENCE',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              color: Color(0xFFFF0000), // YouTube Red
              letterSpacing: 1.2,
            ),
          ).animate().fadeIn().slideX(begin: -0.1),
          const SizedBox(height: 16),
          PremiumCard(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              children: [
                const Icon(LucideIcons.youtube, color: Color(0xFFFF0000), size: 24),
                const SizedBox(width: 16),
                Expanded(
                  child: TextField(
                    controller: _urlController,
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                    decoration: const InputDecoration(
                      hintText: 'https://youtube.com/watch?v=...',
                      hintStyle: TextStyle(color: AppColors.textMuted, fontSize: 14),
                      border: InputBorder.none,
                    ),
                  ),
                ),
              ],
            ),
          ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.05),
          const SizedBox(height: 24),
          _buildInfoBox(
            'AI will automatically extract the transcript and generate a deep summary for you.',
            LucideIcons.cpu,
          ),
        ],
      ),
    );
  }

  Widget _buildInfoBox(String text, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withOpacity(0.1)),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppColors.primary, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(color: AppColors.textSecondary, fontSize: 12, height: 1.4, fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    ).animate().fadeIn(delay: 200.ms);
  }

  Widget _buildActionFooter() {
    return Consumer<AIProvider>(
      builder: (context, provider, _) {
        return Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.transparent, Colors.black.withOpacity(0.5)],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
          child: PremiumButton(
            text: 'GENERATE SUMMARY',
            icon: LucideIcons.zap,
            isLoading: provider.isLoading,
            onPressed: () => _handleSummarize(provider),
          ),
        );
      },
    );
  }

  void _handleSummarize(AIProvider provider) async {
    final mode = _tabController.index == 0 ? 'text' : 'youtube';
    final content = mode == 'text' ? _textController.text : _urlController.text;

    if (content.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Please provide ${mode == 'text' ? 'some text' : 'a YouTube URL'}'),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }

    final result = await provider.summarize(
      text: mode == 'text' ? content : null,
      youtubeUrl: mode == 'youtube' ? content : null,
    );
    
    if (mounted && result != null) {
      Navigator.pushNamed(context, '/summarizer_result', arguments: result['summary'] ?? '');
    } else if (mounted && provider.error != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.error!),
          backgroundColor: AppColors.error,
        ),
      );
    }
  }
}
