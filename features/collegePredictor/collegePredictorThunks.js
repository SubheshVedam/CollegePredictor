'use client'

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCollegeResults = createAsyncThunk(
  'collegePredictor/fetchCollegeResults',
  async ({ rank, gender, category, stateId }, { getState, dispatch }) => {
    try {
      const params = new URLSearchParams({
        rank,
        gender,
        category,
        state_id: stateId,
      });

      const res = await fetch(`/api/colleges?${params}`);
      if (!res.ok) throw new Error('Failed to fetch results');

      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);