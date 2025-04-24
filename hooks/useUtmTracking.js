import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getUtmParams, sendUtmToAnalytics } from '../utils/utm';

/**
 * Custom hook to track page views with UTM parameters
 * 
 * This hook will track page views and send UTM parameters to Google Analytics
 * whenever the path or search parameters change
 */
export default function useUtmTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Only run if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      // Get current UTM parameters from URL
      const currentUtmParams = getUtmParams();
      
      // Send page view to Google Analytics with UTM parameters
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        ...currentUtmParams
      });
      
      // Send UTM data as a separate event for better tracking
      if (Object.keys(currentUtmParams).length > 0) {
        sendUtmToAnalytics(currentUtmParams);
      }
    }
  }, [pathname, searchParams]);
  
  return null;
}
