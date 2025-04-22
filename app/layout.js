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
