import 'package:flutter/material.dart';
import '../../core/constants.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, String>> _pages = [
    {'title': 'AI Summaries', 'desc': 'Turn long textbooks into easy-to-read notes in seconds.'},
    {'title': 'Smart Quizzes', 'desc': 'Auto-generate quizzes to test your knowledge.'},
    {'title': 'Study Community', 'desc': 'Join thousands of students learning together.'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (v) => setState(() => _currentPage = v),
                itemCount: _pages.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.all(AppConstants.defaultPadding * 2),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          height: 200,
                          width: double.infinity,
                          decoration: BoxDecoration(color: AppConstants.surfaceColor, borderRadius: BorderRadius.circular(24)),
                          child: const Icon(Icons.auto_awesome, size: 80, color: AppConstants.primaryColor),
                        ),
                        const SizedBox(height: 48),
                        Text(_pages[index]['title']!, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900)),
                        const SizedBox(height: 16),
                        Text(_pages[index]['desc']!, textAlign: TextAlign.center, style: const TextStyle(fontSize: 16, color: Colors.white70, height: 1.5)),
                      ],
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(AppConstants.defaultPadding),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(children: List.generate(_pages.length, (i) => Container(
                    margin: const EdgeInsets.only(right: 8),
                    height: 8,
                    width: _currentPage == i ? 24 : 8,
                    decoration: BoxDecoration(color: _currentPage == i ? AppConstants.primaryColor : Colors.white10, borderRadius: BorderRadius.circular(4)),
                  ))),
                  ElevatedButton(
                    onPressed: () {
                      if (_currentPage < _pages.length - 1) {
                        _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
                      } else {
                        Navigator.pushReplacementNamed(context, '/landing');
                      }
                    },
                    style: ElevatedButton.styleFrom(minimumSize: const Size(120, 50)),
                    child: Text(_currentPage == _pages.length - 1 ? 'GET STARTED' : 'NEXT'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
