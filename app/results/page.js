
"use client";
import React from 'react'
import ResultsPage from './ResultsPage'
import { Suspense } from 'react';
import { Box, CircularProgress } from "@mui/material";

export default function page() {
  return (
    <Suspense fallback={
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    }>
    <ResultsPage/>
    </Suspense>
  );
}