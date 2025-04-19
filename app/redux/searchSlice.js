'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCollegeResults = createAsyncThunk(
  'collegePredictor/fetchCollegeResults',
  async (searchParams, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(searchParams);
      const response = await fetch(`/api/colleges?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchProgramDetails = createAsyncThunk(
  'collegePredictor/fetchProgramDetails',
  async ({ instituteId, programName, gender, category, sub_category }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        institute_id: instituteId,
        program_name: programName,
        gender,
        category,
        sub_category
      });

      const response = await fetch(`/api/program-details?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch program details');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  rank: '',
  gender: 'Gender Neutral',
  category: 'OPEN',
  stateId: '',
  results: [],
  dummyResults: [],
  isLoading: false,
  error: null,
  isVerified: false,
  showOtpModal: false,
  showSearchModal: false,
  phoneNumber: '',
  searchQuery: '',
  programDetails: null,
  programDetailsLoading: false,
  programDetailsError: null,
  programDetailsModalOpen: false,
};

const searchSlice = createSlice({
  name: 'collegePredictor',
  initialState,
  reducers: {
    setRank: (state, action) => {
      state.rank = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setStateId: (state, action) => {
      state.stateId = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setDummyResults: (state, action) => {
      state.dummyResults = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setShowOtpModal: (state, action) => {
      state.showOtpModal = action.payload;
    },
    setShowSearchModal: (state, action) => {
      state.showSearchModal = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setProgramDetailsModalOpen: (state, action) => {
      state.programDetailsModalOpen = action.payload;
    },  
    clearProgramDetails: (state) => {
      state.programDetails = null;
      state.programDetailsError = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollegeResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollegeResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(fetchCollegeResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProgramDetails.pending, (state) => {
        state.programDetailsLoading = true;
        state.programDetailsError = null;
      })
      .addCase(fetchProgramDetails.fulfilled, (state, action) => {
        state.programDetailsLoading = false;
        state.programDetails = action.payload;
        state.programDetailsModalOpen = true;
      })
      .addCase(fetchProgramDetails.rejected, (state, action) => {
        state.programDetailsLoading = false;
        state.programDetailsError = action.payload;
      });
  },
});

export const {
  setRank,
  setGender,
  setCategory,
  setStateId,
  setResults,
  setDummyResults,
  setIsLoading,
  setError,
  setIsVerified,
  setShowOtpModal,
  setShowSearchModal,
  setPhoneNumber,
  setSearchQuery,
  setProgramDetailsModalOpen,
  clearProgramDetails,
  resetState,
} = searchSlice.actions;

export default searchSlice.reducer;