import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';

class EditProfileScreen extends StatelessWidget {
  const EditProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Edit Profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          children: [
            const Center(
              child: Stack(
                children: [
                  CircleAvatar(radius: 60, backgroundColor: AppConstants.surfaceColor, child: Icon(LucideIcons.user, size: 50, color: AppConstants.primaryColor)),
                ],
              ),
            ),
            const SizedBox(height: 32),
            _buildField('FULL NAME', 'Dax Patani'),
            const SizedBox(height: 20),
            _buildField('EMAIL', 'daxpa@example.com'),
            const SizedBox(height: 20),
            _buildField('BIO', 'Studying Computer Science at University of Tech.'),
            const SizedBox(height: 40),
            ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('SAVE CHANGES')),
          ],
        ),
      ),
    );
  }

  Widget _buildField(String label, String initialValue) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white54, fontSize: 12)),
        const SizedBox(height: 8),
        TextField(
          controller: TextEditingController(text: initialValue),
          decoration: InputDecoration(fillColor: AppConstants.surfaceColor, filled: true),
        ),
      ],
    );
  }
}
