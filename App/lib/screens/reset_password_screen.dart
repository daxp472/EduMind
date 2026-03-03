import 'package:flutter/material.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_button.dart';
import '../../widgets/custom_textfield.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:lucide_icons/lucide_icons.dart';

class ResetPasswordScreen extends StatefulWidget {
  const ResetPasswordScreen({super.key});

  @override
  State<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends State<ResetPasswordScreen> {
  final _emailController = TextEditingController();

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
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'SECURITY\nRECOVERY',
              style: TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.w900,
                letterSpacing: -1.0,
                color: Colors.white,
                height: 1.0,
              ),
            ).animate().fadeIn().slideX(begin: -0.1),
            const SizedBox(height: 12),
            const Text(
              'Initiate the recovery protocol to regain access to your neural profile.',
              style: TextStyle(color: AppColors.textSecondary, fontSize: 14, fontWeight: FontWeight.w500),
            ).animate().fadeIn(delay: 200.ms),
            const SizedBox(height: 64),
            CustomTextField(
              controller: _emailController,
              label: 'UPLINK IDENTIFIER (EMAIL)',
              prefixIcon: LucideIcons.mail,
              validator: (v) => v!.isEmpty ? 'Identifier required' : null,
            ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.1),
            const SizedBox(height: 64),
            PremiumButton(
              text: 'SEND RECOVERY LINK',
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    backgroundColor: AppColors.primary.withOpacity(0.9),
                    behavior: SnackBarBehavior.floating,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    content: const Text(
                      'RECOVERY LINK DISPATCHED TO REGISTERED UPLINK.',
                      style: TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.0),
                    ),
                  ),
                );
                Navigator.pop(context);
              },
            ).animate().fadeIn(delay: 600.ms).scale(begin: const Offset(0.9, 0.9)),
          ],
        ),
      ),
    );
  }
}
