"use client";
import { useState } from "react";
import RankInput from "../shared/RankInput";
import GenderSelector from "./GenderSelector";
import CategorySelector from "./CategorySelector";
import StateSelector from "./StateSelector";
import LoadingButton from "../shared/LoadingButton";

export default function CollegeSearchForm({
  rank,
  setRank,
  gender,
  setGender,
  category,
  setCategory,
  stateId,
  setStateId,
  onSubmit,
  isLoading,
}) {
  return (
    <div className="space-y-4">
      <RankInput value={rank} onChange={setRank} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GenderSelector value={gender} onChange={setGender} />
        <CategorySelector value={category} onChange={setCategory} />
        <StateSelector value={stateId} onChange={setStateId} />
      </div>
      <LoadingButton 
        onClick={onSubmit} 
        loading={isLoading}
        text="Find Colleges"
        loadingText="Searching..."
      />
    </div>
  );
}