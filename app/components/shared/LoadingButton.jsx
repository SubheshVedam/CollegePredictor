"use client";
import { Button, CircularProgress } from "@mui/material";

export default function LoadingButton({
  onClick,
  loading,
  text,
  loadingText,
  ...props
}) {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}