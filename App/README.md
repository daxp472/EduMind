# EduMind Mobile 📱

The official cross-platform mobile application for EduMind, built with Flutter.

## ✨ Features

- **AI Summarizer**: Transform lengthy notes into concise summaries.
- **Math Solver**: Step-by-step solutions for equations and problems.
- **Essay Guru**: Deep analysis, scoring, and vocabulary suggestions for drafts.
- **Digital Flashcards**: Create and study flashcard decks with active recall.
- **Offline Notes**: Access and edit your study notes anywhere, even without internet (Student/Pro plans).
- **Study Hub**: Organize subjects, topics, and group chats in one place.
- **Animated UI**: Premium dark-theme experience with fluid micro-animations.

## 🛠 Tech Stack

- **Framework**: [Flutter](https://flutter.dev/)
- **State Management**: [Provider](https://pub.dev/packages/provider)
- **Networking**: [Dio](https://pub.dev/packages/dio)
- **Local Storage**: [Flutter Secure Storage](https://pub.dev/packages/flutter_secure_storage)
- **Icons**: [Lucide Icons](https://pub.dev/packages/lucide_icons)
- **Animations**: [Flutter Animate](https://pub.dev/packages/flutter_animate)

## 📁 Architecture

The project follows a modular and scalable structure:
- `lib/core`: App-wide constants, theme, and API service logic.
- `lib/models`: Data structures for Users, Notes, etc.
- `lib/providers`: State management handling auth, notes, and tool logic.
- `lib/screens`: All application pages categorized by module (AI Tools, Study, Profile).
- `lib/widgets`: Reusable UI components and the custom brand logo.

## 🚀 Getting Started

1. **Setup Flutter**: Ensure you have Flutter installed on your machine.
2. **Install Dependencies**:
   ```bash
   flutter pub get
   ```
3. **Configure API**: Update the `apiBaseUrl` in `lib/core/constants.dart` to match your local or production backend IP.
4. **Run the App**:
   ```bash
   flutter run
   ```

## 🧪 Testing

Run standard widget and unit tests with:
```bash
flutter test
```

---
Made with ❤️ for the future of education.
