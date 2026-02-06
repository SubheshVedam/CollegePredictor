"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setYear,
  setCategory,
  setGender,
  setIsLoading,
  setRank,
  setMarks,
  setRankRange,
  setStream,
  setStateId,
} from "../../../features/collegePredictor/collegePredictorSlice";
import RankInput from "../shared/RankInput";
import GenderSelector from "./GenderSelector";
import CategorySelector from "./CategorySelector";
import StateSelector from "./StateSelector";
import StreamSelector from "./StreamSelector";
import LoadingButton from "../shared/LoadingButton";
import { Box } from "@mui/material";
import YearSelector from "./YearSelector";

export default function CollegeSearchForm({ onSearchComplete }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { rank, marks, inputMode, rankRange, gender, category, year, stream, stateId, isLoading } = useSelector(
    (state) => state.collegePredictor || {}
  );

  // Check if all fields are selected
  // If inputMode is 'marks', check for marks; otherwise check for rank
  const hasValidInput = inputMode === 'marks' ? marks : rank;
  const isFormValid = hasValidInput && gender && category && year && stream && stateId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    if (!isFormValid) {
      dispatch(setIsLoading(false));
      return; // Do nothing if form is invalid
    }

    onSearchComplete();
    try {
      let finalRank = rank;

      // If marks mode is selected, convert marks to rank first
      if (inputMode === 'marks' && marks) {
        try {
          const response = await fetch("/api/marks-to-rank", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              marks: parseFloat(marks),
              year,
              category,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to convert marks to rank");
          }

          const data = await response.json();
          finalRank = data.rank.toString();
          // Update Redux state with the converted rank and rank range
          dispatch(setRank(finalRank));
          dispatch(setRankRange({
            min: data.minRank,
            max: data.maxRank
          }));
        } catch (error) {
          console.error("Error converting marks to rank:", error);
          dispatch(setIsLoading(false));
          return;
        }
      }

      // Redirect to results page with query parameters
      dispatch(setIsLoading(false));
      const queryParams = new URLSearchParams({
        rank: finalRank,
        gender,
        category,
        stream,
        stateId,
      });
      
      // Add rank range if marks mode was used
      if (inputMode === 'marks' && rankRange) {
        queryParams.set('minRank', rankRange.min.toString());
        queryParams.set('maxRank', rankRange.max.toString());
      }

      router.replace(`/results?${queryParams.toString()}`);

      router.replace(`/results?${queryParams}`);
    } catch (error) {
      console.error("Search navigation failed:", error);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1, sm: 2 },
          color: "white",
        }}
      >
        <RankInput />
        <GenderSelector
          value={gender}
          onChange={(value) => dispatch(setGender(value))}
        />
        <CategorySelector
          value={category}
          onChange={(value) => dispatch(setCategory(value))}
        />
        <YearSelector
          value={year}
          onChange={(value) => dispatch(setYear(value))}
        />
        <StreamSelector
          value={stream}
          onChange={(value) => dispatch(setStream(value))}
        />
        <StateSelector
          value={stateId}
          onChange={(value) => dispatch(setStateId(value))}
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            text={isFormValid ? "Predict College" : "*Please Fill All Fields"}
            loadingText="Searching..."
            disabled={!isFormValid}
          />
        </Box>
      </Box>
    </Box>
  );
}
