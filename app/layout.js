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
          <title>
            JEE Main 2026 College Predictor | AI-Based Rank Analysis – Vedam
            School of Technology
          </title>
          <meta
            name="description"
            content="AI-powered JEE Main 2026 college predictor using past-year data trends. Built by ex-Google & Microsoft SDEs. Get instant results by uploading your rank."
          />
          <meta
            name="keywords"
            content="JEE college predictor, college admission predictor, best college for JEE rank, JEE Main College Predictor, JEE Advance College Predictor"
          />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Vedam School of Technology" />
          <meta name="publisher" content="Vedam School of Technology" />

          {/* Google Tag Manager */}
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K7ZDF4K4');
              `,
            }}
          />

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

        </head>
        <body
          className={`${poppins.className} ${geistSans.variable} ${geistMono.variable}`}
        >
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-K7ZDF4K4"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Provider>
  );
}
