'use client';

import { useEffect, useState } from 'react';
import { SERVER_ENDPOINT } from '@/lib/consts';
import Cookies from 'js-cookie';

/**
 * Enhanced CSRFInitializer component
 * 
 * This component fetches a CSRF token from the backend and ensures
 * it's properly set in the cookies. It handles both the automatic Django
 * cookie setting and manual fallback.
 */
const CSRFInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Function to fetch CSRF token
  const fetchCSRFToken = async () => {
    try {
      console.log('Fetching CSRF token...');
      
      const response = await fetch(`${SERVER_ENDPOINT}/api/get-csrf-token`, {
        method: 'GET',
        credentials: 'include', // Important: includes cookies
      });

      if (response.ok) {
        // Parse the response JSON
        const data = await response.json();
        console.log('CSRF response:', data);
        
        // Check if the cookie was set automatically
        const csrfCookie = Cookies.get('csrftoken');
        console.log('CSRF cookie after fetch:', csrfCookie);
        
        // If backend included token in response but cookie isn't set,
        // manually set it as a fallback
        if (data.csrfToken && !csrfCookie) {
          console.log('Setting CSRF cookie manually:', data.csrfToken);
          Cookies.set('csrftoken', data.csrfToken, { 
            path: '/',
            sameSite: 'Lax'
          });
        }
        
        // Verify the cookie again
        const verifiedCookie = Cookies.get('csrftoken');
        console.log('Verified CSRF cookie:', verifiedCookie);
        
        if (verifiedCookie) {
          console.log('CSRF token initialized successfully');
          setInitialized(true);
          return true;
        } else {
          console.error('Failed to set CSRF cookie');
          return false;
        }
      } else {
        console.error('Failed to fetch CSRF token:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return false;
    }
  };

  // Initialize CSRF token on component mount
  useEffect(() => {
    const initializeToken = async () => {
      if (!initialized && attempts < 3) {
        const success = await fetchCSRFToken();
        if (!success) {
          // Increment attempts for retry logic
          setAttempts(prev => prev + 1);
        }
      }
    };

    initializeToken();

    // Set up a navigation event listener for route changes
    const handleRouteChange = () => {
      // Only try to refresh if previously initialized
      if (initialized) {
        fetchCSRFToken();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange);
      
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, [initialized, attempts]);

  // This component doesn't render anything
  return null;
};

export default CSRFInitializer;