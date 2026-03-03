import 'package:flutter/material.dart';

class AppColors {
  // Primary & Secondary
  static const Color primary = Color(0xFF6366F1); // Indigo 500
  static const Color secondary = Color(0xFFA855F7); // Purple 500
  static const Color accent = Color(0xFF10B981); // Emerald 500
  
  // Backgrounds
  static const Color background = Color(0xFF020202);
  static const Color surface = Color(0xFF0A0A0A);
  static const Color surfaceLight = Color(0xFF121212);
  static const Color card = Color(0xFF18181B);
  
  // Text
  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFFA1A1AA);
  static const Color textMuted = Color(0xFF71717A);
  
  // States
  static const Color error = Color(0xFFEF4444);
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);
  
  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static LinearGradient glassGradient = LinearGradient(
    colors: [
      Colors.white.withOpacity(0.1),
      Colors.white.withOpacity(0.05),
    ],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
