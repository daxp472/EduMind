import 'package:flutter/material.dart';
import '../core/api_service.dart';

class AnalyticsProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  Map<String, dynamic> _learningAnalytics = {};
  Map<String, dynamic> _progressReports = {};
  Map<String, dynamic> _performanceInsights = {};
  bool _isLoading = false;
  String? _error;

  Map<String, dynamic> get learningAnalytics => _learningAnalytics;
  Map<String, dynamic> get progressReports => _progressReports;
  Map<String, dynamic> get performanceInsights => _performanceInsights;
  Map<String, dynamic> get stats => _learningAnalytics; // Alias for compatibility
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchStats() => fetchAllAnalytics(); // Alias for compatibility

  Future<void> fetchAllAnalytics() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final results = await Future.wait([
        _apiService.client.get('/analytics/learning'),
        _apiService.client.get('/analytics/reports'),
        _apiService.client.get('/analytics/insights'),
      ]);

      if (results[0].data['success'] == true) {
        _learningAnalytics = Map<String, dynamic>.from(results[0].data['data'] ?? {});
      }
      if (results[1].data['success'] == true) {
        _progressReports = Map<String, dynamic>.from(results[1].data['data'] ?? {});
      }
      if (results[2].data['success'] == true) {
        _performanceInsights = Map<String, dynamic>.from(results[2].data['data'] ?? {});
      }
    } catch (e) {
      _error = 'Failed to load analytics';
    }

    _isLoading = false;
    notifyListeners();
  }
}
