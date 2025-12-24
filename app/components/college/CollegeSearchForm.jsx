"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setYear,
  setCategory,
  setGender,
  setIsLoading,
  setRank,
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
  const { rank, gender, category, year, stream, stateId, isLoading } = useSelector(
    (state) => state.collegePredictor || {}
  );

  // Check if all fields are selected
  const isFormValid = rank && gender && category && year && stream && stateId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    if (!isFormValid) {
      return; // Do nothing if form is invalid
    }

    onSearchComplete();
    try {
      // Dispatch the search action
      // await dispatch(
      //   fetchCollegeResults({ rank, gender, category, stateId })
      // ).unwrap();

      // Redirect to results page with query parameters
      dispatch(setIsLoading(false));
      const queryParams = new URLSearchParams({
        rank,
        gender,
        category,
        stream,
        stateId,
      }).toString();

      router.replace(`/results?${queryParams}`);
    } catch {
      // Search navigation failed
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
        <RankInput
          value={rank}
          onChange={(value) => dispatch(setRank(value))}
        />
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
