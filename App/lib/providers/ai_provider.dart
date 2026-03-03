import 'package:flutter/material.dart';
import '../core/api_service.dart';

class AIProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  List<Map<String, dynamic>> _history = [];
  Map<String, dynamic>? _lastSummary;
  Map<String, dynamic>? _lastQuiz;
  List<Map<String, dynamic>> _lastFlashcards = [];
  bool _isLoading = false;
  String? _error;

  List<Map<String, dynamic>> get history => _history;
  Map<String, dynamic>? get lastSummary => _lastSummary;
  Map<String, dynamic>? get lastQuiz => _lastQuiz;
  List<Map<String, dynamic>> get lastFlashcards => _lastFlashcards;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchHistory() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.get('/ai/history');
      if (response.data['success'] == true) {
        _history = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
      }
    } catch (e) {
      _error = 'Failed to load AI history';
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<Map<String, dynamic>?> summarize({String? text, String? youtubeUrl}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final data = <String, dynamic>{};
      if (text != null) data['text'] = text;
      if (youtubeUrl != null) data['youtubeUrl'] = youtubeUrl;

      final response = await _apiService.client.post('/ai/summarize', data: data);
      if (response.data['success'] == true) {
        _lastSummary = Map<String, dynamic>.from(response.data['data'] ?? {});
        _isLoading = false;
        notifyListeners();
        return _lastSummary;
      }
    } catch (e) {
      _error = 'Failed to generate summary';
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }

  Future<Map<String, dynamic>?> generateQuiz({required String topic, int numQuestions = 10, String difficulty = 'medium'}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.post('/ai/generate-quiz', data: {
        'topic': topic,
        'numQuestions': numQuestions,
        'difficulty': difficulty,
      });
      if (response.data['success'] == true) {
        _lastQuiz = Map<String, dynamic>.from(response.data['data'] ?? {});
        _isLoading = false;
        notifyListeners();
        return _lastQuiz;
      }
    } catch (e) {
      _error = 'Failed to generate quiz';
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }

  Future<String?> askTutor(String message) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.post('/ai/tutor', data: {
        'message': message,
      });
      if (response.data['success'] == true) {
        _isLoading = false;
        notifyListeners();
        return response.data['data']?['reply'] ?? response.data['data']?['response'];
      }
    } catch (e) {
      _error = 'Failed to get tutor response';
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }

  Future<List<Map<String, dynamic>>?> generateFlashcards({required String topic}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.client.post('/ai/flashcards', data: {
        'topic': topic,
      });
      if (response.data['success'] == true) {
        _lastFlashcards = List<Map<String, dynamic>>.from(response.data['data'] ?? []);
        _isLoading = false;
        notifyListeners();
        return _lastFlashcards;
      }
    } catch (e) {
      _error = 'Failed to generate flashcards';
    }

    _isLoading = false;
    notifyListeners();
    return null;
  }
}
