"use client";
import { Button, CircularProgress, Typography, Box } from "@mui/material";

export default function LoadingButton({
  type = "button",
  loading,
  text,
  loadingText,
  className = "",
  ...props
}) {
  return (
    <Button
      fullWidth
      type={type}
      variant="contained"
      color="primary"
      disabled={loading}
      className={className}
      {...props}
      sx={{
        py: 1.5,
        px: 3,
        "&:hover": {
          backgroundColor: "primary.dark",
        },
        "&:focus": {
          outline: "none",
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        },
        ...(loading && {
          opacity: 0.75,
          cursor: "not-allowed",
        }),
        ...props.sx,
      }}
    >
      {loading ? (
        <Box display="flex" alignItems="center">
          <CircularProgress
            size={16}
            thickness={5}
            sx={{
              color: "common.white",
              mr: 1,
            }}
          />
          <Typography variant="button">{loadingText}</Typography>
        </Box>
      ) : (
        text
      )}
    </Button>
  );
}
