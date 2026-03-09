
"use client";
import React from 'react'
import ResultsPage from './ResultsPage'
import { Suspense } from 'react';
import { Box } from "@mui/material";
import LiquidGlassLoader from "../components/shared/LiquidGlassLoader";

export default function page() {
  return (
    <Suspense fallback={
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <LiquidGlassLoader size={60} />
      </Box>
    }>
    <ResultsPage/>
    </Suspense>
  );
}