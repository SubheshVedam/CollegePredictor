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
import { Suspense } from "react";

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
  return (
    <Provider store={store}>
      <html lang="en" className={poppins.variable}>
        <head>
          <link rel="icon" href="./favicon.ico" />
          <Suspense fallback={null}>
            {/* <GoogleAnalytics /> */}
          </Suspense>
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
              gtag('config', 'G-EJQV1XVPZC');
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
