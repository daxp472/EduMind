import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../core/constants.dart';
import '../providers/auth_provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;

    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: AppConstants.surfaceColor,
        selectedItemColor: AppConstants.primaryColor,
        unselectedItemColor: Colors.white24,
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(icon: Icon(LucideIcons.layoutGrid), label: 'NEURAL'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.bookOpen), label: 'SYNTH'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.zap), label: 'ANALYTICS'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.user), label: 'PROFILE'),
        ],
        onTap: (index) {
          if (index == 3) Navigator.pushNamed(context, '/profile');
        },
      ),
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 120.0,
            floating: false,
            pinned: true,
            backgroundColor: AppConstants.backgroundColor,
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                'HELLO, ${user?.name.toUpperCase() ?? 'SCHOLAR'}',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.0,
                ),
              ),
              centerTitle: false,
            ),
            actions: [
              IconButton(
                icon: const Icon(LucideIcons.bell),
                onPressed: () {},
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.defaultPadding),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Status Card
                  _buildStatusCard(context),
                  const SizedBox(height: 32),
                  _buildSectionHeader('AI TOOLS'),
                  const SizedBox(height: 16),
                  _buildToolGrid(context),
                  const SizedBox(height: 32),
                  _buildSectionHeader('RECENT ACTIVITY'),
                  const SizedBox(height: 16),
                  _buildRecentActivity(),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w900,
        letterSpacing: 2.0,
        color: Colors.white54,
      ),
    );
  }

  Widget _buildStatusCard(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppConstants.primaryColor,
            AppConstants.secondaryColor.withOpacity(0.8),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppConstants.primaryColor.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'STUDY PROGRESS',
            style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 12),
          ),
          const SizedBox(height: 8),
          const Text(
            'LEVEL 4',
            style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 20),
          LinearProgressIndicator(
            value: 0.7,
            backgroundColor: Colors.white.withOpacity(0.2),
            valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
            borderRadius: BorderRadius.circular(10),
            minHeight: 8,
          ),
          const SizedBox(height: 12),
          const Text(
            '342 / 500 STUDY POINTS',
            style: TextStyle(color: Colors.white60, fontSize: 10, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    ).animate().fadeIn().slideY(begin: 0.1);
  }

  Widget _buildToolGrid(BuildContext context) {
    final tools = [
      {'icon': LucideIcons.fileText, 'label': 'Summarize', 'color': Colors.blue, 'route': '/summarizer'},
      {'icon': LucideIcons.helpCircle, 'label': 'Create Quiz', 'color': const Color(0xFF10B981), 'route': '/quiz_setup'},
      {'icon': LucideIcons.penTool, 'label': 'Essay Guru', 'color': Colors.orange, 'route': '/essay_analyzer'},
      {'icon': LucideIcons.calculator, 'label': 'Math Solver', 'color': Colors.redAccent, 'route': '/math_solver'},
      {'icon': LucideIcons.search, 'label': 'Research', 'color': Colors.purple, 'route': '/research_assistant'},
      {'icon': LucideIcons.book, 'label': 'My Notes', 'color': Colors.amber, 'route': '/notes'},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1.2,
      ),
      itemCount: tools.length,
      itemBuilder: (context, index) {
        final tool = tools[index];
        return InkWell(
          onTap: () => Navigator.pushNamed(context, tool['route'] as String),
          borderRadius: BorderRadius.circular(20),
          child: Container(
            decoration: BoxDecoration(
              color: AppConstants.surfaceColor,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.05)),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(tool['icon'] as IconData, color: tool['color'] as Color, size: 32),
                const SizedBox(height: 12),
                Text(
                  tool['label'] as String,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
              ],
            ),
          ),
        ).animate().fadeIn(delay: (index * 100).ms).scale(begin: const Offset(0.9, 0.9));
      },
    );
  }

  Widget _buildRecentActivity() {
    final activities = [
      {'title': 'Biology Summary', 'subtitle': '2 hours ago', 'icon': LucideIcons.fileText},
      {'title': 'Math Quiz Score: 90%', 'subtitle': '5 hours ago', 'icon': LucideIcons.checkCircle},
    ];

    return Column(
      children: activities.map((activity) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppConstants.surfaceColor,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            children: [
              CircleAvatar(
                backgroundColor: AppConstants.primaryColor.withOpacity(0.1),
                child: Icon(activity['icon'] as IconData, size: 18, color: AppConstants.primaryColor),
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(activity['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
                  Text(activity['subtitle'] as String, style: const TextStyle(color: Colors.white54, fontSize: 12)),
                ],
              ),
            ],
          ),
        );
      }).toList(),
    ).animate().fadeIn(delay: 400.ms);
  }
}
