// Simple test script to verify backend API
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testHealthEndpoint() {
  try {
    console.log('Testing health endpoint...');
    const response = await axios.get(`${API_BASE}/health`);
    console.log('Health check:', response.data);
  } catch (error) {
    console.error('Health check failed:', error.message);
  }
}

async function testAuthEndpoints() {
  try {
    console.log('\nTesting registration...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Registration successful:', registerResponse.data);
    
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login successful:', loginResponse.data);
    
    const token = loginResponse.data.token;
    
    console.log('\nTesting get current user...');
    const userResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Get user successful:', userResponse.data);
    
  } catch (error) {
    console.error('Auth test failed:', error.response?.data || error.message);
  }
}

async function runTests() {
  await testHealthEndpoint();
  await testAuthEndpoints();
}

runTests();