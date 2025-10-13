// Simple test script to verify AI endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAISummarization(token) {
  try {
    console.log('\nTesting AI text summarization...');
    const response = await axios.post(`${API_BASE}/ai/summarize`, {
      text: 'Artificial intelligence (AI) is transforming education by providing personalized learning experiences. AI-powered platforms can adapt to individual learning styles, pace, and preferences, making education more effective and engaging. These systems use machine learning algorithms to analyze student performance and provide targeted feedback, helping students identify areas where they need improvement.',
      type: 'bullet',
      length: 'medium'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('AI summarization successful:', response.data);
  } catch (error) {
    console.error('AI summarization failed:', error.response?.data || error.message);
  }
}

async function runTests() {
  try {
    console.log('Logging in to get token...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('Login successful, token received');
    
    await testAISummarization(token);
  } catch (error) {
    console.error('Test setup failed:', error.response?.data || error.message);
  }
}

runTests();