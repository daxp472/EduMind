import React, { createContext, useContext, useState, useEffect } from 'react';
import { preferenceAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface Preferences {
    notifications: {
        email: boolean;
        push: boolean;
        marketing: boolean;
        studyReminders: boolean;
        weeklyReports: boolean;
    };
    privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        dataSharing: boolean;
        analyticsOptOut: boolean;
    };
    appearance: {
        theme: 'light' | 'dark' | 'system';
        language: string;
        fontSize: 'small' | 'medium' | 'large';
        compactMode: boolean;
    };
    ai: {
        personalizedRecommendations: boolean;
        adaptiveDifficulty: boolean;
        contentFiltering: 'strict' | 'moderate' | 'relaxed';
    };
}

interface PreferenceContextType {
    preferences: Preferences;
    loading: boolean;
    updatePreferences: (newPrefs: Partial<Preferences>) => Promise<void>;
    refreshPreferences: () => Promise<void>;
}

const defaultPreferences: Preferences = {
    notifications: {
        email: true,
        push: true,
        marketing: false,
        studyReminders: true,
        weeklyReports: true
    },
    privacy: {
        profileVisibility: 'private',
        dataSharing: false,
        analyticsOptOut: false
    },
    appearance: {
        theme: 'dark',
        language: 'en',
        fontSize: 'medium',
        compactMode: false
    },
    ai: {
        personalizedRecommendations: true,
        adaptiveDifficulty: true,
        contentFiltering: 'moderate'
    }
};

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useAuth();
    const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
    const [loading, setLoading] = useState(true);

    const refreshPreferences = async () => {
        if (!token) return;
        try {
            const response = await preferenceAPI.getPreferences(token);
            if (response.success && response.data) {
                // Ensure structural integrity by merging with defaults
                setPreferences(prev => ({
                    ...defaultPreferences,
                    ...prev,
                    ...response.data,
                    notifications: { ...defaultPreferences.notifications, ...prev.notifications, ...response.data.notifications },
                    privacy: { ...defaultPreferences.privacy, ...prev.privacy, ...response.data.privacy },
                    appearance: { ...defaultPreferences.appearance, ...prev.appearance, ...response.data.appearance },
                    ai: { ...defaultPreferences.ai, ...prev.ai, ...response.data.ai }
                }));
            }
        } catch (err) {
            console.error('Failed to load preferences:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            refreshPreferences();
        } else {
            setPreferences(defaultPreferences);
            setLoading(false);
        }
    }, [token]);

    // Apply theme to document
    useEffect(() => {
        const root = window.document.documentElement;
        const theme = preferences?.appearance?.theme || 'dark';
        const isDark = theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [preferences?.appearance?.theme]);

    const updatePreferences = async (newPrefs: Partial<Preferences>) => {
        if (!token) return;

        // Optimistic update
        const updated = { ...preferences, ...newPrefs };
        setPreferences(updated);

        try {
            const response = await preferenceAPI.updatePreferences(updated, token);
            if (!response.success) {
                throw new Error('Failed to update preferences on server');
            }
        } catch (err) {
            toast.error('Failed to sync preferences');
            // Revert on failure
            refreshPreferences();
        }
    };

    return (
        <PreferenceContext.Provider value={{ preferences, loading, updatePreferences, refreshPreferences }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreferences = () => {
    const context = useContext(PreferenceContext);
    if (context === undefined) {
        throw new Error('usePreferences must be used within a PreferenceProvider');
    }
    return context;
};
