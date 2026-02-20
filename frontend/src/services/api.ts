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

  // Request student verification
  requestStudentVerification: async (verificationData: { studentIdCard: string; studentIdCardSelfie: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/request-student-verification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verificationData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to request student verification');
    }

    return response.json();
  }
};

// AI Tools API
export const aiAPI = {
  // Text or File summarization
  summarizeText: async (data: any, token: string) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/ai/summarize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate summary');
    }

    return response.json();
  },

  // AI Tutor / Question answering
  askTutor: async (tutorData: { message: string; context?: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/tutor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: tutorData.message,
        context: tutorData.context
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get AI response');
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

  // Flashcard generation
  generateFlashcards: async (flashcardData: { text: string; numCards?: number }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/flashcards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flashcardData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate flashcards');
    }

    return response.json();
  },

  // Study plan generation
  generateStudyPlan: async (planData: { subjects: string[]; timeAvailable: number; goals?: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/study-planner`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate study plan');
    }

    return response.json();
  },

  // Get AI history
  getHistory: async (token: string, tool?: string) => {
    const url = tool
      ? `${API_BASE_URL}/ai/history?tool=${tool}`
      : `${API_BASE_URL}/ai/history`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch AI history');
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

// Analytics API
export const analyticsAPI = {
  // Get learning analytics
  getLearningAnalytics: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/learning`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch learning analytics');
    }

    return response.json();
  },

  // Get progress reports
  getProgressReports: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/reports`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch progress reports');
    }

    return response.json();
  },

  // Get performance insights
  getPerformanceInsights: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/insights`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch performance insights');
    }

    return response.json();
  },

  // Get learning paths
  getLearningPaths: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/learning-paths`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch learning paths');
    }

    return response.json();
  }
};

// Academic Information API
export const academicAPI = {
  // Get academic information
  getAcademicInfo: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/academic`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch academic information');
    }

    return response.json();
  },

  // Update academic information
  updateAcademicInfo: async (academicData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/academic`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(academicData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update academic information');
    }

    return response.json();
  },

  // Update profile image
  updateProfileImage: async (imageData: FormData, token: string) => {
    const response = await fetch(`${API_BASE_URL}/academic/profile-image`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: imageData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile image');
    }

    return response.json();
  },

  // Update cover image
  updateCoverImage: async (imageData: FormData, token: string) => {
    const response = await fetch(`${API_BASE_URL}/academic/cover-image`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: imageData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update cover image');
    }

    return response.json();
  }
};

// Achievements API
export const achievementsAPI = {
  // Get user achievements
  getAchievements: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/achievements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch achievements');
    }

    return response.json();
  },

  // Get achievements by category
  getAchievementsByCategory: async (category: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/achievements/category/${category}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch achievements');
    }

    return response.json();
  }
};

// Activity API
export const activityAPI = {
  // Get recent activity
  getRecentActivity: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/activity`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch activity');
    }

    return response.json();
  },

  // Get activity by type
  getActivityByType: async (type: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/activity/type/${type}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch activity');
    }

    return response.json();
  }
};

// Study Sessions API
export const studySessionsAPI = {
  // Get study sessions
  getStudySessions: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/study-sessions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch study sessions');
    }

    return response.json();
  },

  // Get study sessions by subject
  getStudySessionsBySubject: async (subject: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study-sessions/subject/${subject}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch study sessions');
    }

    return response.json();
  },

  // Get study statistics
  getStudyStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/study-sessions/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch study statistics');
    }

    return response.json();
  },

  // Create study session
  createStudySession: async (sessionData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study-sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create study session');
    }

    return response.json();
  },

  // Update study session
  updateStudySession: async (id: string, sessionData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study-sessions/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update study session');
    }

    return response.json();
  },

  // Delete study session
  deleteStudySession: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/study-sessions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete study session');
    }

    return response.json();
  }
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

  // Get pending student verifications (admin only)
  getPendingStudentVerifications: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/pending-student-verifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch pending student verifications');
    }

    return response.json();
  },

  // Approve student verification (admin only)
  approveStudentVerification: async (userId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/approve-student-verification/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to approve student verification');
    }

    return response.json();
  },

  // Reject student verification (admin only)
  rejectStudentVerification: async (userId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/reject-student-verification/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reject student verification');
    }

    return response.json();
  }
};

// Utility functions
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('edumind_token', token);
  } else {
    localStorage.removeItem('edumind_token');
  }
};

// Preferences API
export const preferenceAPI = {
  getPreferences: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/preferences`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch preferences');
    }

    return response.json();
  },

  updatePreferences: async (preferences: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/preferences`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update preferences');
    }

    return response.json();
  },
};


export const getAuthToken = () => {
  return localStorage.getItem('edumind_token');
};