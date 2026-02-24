import 'package:flutter/material.dart';

class AppConstants {
  static const String appName = 'EduMind';
  static const String apiBaseUrl = 'http://10.93.27.222:5000/api'; // For Android Emulator
  // static const String apiBaseUrl = 'http://localhost:5000/api'; // For iOS/Desktop
  
  // Design Tokens
  static const Color primaryColor = Color(0xFF6366F1); // Indigo 500
  static const Color secondaryColor = Color(0xFFA855F7); // Purple 500
  static const Color backgroundColor = Color(0xFF050505);
  static const Color surfaceColor = Color(0xFF18181B); // Zinc 900
  static const Color accentColor = Color(0xFF10B981); // Emerald 500
  
  static const double defaultPadding = 20.0;
  static const double defaultRadius = 16.0;
}
