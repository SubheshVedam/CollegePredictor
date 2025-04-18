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

      router.push(`/results?${queryParams}`);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RankInput value={rank} onChange={(value) => dispatch(setRank(value))} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
      <LoadingButton
        type="submit"
        loading={isLoading}
        text="Find Colleges"
        loadingText="Searching..."
      />
    </form>
  );
}
