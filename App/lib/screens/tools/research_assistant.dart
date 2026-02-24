import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class ResearchAssistantScreen extends StatefulWidget {
  const ResearchAssistantScreen({super.key});

  @override
  State<ResearchAssistantScreen> createState() => _ResearchAssistantScreenState();
}

class _ResearchAssistantScreenState extends State<ResearchAssistantScreen> {
  final _queryController = TextEditingController();
  bool _isSearching = false;
  List<Map<String, String>>? _sources;

  void _searchSources() {
    if (_queryController.text.isEmpty) return;
    setState(() {
      _isSearching = true;
      _sources = null;
    });

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isSearching = false;
          _sources = [
            {'title': 'Understanding Photosynthesis', 'author': 'Dr. Sarah Jenkins', 'year': '2023'},
            {'title': 'The Future of Plant Biology', 'author': 'Harvard University', 'year': '2024'},
          ];
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Research Assistant')),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          children: [
            TextField(
              controller: _queryController,
              decoration: InputDecoration(
                hintText: 'Topic, author, or keyword...',
                prefixIcon: const Icon(LucideIcons.search, size: 20),
                suffixIcon: IconButton(icon: const Icon(LucideIcons.arrowRight), onPressed: _searchSources),
              ),
            ),
            const SizedBox(height: 32),
            if (_isSearching) const CircularProgressIndicator(),
            if (_sources != null) ...[
              const Align(alignment: Alignment.centerLeft, child: Text('TOP SOURCES', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12, letterSpacing: 1.2))),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.builder(
                  itemCount: _sources!.length,
                  itemBuilder: (context, index) {
                    final source = _sources![index];
                    return Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(16)),
                      child: Row(
                        children: [
                          const Icon(LucideIcons.bookOpen, color: AppConstants.secondaryColor),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(source['title']!, style: const TextStyle(fontWeight: FontWeight.bold)),
                                Text('${source['author']} • ${source['year']}', style: const TextStyle(color: Colors.white54, fontSize: 12)),
                              ],
                            ),
                          ),
                          IconButton(icon: const Icon(LucideIcons.externalLink, size: 16), onPressed: () {}),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
