import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countrySlice";
import filterReducer from "./features/filterSlice";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    countries: countryReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
});
