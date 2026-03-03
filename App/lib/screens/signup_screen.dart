import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_button.dart';
import '../../widgets/custom_textfield.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/auth_provider.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  void _handleSignup() async {
    if (_formKey.currentState!.validate()) {
      final success = await context.read<AuthProvider>().signup(
        _nameController.text,
        _emailController.text,
        _passwordController.text,
      );
      
      if (success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppColors.success.withOpacity(0.9),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            content: const Text(
              'NEURAL PROFILE ESTABLISHED. VERIFICATION REQUIRED.',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.0),
            ),
          ),
        );
        Navigator.pop(context);
      } else if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFFF43F5E).withOpacity(0.9),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            content: Text(
              context.read<AuthProvider>().error?.toUpperCase() ?? 'PROFILE CREATION REJECTED',
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.0),
            ),
          ),
        );
      }
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
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
        physics: const BouncingScrollPhysics(),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'INITIALIZE\nPROFILE',
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
                'Register your identity in the knowledge network.',
                style: TextStyle(color: AppColors.textSecondary, fontSize: 14, fontWeight: FontWeight.w500),
              ).animate().fadeIn(delay: 200.ms),
              const SizedBox(height: 48),
              CustomTextField(
                controller: _nameController,
                label: 'FULL LEGAL NAME',
                prefixIcon: LucideIcons.user,
                validator: (v) => v!.isEmpty ? 'Name required' : null,
              ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.1),
              const SizedBox(height: 24),
              CustomTextField(
                controller: _emailController,
                label: 'COMMUNICATION UPLINK (EMAIL)',
                prefixIcon: LucideIcons.mail,
                validator: (v) => v!.isEmpty ? 'Email required' : null,
              ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),
              const SizedBox(height: 24),
              CustomTextField(
                controller: _passwordController,
                label: 'SECURITY KEY (PASSWORD)',
                prefixIcon: LucideIcons.lock,
                isPassword: true,
                validator: (v) => v!.length < 6 ? 'Min 6 characters required' : null,
              ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.1),
              const SizedBox(height: 64),
              Consumer<AuthProvider>(
                builder: (context, auth, _) {
                  return PremiumButton(
                    text: 'ESTABLISH PROFILE',
                    isLoading: auth.isLoading,
                    onPressed: auth.isLoading ? () {} : _handleSignup,
                  );
                },
              ).animate().fadeIn(delay: 800.ms).scale(begin: const Offset(0.9, 0.9)),
              const SizedBox(height: 32),
              Center(
                child: TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: RichText(
                    text: const TextSpan(
                      text: "ALREADY SYNCHRONIZED? ",
                      style: TextStyle(color: AppColors.textMuted, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.0),
                      children: [
                        TextSpan(
                          text: "ACCESS VAULT",
                          style: TextStyle(color: AppColors.primary),
                        ),
                      ],
                    ),
                  ),
                ),
              ).animate().fadeIn(delay: 1000.ms),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
