/**
 * UTM parameter tracking utilities for College Predictor
 */

// List of UTM parameters to track
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
];

/**
 * Extract UTM parameters from URL and return as an object
 * @returns {Object} UTM parameters object
 */
export function getUtmParams() {
  // Only run on client side
  if (typeof window === 'undefined') return {};
  
  const url = new URL(window.location.href);
  const utmParams = {};
  
  UTM_PARAMS.forEach(param => {
    const value = url.searchParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });
  
  return utmParams;
}

/**
 * Store UTM parameters in localStorage for session attribution
 */
export function storeUtmParams() {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUtmParams();
  
  if (Object.keys(utmParams).length > 0) {
    localStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
}

/**
 * Get stored UTM parameters from localStorage
 * @returns {Object} Stored UTM parameters
 */
export function getStoredUtmParams() {
  if (typeof window === 'undefined') return {};
  
  try {
    const storedParams = localStorage.getItem('utm_params');
    return storedParams ? JSON.parse(storedParams) : {};
  } catch (error) {
    console.error('Error retrieving UTM params:', error);
    return {};
  }
}

/**
 * Send UTM data to Google Analytics
 * @param {Object} utmParams UTM parameters to send
 */
export function sendUtmToAnalytics(utmParams = null) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  const params = utmParams || getStoredUtmParams();
  
  if (Object.keys(params).length > 0) {
    // Send UTM data as custom dimensions to GA4
    window.gtag('event', 'utm_parameters', {
      ...params
    });
  }
}
