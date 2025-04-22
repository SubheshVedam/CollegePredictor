"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Poppins } from "next/font/google"; // Changed from Roboto to Poppins
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"], // Poppins has different weights available
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // Changed variable name
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
