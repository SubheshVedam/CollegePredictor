"use client";
import { TextField, Box, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setInputMode, setRank, setMarks } from "../../../features/collegePredictor/collegePredictorSlice";

export default function RankInput() {
  const dispatch = useDispatch();
  const { inputMode, marks, rank } = useSelector((state) => state.collegePredictor || {});
  const currentInputMode = inputMode || 'rank';

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      dispatch(setInputMode(newMode));
    }
  };

  const handleValueChange = (newValue) => {
    if (currentInputMode === 'rank') {
      dispatch(setRank(newValue));
    } else {
      dispatch(setMarks(newValue));
    }
  };

  // Use Redux state directly for display value
  const displayValue = currentInputMode === 'rank' ? (rank || '') : (marks || '');

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          {currentInputMode === 'rank' ? 'JEE Main Rank' : 'JEE Main Marks'}
        </Typography>
        <ToggleButtonGroup
          value={currentInputMode}
          exclusive
          onChange={handleModeChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.5)",
              fontSize: { xs: 12, sm: 14 },
              px: { xs: 1, sm: 2 },
              py: 0.5,
              "&.Mui-selected": {
                backgroundColor: "#FFA41A",
                color: "white",
                "&:hover": {
                  backgroundColor: "#FFA41A",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        >
          <ToggleButton value="rank">Rank</ToggleButton>
          <ToggleButton value="marks">Marks</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        fullWidth
        type="number"
        value={displayValue || ''}
        onChange={(e) => handleValueChange(e.target.value)}
        variant="outlined"
        size="medium"
        placeholder={currentInputMode === 'rank' ? "Enter Rank" : "Enter Marks (0-300)"}
        inputProps={{
          min: currentInputMode === 'rank' ? "1" : "0",
          max: currentInputMode === 'marks' ? "300" : undefined,
          inputMode: "numeric",
          pattern: "[0-9]*",
          style: {
            fontSize: "1rem",
            textAlign: "left",
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
