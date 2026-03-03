import 'package:flutter/material.dart';
import '../core/api_service.dart';

class ActivityProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  List<Map<String, dynamic>> _activities = [];
  bool _isLoading = false;
  String? _error;

  List<Map<String, dynamic>> get activities => _activities;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchRecentActivity() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/activity');
      if (response.data['success'] == true) {
        _activities = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load activity';
      // Keep existing data if available
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> fetchActivityByType(String type) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/activity/type/$type');
      if (response.data['success'] == true) {
        _activities = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load activity';
    }

    _isLoading = false;
    notifyListeners();
  }
}
