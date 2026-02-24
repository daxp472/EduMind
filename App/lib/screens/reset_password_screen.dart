import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/constants.dart';
import '../../widgets/custom_textfield.dart';

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
      appBar: AppBar(backgroundColor: Colors.transparent, elevation: 0),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('RESET\nPASSWORD', style: TextStyle(fontSize: 40, fontWeight: FontWeight.w900, fontStyle: FontStyle.italic)),
            const SizedBox(height: 12),
            const Text('Enter your email and we will send you a reset link.', style: TextStyle(color: Colors.white54, fontSize: 16)),
            const SizedBox(height: 48),
            CustomTextField(
              controller: _emailController,
              label: 'EMAIL ADDRESS',
              prefixIcon: LucideIcons.mail,
              validator: (v) => v!.isEmpty ? 'Email required' : null,
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Reset link sent to your email!')));
                Navigator.pop(context);
              },
              child: const Text('SEND RESET LINK'),
            ),
          ],
        ),
      ),
    );
  }
}
