import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

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
      // Load note if editing
      _titleController.text = 'Biology Study Session';
      _contentController.text = 'Focus on the cellular respiration process tonight...';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.noteId == null ? 'New Note' : 'Edit Note'),
        actions: [
          if (true) // Check if user has student plan
            const Padding(
              padding: EdgeInsets.only(right: 16),
              child: Tooltip(
                message: 'Available Offline',
                child: Icon(LucideIcons.cloudOff, color: AppConstants.primaryColor, size: 20),
              ),
            ),
          IconButton(
            icon: _isSaving ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2)) : const Icon(LucideIcons.check),
            onPressed: () {
              setState(() => _isSaving = true);
              Future.delayed(const Duration(seconds: 1), () {
                if (mounted) Navigator.pop(context);
              });
            },
          ),
        ],
      ),
      body: Column(
        children: [
          TextField(
            controller: _titleController,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            decoration: const InputDecoration(
              hintText: 'Title',
              border: InputBorder.none,
              contentPadding: EdgeInsets.all(AppConstants.defaultPadding),
            ),
          ),
          const Divider(height: 1, color: Colors.white10),
          Expanded(
            child: TextField(
              controller: _contentController,
              maxLines: null,
              style: const TextStyle(height: 1.6, fontSize: 16),
              decoration: const InputDecoration(
                hintText: 'Start writing...',
                border: InputBorder.none,
                contentPadding: EdgeInsets.all(AppConstants.defaultPadding),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(12),
        color: AppConstants.surfaceColor,
        child: Row(
          children: [
            IconButton(icon: const Icon(LucideIcons.type, size: 20), onPressed: () {}),
            IconButton(icon: const Icon(LucideIcons.list, size: 20), onPressed: () {}),
            IconButton(icon: const Icon(LucideIcons.image, size: 20), onPressed: () {}),
            IconButton(icon: const Icon(LucideIcons.mic, size: 20), onPressed: () {}),
            const Spacer(),
            const Text('Last saved 5m ago', style: TextStyle(color: Colors.white24, fontSize: 10)),
          ],
        ),
      ),
    );
  }
}
