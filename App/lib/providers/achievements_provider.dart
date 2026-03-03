import 'package:flutter/material.dart';
import '../core/api_service.dart';

class AchievementsProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  List<Map<String, dynamic>> _achievements = [];
  bool _isLoading = false;
  String? _error;

  List<Map<String, dynamic>> get achievements => _achievements;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchAchievements() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/achievements');
      if (response.data['success'] == true) {
        _achievements = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load achievements';
    }

    _isLoading = false;
    notifyListeners();
  }
}
