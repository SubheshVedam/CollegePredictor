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
        background: {xs:"linear-gradient(225deg, #FF9900 50%, #FFFFFF 100%)",sm:"linear-gradient(45deg, #FF9900 50%, #FFFFFF 100%)"},
        color: "black", // Set text color to black
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
        ...(props.disabled && {
          color: "white", // Ensures the text color is white when disabled
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
              color: "white",
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
