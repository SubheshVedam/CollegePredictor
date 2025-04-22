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
      color="white"
      disabled={loading}
      className={className}
      {...props}
      sx={{
        textTransform: 'capitalize',
        py: 1.5,
        px: 3,
        background: "#F97D03",
        color: "white",
        "&:hover": {
          backgroundColor: "#FF9900",
        },
        "&:focus": {
          outline: "none",
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        },
        ...(loading && {
          opacity: 0.75,
          cursor: "not-allowed",
        }),
        "&.Mui-disabled": {
          backgroundColor: "#F97D03",
          cursor:'none',
          color: "white",
        },
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
