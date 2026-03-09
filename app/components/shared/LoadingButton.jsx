"use client";
import { Button, Box, Typography } from "@mui/material";
import { liquidPrimaryButtonSx } from "./liquidGlassStyles";
import LiquidGlassLoader from "./LiquidGlassLoader";

export default function LoadingButton({
  type = "button",
  loading,
  text,
  loadingText = "Loading…",
  disabled,
  className = "",
  ...props
}) {
  return (
    <Button
      fullWidth
      type={type}
      variant="contained"
      disabled={disabled ?? loading}
      className={className}
      {...props}
      sx={{
        ...liquidPrimaryButtonSx,
        textTransform: "capitalize",
        minHeight: 56,
        border: "none",
        borderRadius: "100px",
        fontFamily: "var(--font-outfit), sans-serif",
        "&:focus": { outline: "none" },
        ...(loading && { opacity: 0.9, cursor: "not-allowed" }),
        ...props.sx,
      }}
    >
      {loading ? (
        <Box display="flex" alignItems="center" gap={1.5}>
          <LiquidGlassLoader size={22} />
          <Typography variant="button" sx={{ fontFamily: "inherit" }}>
            {loadingText}
          </Typography>
        </Box>
      ) : (
        text
      )}
    </Button>
  );
}
