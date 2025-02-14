import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Async function to get the theme from storage
export const getTheme = createAsyncThunk("theme/getTheme", async () => {
  try {
    const storedTheme = await AsyncStorage.getItem("theme");
    return storedTheme || "light"; // Default to "light" if no theme is stored
  } catch (error) {
    Alert.alert("Error", "Error fetching theme")
    return "light"; // Fallback theme
  }
});

const initialState = {
  theme: "light",
};

// Create the theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTheme.fulfilled, (state, action) => {
      state.theme = action.payload;
    });
  },
});


// Export actions and reducer
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
