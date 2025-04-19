"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollegeResults,
  setCategory,
  setGender,
  setRank,
  setStateId,
} from "../../redux/searchSlice";
import RankInput from "../shared/RankInput";
import GenderSelector from "./GenderSelector";
import CategorySelector from "./CategorySelector";
import StateSelector from "./StateSelector";
import LoadingButton from "../shared/LoadingButton";
import { Box, Grid } from "@mui/material";

export default function CollegeSearchForm({ onSearchComplete }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { rank, gender, category, stateId, isLoading } = useSelector(
    (state) => state.collegePredictor || {}
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearchComplete();
    try {
      // Dispatch the search action
      await dispatch(
        fetchCollegeResults({ rank, gender, category, stateId })
      ).unwrap();

      // Redirect to results page with query parameters
      const queryParams = new URLSearchParams({
        rank,
        gender,
        category,
        stateId,
      }).toString();

      router.replace(`/results?${queryParams}`);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        <StateSelector
          value={stateId}
          onChange={(value) => dispatch(setStateId(value))}
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            text="Find Colleges"
            loadingText="Searching..."
          />
        </Box>
      </Box>
    </Box>
  );
}
