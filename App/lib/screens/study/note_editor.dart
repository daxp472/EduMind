import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';
import '../../core/app_colors.dart';
import 'package:flutter_animate/flutter_animate.dart';

class NoteEditorScreen extends StatefulWidget {
  final String? noteId;
  const NoteEditorScreen({super.key, this.noteId});

  @override
  State<NoteEditorScreen> createState() => _NoteEditorScreenState();
}

class _NoteEditorScreenState extends State<NoteEditorScreen> {
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    if (widget.noteId != null) {
      _titleController.text = 'QUANTUM BIOLOGY STUDY';
      _contentController.text = 'Focus on the cellular respiration protocols and high-density energy transfer mechanisms...';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(LucideIcons.chevronLeft, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          widget.noteId == null ? 'NEW LOG' : 'EDIT LOG',
          style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 2.0),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: _isSaving
                ? const SizedBox(height: 18, width: 18, child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary))
                : const Icon(LucideIcons.check, color: AppColors.primary, size: 20),
            onPressed: () {
              setState(() => _isSaving = true);
              Future.delayed(const Duration(seconds: 1), () {
                if (mounted) Navigator.pop(context);
              });
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
            child: TextField(
              controller: _titleController,
              style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -0.5),
              decoration: InputDecoration(
                hintText: 'IDENTIFIER',
                hintStyle: TextStyle(color: Colors.white.withOpacity(0.1)),
                border: InputBorder.none,
                contentPadding: EdgeInsets.zero,
              ),
            ),
          ).animate().fadeIn().slideX(begin: -0.1),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 24),
            child: Divider(color: Colors.white10),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: TextField(
                controller: _contentController,
                maxLines: null,
                style: const TextStyle(height: 1.8, fontSize: 15, color: AppColors.textSecondary, fontWeight: FontWeight.w500),
                decoration: InputDecoration(
                  hintText: 'Initialize knowledge stream...',
                  hintStyle: TextStyle(color: Colors.white.withOpacity(0.05)),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(vertical: 20),
                ),
              ),
            ).animate().fadeIn(delay: 200.ms),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        decoration: BoxDecoration(
          color: AppColors.background,
          border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
        ),
        child: Row(
          children: [
            _buildEditorTool(LucideIcons.type),
            _buildEditorTool(LucideIcons.list),
            _buildEditorTool(LucideIcons.image),
            _buildEditorTool(LucideIcons.mic),
            const Spacer(),
            const Text(
              'SYNCED 5M AGO',
              style: TextStyle(
                color: AppColors.textMuted,
                fontSize: 9,
                fontWeight: FontWeight.w900,
                letterSpacing: 1.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEditorTool(IconData icon) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      child: IconButton(
        icon: Icon(icon, size: 20, color: AppColors.textSecondary),
        onPressed: () {},
        style: IconButton.styleFrom(
          backgroundColor: Colors.white.withOpacity(0.03),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }
}
