// AI Service Configuration with fallback mechanism
class AIServiceManager {
  constructor() {
    this.services = [
      {
        name: 'OpenAI',
        keys: (process.env.OPENAI_API_KEYS || process.env.OPENAI_API_KEY || '').split(',').filter(Boolean),
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-4o', // Upgraded to 4o for vision/multimodal
        enabled: !!(process.env.OPENAI_API_KEYS || process.env.OPENAI_API_KEY)
      },
      {
        name: 'Gemini',
        keys: (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '').split(',').filter(Boolean),
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        model: 'gemini-1.5-flash', // Optimized for speed and multimodal
        enabled: !!(process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY)
      },
      {
        name: 'Grok',
        keys: (process.env.GROK_API_KEYS || process.env.GROK_API_KEY || '').split(',').filter(Boolean),
        baseUrl: 'https://api.x.ai/v1',
        model: 'grok-beta',
        enabled: !!(process.env.GROK_API_KEYS || process.env.GROK_API_KEY)
      }
    ];

    // Track key index per service for rotation
    this.keyIndices = {};
    this.services.forEach(s => {
      this.keyIndices[s.name] = 0;
    });

    // Filter out services without API keys
    this.activeServices = this.services.filter(service => service.enabled);
  }

  // Get next available service in case of failure
  getNextService(currentServiceIndex = -1) {
    if (this.activeServices.length === 0) {
      throw new Error('No AI services configured with valid API keys');
    }

    const nextIndex = (currentServiceIndex + 1) % this.activeServices.length;
    const service = this.activeServices[nextIndex];

    // Get current key and rotate for next call to this service
    const keyIndex = this.keyIndices[service.name];
    const apiKey = service.keys[keyIndex];
    this.keyIndices[service.name] = (keyIndex + 1) % service.keys.length;

    return {
      service: {
        ...service,
        apiKey
      },
      index: nextIndex
    };
  }

  // Get all active services with their current rotated keys
  getActiveServices() {
    return this.activeServices.map(service => {
      const keyIndex = this.keyIndices[service.name];
      const apiKey = service.keys[keyIndex];
      // Note: We don't auto-rotate here to avoid skipping keys during the loop in tryAIServices
      return { ...service, apiKey };
    });
  }

  // Explicitly told to rotate a specific service's key (e.g. if one key is empty/invalid)
  rotateKey(serviceName) {
    const service = this.services.find(s => s.name === serviceName);
    if (service && service.keys.length > 0) {
      this.keyIndices[serviceName] = (this.keyIndices[serviceName] + 1) % service.keys.length;
    }
  }
}

module.exports = new AIServiceManager();