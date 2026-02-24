class Note {
  final String id;
  final String title;
  final String content;
  final DateTime updatedAt;
  final bool isOffline;

  Note({
    required this.id,
    required this.title,
    required this.content,
    required this.updatedAt,
    this.isOffline = false,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'updatedAt': updatedAt.toIso8601String(),
      'isOffline': isOffline,
    };
  }

  factory Note.fromJson(Map<String, dynamic> json) {
    return Note(
      id: json['id'],
      title: json['title'],
      content: json['content'],
      updatedAt: DateTime.parse(json['updatedAt']),
      isOffline: json['isOffline'] ?? false,
    );
  }
}
