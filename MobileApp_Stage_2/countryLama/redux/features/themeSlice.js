import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Initial state
const initialState = {
  theme: "light", // Default theme
  loading: false, // Loading state for async operations
  error: null, // Error state
};

// Async thunk to save the theme to AsyncStorage
export const saveTheme = createAsyncThunk(
  "theme/saveTheme",
  async (theme, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem("theme", theme); // Save theme to AsyncStorage
      return theme; // Return the saved theme
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

// Async thunk to load the theme from AsyncStorage
export const loadTheme = createAsyncThunk(
  "theme/loadTheme",
  async (_, { rejectWithValue }) => {
    try {
      const theme = await AsyncStorage.getItem("theme"); // Load theme from AsyncStorage
      return theme || "dark"; // Return the loaded theme or default to "light"
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

// Create the theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Synchronous action to set the theme in the state
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle loading state for saveTheme
    builder.addCase(saveTheme.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveTheme.fulfilled, (state, action) => {
      state.theme = action.payload; // Update theme in state
      state.loading = false;
    });
    builder.addCase(saveTheme.rejected, (state, action) => {
      state.error = action.payload; // Set error message
      state.loading = false;
      Alert.alert("Error", "Failed to save theme."); // Show error alert
    });

    // Handle loading state for loadTheme
    builder.addCase(loadTheme.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadTheme.fulfilled, (state, action) => {
      state.theme = action.payload; // Update theme in state
      state.loading = false;
    });
    builder.addCase(loadTheme.rejected, (state, action) => {
      state.error = action.payload; // Set error message
      state.loading = false;
      Alert.alert("Error", "Failed to load theme."); // Show error alert
    });
  },
});

// Export actions and reducer
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;