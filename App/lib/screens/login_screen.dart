import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_button.dart';
import '../../widgets/custom_textfield.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  void _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      final success = await context.read<AuthProvider>().login(
        _emailController.text,
        _passwordController.text,
      );
      
      if (success && mounted) {
        Navigator.pushReplacementNamed(context, '/home');
      } else if (mounted) {
        // Show premium error snackbar
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFFF43F5E).withOpacity(0.9),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            content: Text(
              context.read<AuthProvider>().error?.toUpperCase() ?? 'AUTHENTICATION PROTOCOL FAILED',
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
              const SizedBox(height: 20),
              const Text(
                'NEURAL\nACCESS',
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
                'Enter your credentials to establish connection.',
                style: TextStyle(color: AppColors.textSecondary, fontSize: 14, fontWeight: FontWeight.w500),
              ).animate().fadeIn(delay: 200.ms),
              const SizedBox(height: 64),
              CustomTextField(
                controller: _emailController,
                label: 'UPLINK IDENTIFIER (EMAIL)',
                prefixIcon: LucideIcons.mail,
                validator: (v) => v!.isEmpty ? 'Identifier required' : null,
              ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.1),
              const SizedBox(height: 24),
              CustomTextField(
                controller: _passwordController,
                label: 'SECURITY KEY (PASSWORD)',
                prefixIcon: LucideIcons.lock,
                isPassword: true,
                validator: (v) => v!.isEmpty ? 'Security key required' : null,
              ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/reset_password'),
                  child: const Text(
                    'RECOVER KEY?',
                    style: TextStyle(
                      color: AppColors.textMuted,
                      fontWeight: FontWeight.w900,
                      fontSize: 10,
                      letterSpacing: 1.0,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 64),
              Consumer<AuthProvider>(
                builder: (context, auth, _) {
                  return PremiumButton(
                    text: 'ESTABLISH UPLINK',
                    isLoading: auth.isLoading,
                    onPressed: auth.isLoading ? () {} : _handleLogin,
                  );
                },
              ).animate().fadeIn(delay: 700.ms).scale(begin: const Offset(0.9, 0.9)),
              const SizedBox(height: 32),
              Center(
                child: TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/signup'),
                  child: RichText(
                    text: const TextSpan(
                      text: "NO NEURAL PROFILE? ",
                      style: TextStyle(color: AppColors.textMuted, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.0),
                      children: [
                        TextSpan(
                          text: "CREATE ONE",
                          style: TextStyle(color: AppColors.primary),
                        ),
                      ],
                    ),
                  ),
                ),
              ).animate().fadeIn(delay: 900.ms),
            ],
          ),
        ),
      ),
    );
  }
}
