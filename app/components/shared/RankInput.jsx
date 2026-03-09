"use client";
import { TextField, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setInputMode, setRank, setMarks } from "../../../features/collegePredictor/collegePredictorSlice";
import {
  liquidFieldSx,
  liquidFormLabelSx,
  liquidTogglePillSx,
  liquidToggleTrackSx,
} from "./liquidGlassStyles";

const TRACK_PADDING = 6;
const GAP = 4; /* gap between pill and segment edge */

export default function RankInput() {
  const dispatch = useDispatch();
  const { inputMode, marks, rank } = useSelector((state) => state.collegePredictor || {});
  const currentInputMode = inputMode || 'rank';

  const handleModeChange = (mode) => {
    dispatch(setInputMode(mode));
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
          component="p"
          sx={liquidFormLabelSx}
        >
          {currentInputMode === 'rank' ? 'JEE Main Rank' : 'JEE Main Marks'}
        </Typography>
        <Box
          sx={liquidToggleTrackSx}
        >
          {/* Sliding pill – aligned to each 50% segment */}
          <Box
            sx={{
              ...liquidTogglePillSx,
              left: currentInputMode === "rank" ? TRACK_PADDING : `calc(50% + ${GAP / 2}px)`,
              width: `calc(50% - ${TRACK_PADDING + GAP / 2}px)`,
            }}
          />
          <Box sx={{ display: "flex", position: "relative", zIndex: 1, alignItems: "stretch" }}>
            <Box
              onClick={() => handleModeChange("rank")}
              sx={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 0.9,
                px: { xs: 1.5, sm: 2.5 },
                textAlign: "center",
                fontSize: { xs: 12, sm: 14 },
                fontWeight: currentInputMode === "rank" ? 600 : 400,
                color: currentInputMode === "rank" ? "white" : "rgba(255, 255, 255, 0.9)",
                cursor: "pointer",
                userSelect: "none",
                transition: "color 0.25s ease",
              }}
            >
              Rank
            </Box>
            <Box
              onClick={() => handleModeChange("marks")}
              sx={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 0.9,
                px: { xs: 1.5, sm: 2.5 },
                textAlign: "center",
                fontSize: { xs: 12, sm: 14 },
                fontWeight: currentInputMode === "marks" ? 600 : 400,
                color: currentInputMode === "marks" ? "white" : "rgba(255, 255, 255, 0.9)",
                cursor: "pointer",
                userSelect: "none",
                transition: "color 0.25s ease",
              }}
            >
              Marks
            </Box>
          </Box>
        </Box>
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
          ...liquidFieldSx,
          "& .MuiInputBase-input": {
            ...liquidFieldSx["& .MuiInputBase-input, & .MuiSelect-select"],
            py: 1.5,
          },
        }}
      />
    </Box>
  );
}
