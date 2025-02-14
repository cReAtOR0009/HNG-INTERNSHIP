import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { filterData } from "../../utils/filterUtils";

const API_URL = "https://restcountries.com/v3.1/all";
export const TOKEN = "2144|3zUtRs2bGtf4aORot3vOLmDJt3zSdBJH1ziZmEHs";


// Async thunk for fetching countries
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });



      // Ensure correct data extraction
      return response.data?.data || response.data || [];
    } catch (error) {
      Alert.alert("Error", "Error fetching country details:")
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  list: [],
  filteredList: [],
  status: "idle",
  error: null,
  groupedCountries:[]
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getFilteredData: (state, action) => {
      state.filteredList = filterData(state.list, action.payload);
    },

    setStatus:(state, action) => {
      state.status = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.filteredList = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {getFilteredData, setStatus} = countrySlice.actions;
export default countrySlice.reducer;
