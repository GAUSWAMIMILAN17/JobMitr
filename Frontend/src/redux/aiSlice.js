import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aiRecomendedJobs: [],
};

const aiRecommendedJobs = createSlice({
  name: "aiRecommendedJobs",
  initialState,
  reducers: {
    setAiRecommendedJobs(state, action) {
      state.aiRecomendedJobs = action.payload; // Update state with fetched AI recommended jobs
    },
  },
});

export const { setAiRecommendedJobs } = aiRecommendedJobs.actions;
export default aiRecommendedJobs.reducer;
