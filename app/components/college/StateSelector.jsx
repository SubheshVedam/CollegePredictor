"use client";
import { FormControl, Select, Box, Typography, MenuItem } from "@mui/material";
import { stateOptions } from "@/lib/states";

export default function StateSelector({ value, onChange }) {
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
        Domicile State{" "}
      </Typography>

      <FormControl fullWidth>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
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
              fontSize: "1rem",
              color: value === "" ? "grey" : "black", // Placeholder color
              opacity: value === "" ? 1 : undefined,
            },
          }}
        >
          <MenuItem value="" disabled>
            Select State
          </MenuItem>
          {stateOptions.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
