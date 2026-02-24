class User {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  final String subscriptionPlan;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
    required this.subscriptionPlan,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'] ?? json['id'],
      name: json['name'],
      email: json['email'],
      avatar: json['avatar'],
      subscriptionPlan: json['subscriptionPlan'] ?? 'free',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'avatar': avatar,
      'subscriptionPlan': subscriptionPlan,
    };
  }
}
