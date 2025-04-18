"use client";
import RankInput from "../shared/RankInput";
import GenderSelector from "./GenderSelector";
import CategorySelector from "./CategorySelector";
import StateSelector from "./StateSelector";
import LoadingButton from "../shared/LoadingButton";

export default function CollegeSearchForm({
  rank = "",
  setRank,
  gender = "Gender Neutral",
  setGender,
  category = "OPEN",
  setCategory,
  stateId = "",
  setStateId,
  onSubmit,
  isLoading = false
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rank, gender, category, stateId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RankInput value={rank} onChange={setRank} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GenderSelector value={gender} onChange={setGender} />
        <CategorySelector value={category} onChange={setCategory} />
        <StateSelector value={stateId} onChange={setStateId} />
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