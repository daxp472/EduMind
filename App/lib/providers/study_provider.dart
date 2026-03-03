import 'package:flutter/material.dart';
import '../core/api_service.dart';

class StudyProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  List<Map<String, dynamic>> _materials = [];
  List<Map<String, dynamic>> _groups = [];
  List<Map<String, dynamic>> _calendarEvents = [];
  bool _isLoading = false;
  String? _error;

  List<Map<String, dynamic>> get materials => _materials;
  List<Map<String, dynamic>> get groups => _groups;
  List<Map<String, dynamic>> get calendarEvents => _calendarEvents;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchMaterials() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/study/materials');
      if (response.data['success'] == true) {
        _materials = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load study materials';
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> fetchGroups() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/study/groups');
      if (response.data['success'] == true) {
        _groups = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load study groups';
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> fetchCalendar() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/study/calendar');
      if (response.data['success'] == true) {
        _calendarEvents = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load calendar';
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<Map<String, dynamic>?> createMaterial(Map<String, dynamic> data) async {
    try {
      final response = await _apiService.client.post('/study/materials', data: data);
      if (response.data['success'] == true) {
        await fetchMaterials();
        return response.data['data'];
      }
    } catch (e) {
      _error = 'Failed to create material';
      notifyListeners();
    }
    return null;
  }

  Future<bool> joinGroup(String groupId) async {
    try {
      final response = await _apiService.client.post('/study/groups/$groupId/join');
      if (response.data['success'] == true) {
        await fetchGroups();
        return true;
      }
    } catch (e) {
      _error = 'Failed to join group';
      notifyListeners();
    }
    return false;
  }
}
