import 'package:flutter/material.dart';
import '../models/user.dart';
import '../core/api_service.dart';
import 'package:dio/dio.dart';

class AuthProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  User? _user;
  bool _isLoading = false;
  String? _error;

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.post('/auth/login', data: {
        'email': email,
        'password': password,
      });

      if (response.data['success']) {
        final token = response.data['token'];
        await _apiService.saveToken(token);
        _user = User.fromJson(response.data['data']);
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } on DioException catch (e) {
      _error = e.response?.data['message'] ?? 'Login failed';
    } catch (e) {
      _error = 'An unexpected error occurred';
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<bool> signup(String name, String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.post('/auth/register', data: {
        'name': name,
        'email': email,
        'password': password,
      });

      if (response.data['success']) {
        // Backend usually sends email verification message, not log in directly
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } on DioException catch (e) {
      _error = e.response?.data['message'] ?? 'Signup failed';
    } catch (e) {
      _error = 'An unexpected error occurred';
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<void> logout() async {
    await _apiService.deleteToken();
    _user = null;
    notifyListeners();
  }

  Future<void> tryAutoLogin() async {
    final token = await _apiService.getToken();
    if (token == null) return;

    try {
      final response = await _apiService.client.get('/auth/me');
      if (response.data['success']) {
        _user = User.fromJson(response.data['data']);
        notifyListeners();
      }
    } catch (e) {
      await _apiService.deleteToken();
    }
  }
}
