"use client";
import { TextField, Box, Typography } from "@mui/material";

export default function RankInput({ value, onChange }) {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        mb: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        component="h4"
        sx={{
          color: "white",
          fontSize: { xs: 14, sm: 16 },
        }}
      >
        JEE Main Ranks
      </Typography>

      <TextField
        fullWidth
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        size="medium"
        placeholder="Enter Rank"
        inputProps={{
          min: "1",
          inputMode: "numeric",
          pattern: "[0-9]*",
          style: {
            fontSize: "1rem",
            textAlign: "left", // <-- changed from 'center' to 'left'
          },
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey.300",
              borderRadius: 3,
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          },
          "& .MuiInputBase-input": {
            py: 1.5,
          },
        }}
      />
    </Box>
  );
}
