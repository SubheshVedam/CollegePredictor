"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";

export default function GenderSelector({ value, onChange }) {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        mb: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          color: "white",
          fontSize: { xs: 14, sm: 16 },
        }}
      >
        Seat Pool{" "}
      </Typography>

      <FormControl fullWidth>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey.300",
                borderRadius: 2,
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
            "& .MuiSelect-select": {
              py: 1.5,
              fontWeight: "normal",
              fontSize: "1rem",
            },
          }}
        >
          <MenuItem value="Gender Neutral">Gender Neutral</MenuItem>
          <MenuItem value="Female">Female Only</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
