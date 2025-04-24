// src/components/google-analytics.js
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    // Get current URL with query params
    const url = pathname + (searchParams ? `?${searchParams}` : '');
    
    // Extract UTM parameters
    const utmParams = {};
    if (searchParams) {
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = searchParams.get(param);
        if (value) utmParams[param] = value;
      });
    }

    // Store UTM params in session storage if they exist
    if (Object.keys(utmParams).length > 0) {
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    }

    // Check for persisted UTM params if no new ones exist
    const persistedUtm = Object.keys(utmParams).length === 0 
      ? JSON.parse(sessionStorage.getItem('utm_params') || '{}')
      : {};

    // Send page view to GA with UTM data
    window.gtag('event', 'page_view', {
      page_path: url,
      ...(Object.keys(utmParams).length > 0 ? utmParams : persistedUtm),
      ...(Object.keys(utmParams).length > 0 ? {
        event_category: 'UTM',
        event_label: `${utmParams.utm_source || 'direct'}/${utmParams.utm_medium || 'none'}`
      } : {})
    });
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}