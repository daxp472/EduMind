// API Service for EduMind Frontend
const API_BASE_URL = 'http://localhost:5000/api';

// Auth API
export const authAPI = {
  // Register a new user
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },

  // Get current user
  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user data');
    }
    
    return response.json();
  },

  // Update user details
  updateDetails: async (userData: { name: string; email: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/updatedetails`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user details');
    }
    
    return response.json();
  },

  // Update password
  updatePassword: async (passwordData: { currentPassword: string; newPassword: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/updatepassword`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update password');
    }
    
    return response.json();
  },
};

// AI Tools API
export const aiAPI = {
  // Text summarization
  summarizeText: async (textData: { text: string; type?: string; length?: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/summarize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate summary');
    }
    
    return response.json();
  },

  // Quiz generation
  generateQuiz: async (quizData: { text: string; numQuestions?: number; difficulty?: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/generate-quiz`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate quiz');
    }
    
    return response.json();
  },
};

// Study Materials API
export const studyAPI = {
  // Get all study materials
  getMaterials: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/study/materials`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch study materials');
    }
    
    return response.json();
  },

  // Get single study material
  getMaterial: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study/materials/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch study material');
    }
    
    return response.json();
  },

  // Create study material
  createMaterial: async (materialData: { title: string; content: string; type: string; subject: string; tags?: string[] }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study/materials`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(materialData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create study material');
    }
    
    return response.json();
  },

  // Update study material
  updateMaterial: async (id: string, materialData: { title?: string; content?: string; type?: string; subject?: string; tags?: string[] }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study/materials/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(materialData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update study material');
    }
    
    return response.json();
  },

  // Delete study material
  deleteMaterial: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study/materials/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete study material');
    }
    
    return response.json();
  },
};

// User management (admin only)
export const userAPI = {
  // Get all users (admin only)
  getUsers: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }
    
    return response.json();
  },

  // Get single user (admin only)
  getUser: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user');
    }
    
    return response.json();
  },

  // Update user plan (admin only)
  updateUserPlan: async (id: string, planData: { plan: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/plan`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user plan');
    }
    
    return response.json();
  },
};

// Utility functions
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('edumind_token', token);
  } else {
    localStorage.removeItem('edumind_token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('edumind_token');
};