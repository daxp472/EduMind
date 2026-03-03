import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/app_colors.dart';
import '../../widgets/premium_button.dart';
import 'package:flutter_animate/flutter_animate.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, dynamic>> _pages = [
    {
      'title': 'COGNITIVE AMPLIFICATION',
      'desc': 'Distill massive knowledge streams into high-density neural insights using proprietary AI.',
      'icon': LucideIcons.zap,
      'color': AppColors.primary
    },
    {
      'title': 'RECALL OPTIMIZATION',
      'desc': 'Auto-generate interactive challenges and flashcards for deep memory consolidation.',
      'icon': LucideIcons.brainCircuit,
      'color': AppColors.secondary
    },
    {
      'title': 'KNOWLEDGE NETWORK',
      'desc': 'Synchronize with a global collective of elite scholars and synchronize your progress.',
      'icon': LucideIcons.network,
      'color': AppColors.accent
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Background Gradient Glow
          AnimatedContainer(
            duration: 800.ms,
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              gradient: RadialGradient(
                center: const Alignment(0, -0.2),
                radius: 1.5,
                colors: [
                  (_pages[_currentPage]['color'] as Color).withOpacity(0.08),
                  AppColors.background,
                ],
              ),
            ),
          ),

          SafeArea(
            child: Column(
              children: [
                const SizedBox(height: 40),
                // Top Indicator
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Row(
                    children: List.generate(_pages.length, (i) => Expanded(
                      child: AnimatedContainer(
                        duration: 300.ms,
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        height: 2,
                        decoration: BoxDecoration(
                          color: _currentPage >= i ? _pages[_currentPage]['color'] as Color : Colors.white.withOpacity(0.05),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    )),
                  ),
                ),

                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    onPageChanged: (v) => setState(() => _currentPage = v),
                    itemCount: _pages.length,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.all(40.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              height: 280,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.02),
                                borderRadius: BorderRadius.circular(32),
                                border: Border.all(color: Colors.white.withOpacity(0.05)),
                              ),
                              child: Icon(
                                _pages[index]['icon'] as IconData,
                                size: 100,
                                color: _pages[index]['color'] as Color,
                              ).animate(key: ValueKey(index)).fadeIn().scale(begin: const Offset(0.8, 0.8)),
                            ).animate().shimmer(duration: 2.seconds, color: Colors.white.withOpacity(0.05)),
                            const SizedBox(height: 64),
                            Text(
                              _pages[index]['title']!,
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 1.2,
                                color: Colors.white,
                              ),
                            ).animate(key: ValueKey('t$index')).fadeIn(delay: 200.ms).slideY(begin: 0.2),
                            const SizedBox(height: 16),
                            Text(
                              _pages[index]['desc']!,
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 14,
                                color: AppColors.textSecondary,
                                fontWeight: FontWeight.w500,
                                height: 1.6,
                              ),
                            ).animate(key: ValueKey('d$index')).fadeIn(delay: 400.ms).slideY(begin: 0.2),
                          ],
                        ),
                      );
                    },
                  ),
                ),

                Padding(
                  padding: const EdgeInsets.all(32.0),
                  child: Column(
                    children: [
                      PremiumButton(
                        text: _currentPage == _pages.length - 1 ? 'INITIATE UPLINK' : 'PROCEED',
                        color: _pages[_currentPage]['color'] as Color,
                        onPressed: () {
                          if (_currentPage < _pages.length - 1) {
                            _pageController.nextPage(duration: 600.ms, curve: Curves.fastOutSlowIn);
                          } else {
                            Navigator.pushReplacementNamed(context, '/landing');
                          }
                        },
                      ),
                      const SizedBox(height: 20),
                      TextButton(
                        onPressed: () => Navigator.pushReplacementNamed(context, '/landing'),
                        child: const Text(
                          'SKIP PROTOCOL',
                          style: TextStyle(
                            color: AppColors.textMuted,
                            fontWeight: FontWeight.w900,
                            fontSize: 10,
                            letterSpacing: 1.5,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
