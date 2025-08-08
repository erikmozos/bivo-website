/**
 * Cookie consent utility functions for Bivo
 */

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
};

export const COOKIE_CONSENT_KEY = 'bivo-cookie-consent';
export const ANALYTICS_ENABLED_KEY = 'bivo-analytics-enabled';

/**
 * Check if user has given consent for cookies
 */
export const hasGivenConsent = (): boolean => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return false;
  }
};

/**
 * Check if analytics cookies are enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  try {
    return localStorage.getItem(ANALYTICS_ENABLED_KEY) === 'true';
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return false;
  }
};

/**
 * Get current cookie preferences
 */
export const getCookiePreferences = (): CookiePreferences => {
  return {
    essential: true, // Always enabled
    analytics: isAnalyticsEnabled(),
  };
};

/**
 * Set cookie preferences
 */
export const setCookiePreferences = (preferences: CookiePreferences): void => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'set');
    localStorage.setItem(ANALYTICS_ENABLED_KEY, preferences.analytics.toString());
  } catch (error) {
    console.error('Error setting cookie preferences:', error);
  }
};

/**
 * Initialize analytics based on user preferences
 * This is where you would integrate with Google Analytics or other services
 */
export const initializeAnalytics = (): void => {
  if (isAnalyticsEnabled()) {
    // Example: Initialize Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID');
    console.log('Analytics initialized');
  } else {
    // Disable analytics
    console.log('Analytics disabled by user preference');
  }
};

/**
 * Reset all cookie preferences (useful for testing)
 */
export const resetCookiePreferences = (): void => {
  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(ANALYTICS_ENABLED_KEY);
  } catch (error) {
    console.error('Error resetting cookie preferences:', error);
  }
}; 