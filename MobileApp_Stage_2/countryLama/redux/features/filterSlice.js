import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for filters
const initialState = {
  searchTerm: "", // Search term filter
  timeZone: [],   // Array of selected time zones
  continents: [], // Array of selected continents
  language: "en",   // Selected language
};

const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Set the search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // Add a time zone to the selected time zones
    setTimeZone: (state, action) => {
      // Avoid duplicates
      if (!state.timeZone.includes(action.payload)) {
        state.timeZone = [...state.timeZone, action.payload];
      }
    },

    // Add a continent to the selected continents
    setContinent: (state, action) => {
      // Avoid duplicates
      if (!state.continents.includes(action.payload)) {
        state.continents = [...state.continents, action.payload];
      }
    },

    // Set the selected language
    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // Reset all filters to their initial state
    resetFilters: (state) => {
      state.searchTerm = initialState.searchTerm;
      state.timeZone = initialState.timeZone;
      state.continents = initialState.continents;
      state.language = initialState.language;
    },

    // Optional: Remove a specific time zone
    removeTimeZone: (state, action) => {
      state.timeZone = state.timeZone.filter((tz) => tz !== action.payload);
    },

    // Optional: Remove a specific continent
    removeContinent: (state, action) => {
      state.continents = state.continents.filter((continent) => continent !== action.payload);
    },
  },
});

// Export the actions
export const {
  setSearchTerm,
  setTimeZone,
  setContinent,
  setLanguage,
  resetFilters,
  removeTimeZone,
  removeContinent,
} = FilterSlice.actions;

// Export the reducer
export default FilterSlice.reducer;