import { apiClient } from '@/lib/api';
import config from '@/config/env';

export const testApiConnection = async () => {
  try {
    // Test basic API connection
    const response = await fetch(`${config.apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('✅ API connection successful');
      return true;
    } else {
      console.log('❌ API connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ API connection error:', error);
    return false;
  }
};

// Test function that can be called from browser console
(window as any).testApiConnection = testApiConnection;
