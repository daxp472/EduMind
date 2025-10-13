// AI Service Configuration with fallback mechanism
class AIServiceManager {
  constructor() {
    this.services = [
      {
        name: 'OpenAI',
        apiKey: process.env.OPENAI_API_KEY,
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-4',
        enabled: !!process.env.OPENAI_API_KEY
      },
      {
        name: 'Gemini',
        apiKey: process.env.GEMINI_API_KEY,
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        model: 'gemini-pro',
        enabled: !!process.env.GEMINI_API_KEY
      },
      {
        name: 'Grok',
        apiKey: process.env.GROK_API_KEY,
        baseUrl: 'https://api.x.ai/v1',
        model: 'grok-beta',
        enabled: !!process.env.GROK_API_KEY
      }
    ];

    // Filter out services without API keys
    this.activeServices = this.services.filter(service => service.enabled);
  }

  // Get next available service in case of failure
  getNextService(currentServiceIndex = -1) {
    if (this.activeServices.length === 0) {
      throw new Error('No AI services configured with valid API keys');
    }

    const nextIndex = (currentServiceIndex + 1) % this.activeServices.length;
    return {
      service: this.activeServices[nextIndex],
      index: nextIndex
    };
  }

  // Get all active services
  getActiveServices() {
    return this.activeServices;
  }
}

module.exports = new AIServiceManager();