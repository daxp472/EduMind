import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_card.dart';
import '../../widgets/premium_button.dart';
import 'package:flutter_animate/flutter_animate.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _bioController;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: 'Dax Patani');
    _emailController = TextEditingController(text: 'daxpa@example.com');
    _bioController = TextEditingController(text: 'Studying Computer Science at University of Tech.');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _bioController.dispose();
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
          'IDENTITY MANAGEMENT',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 14, letterSpacing: 2.0),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        physics: const BouncingScrollPhysics(),
        child: Column(
          children: [
            const SizedBox(height: 16),
            _buildAvatarSection(),
            const SizedBox(height: 48),
            _buildFieldGroup('CORE IDENTITY', [
              _buildField('LEGAL NAME', _nameController, LucideIcons.user),
              const SizedBox(height: 24),
              _buildField('COMMUNICATION UPLINK', _emailController, LucideIcons.mail),
            ]),
            const SizedBox(height: 32),
            _buildFieldGroup('NEURAL BIODATA', [
              _buildField('COGNITIVE SUMMARY (BIO)', _bioController, LucideIcons.info, maxLines: 4),
            ]),
            const SizedBox(height: 48),
            PremiumButton(
              text: 'SYNCHRONIZE CHANGES',
              icon: LucideIcons.refreshCcw,
              isLoading: _isLoading,
              onPressed: _handleSave,
            ).animate().fadeIn(delay: 600.ms).scale(begin: const Offset(0.9, 0.9)),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildAvatarSection() {
    return Center(
      child: Stack(
        alignment: Alignment.bottomRight,
        children: [
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.primary.withOpacity(0.3), width: 2),
            ),
            child: const CircleAvatar(
              radius: 60,
              backgroundColor: AppColors.surface,
              child: Icon(LucideIcons.user, size: 48, color: AppColors.primary),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
              color: AppColors.primary,
              shape: BoxShape.circle,
            ),
            child: const Icon(LucideIcons.camera, size: 16, color: Colors.white),
          ),
        ],
      ),
    ).animate().fadeIn().scale();
  }

  Widget _buildFieldGroup(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8, bottom: 16),
          child: Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w900,
              color: AppColors.textMuted,
              fontSize: 10,
              letterSpacing: 1.2,
            ),
          ),
        ),
        ...children,
      ],
    ).animate().fadeIn().slideY(begin: 0.05);
  }

  Widget _buildField(String label, TextEditingController controller, IconData icon, {int maxLines = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            label,
            style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.textMuted, fontSize: 9, letterSpacing: 0.5),
          ),
        ),
        PremiumCard(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Row(
            crossAxisAlignment: maxLines > 1 ? CrossAxisAlignment.start : CrossAxisAlignment.center,
            children: [
              Padding(
                padding: EdgeInsets.only(top: maxLines > 1 ? 14 : 0),
                child: Icon(icon, size: 16, color: AppColors.primary),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: TextField(
                  controller: controller,
                  maxLines: maxLines,
                  style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    isDense: true,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _handleSave() async {
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 2));
    if (mounted) {
      setState(() => _isLoading = false);
      Navigator.pop(context);
    }
  }
}
