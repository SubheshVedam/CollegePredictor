'use client'
import React from 'react';
import { Typography, Alert } from '@mui/material';
import CollegeSearchForm from './CollegeSearchForm'; // Assuming this exists

const CollegePredictorSearch = ({
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
  error
}) => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        College Predictor
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <CollegeSearchForm
        rank={rank}
        setRank={setRank}
        gender={gender}
        setGender={setGender}
        category={category}
        setCategory={setCategory}
        stateId={stateId}
        setStateId={setStateId}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default CollegePredictorSearch;