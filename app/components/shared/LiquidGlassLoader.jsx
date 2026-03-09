"use client";

import { Box } from "@mui/material";
import { liquidLoaderSx, liquidLoaderRingSx } from "./liquidGlassStyles";

/**
 * Liquid glass styled circular loader.
 * size: number, default 60. Use smaller (e.g. 24, 32) for inline/button loaders.
 */
export default function LiquidGlassLoader({ size = 60 }) {
  return (
    <Box sx={liquidLoaderSx(size)}>
      <Box sx={liquidLoaderRingSx(size)} />
    </Box>
  );
}
