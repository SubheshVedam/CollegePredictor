"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Script from "next/script"; // ✅ import Script from next/script
import { Suspense, useEffect } from "react";
import { storeUtmParams, sendUtmToAnalytics } from "../utils/utm";
import GoogleAnalytics from "./components/google-analytics";

export const metadata = {
  title: {
    default: "The College Predictor – AI-Powered JEE College Prediction Tool",
    template: "%s | The College Predictor",
  },
  description:
    "The College Predictor is an AI-powered tool that helps JEE aspirants predict their college admission chances based on their ranks, preferences, and category. Make informed decisions with our comprehensive college prediction system.",
  keywords: [
    "college predictor",
    "the college predictor",
    "JEE college predictor",
    "college admission predictor",
    "college chances predictor",
    "engineering college predictor",
    "college prediction",
    "AI college predictor",
    "JEE Main 2025",
    "college admission predictor",
    "JEE Advanced predictor",
    "college prediction tool",
    "thecollegepredictor.com",
  ],
  authors: [{ name: "The College Predictor", url: "https://www.thecollegepredictor.com" }],
  openGraph: {
    title: {
      default: "The College Predictor – AI-Powered JEE College Prediction Tool",
      template: "%s | The College Predictor",
    },
    description:
      "Utilize The College Predictor's AI-driven platform to forecast your engineering college admissions based on JEE ranks and preferences. Empowering students to make data-informed choices for their future.",
    url: "https://www.thecollegepredictor.com",
    siteName: "The College Predictor",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "The College Predictor – AI-Powered JEE College Prediction Tool",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // Capture and store UTM parameters when the app loads
  useEffect(() => {
    // Store UTM parameters from URL to localStorage
    storeUtmParams();

    // Send UTM data to Google Analytics
    sendUtmToAnalytics();
  }, []);

  return (
    <Provider store={store}>
      <html lang="en" className={poppins.variable}>
        <head>
          <Suspense fallback={null}>{/* <GoogleAnalytics /> */}</Suspense>
          <link rel="icon" href="./favicon.ico" />
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "r96wsf86es");
            `,
            }}
          />

          {/* ✅ Load the gtag.js script using next/script */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-EJQV1XVPZC"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EJQV1XVPZC', { 
                send_page_view: true,
                cookie_flags: 'SameSite=None;Secure',
                cookie_domain: 'auto'
              });
            `}
          </Script>
          <Script id="google-analytics-utm" strategy="afterInteractive">
            {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-EJQV1XVPZC');

    function getQueryParams() {
      return window.location.search
        .substring(1)
        .split("&")
        .reduce(function(acc, pair) {
          var [key, val] = pair.split("=");
          if (key) acc[decodeURIComponent(key)] = decodeURIComponent(val || "");
          return acc;
        }, {});
    }

    (function() {
      var params = getQueryParams();
      var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      var utmData = {};

      utmKeys.forEach(function(k) {
        if (params[k]) {
          utmData[k] = params[k];
          document.cookie = k + "=" + encodeURIComponent(params[k]) + "; path=/; max-age=" + (60*60*24*30);
        }
      });

      gtag('event', 'page_view', {
        'page_path': window.location.pathname + window.location.search,
        ...utmData
      });
    })();
  `}
          </Script>
        </head>
        <body
          className={`${poppins.className} ${geistSans.variable} ${geistMono.variable}`}
        >
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Provider>
  );
}
