"use client";

import { Box } from "@mui/material";
import {
  liquidProgressTrackSx,
  liquidProgressFillSx,
} from "./liquidGlassStyles";

/**
 * Horizontal liquid glass progress bar.
 * progress: 0–100 (number).
 * height: optional track height in px (default 12).
 */
export default function LiquidGlassProgress({ progress = 0, height = 12 }) {
  const percent = Math.min(100, Math.max(0, Number(progress)));

  return (
    <Box
      sx={{
        ...liquidProgressTrackSx,
        height,
      }}
    >
      <Box
        sx={{
          ...liquidProgressFillSx,
          width: `${percent}%`,
        }}
      />
    </Box>
  );
}
