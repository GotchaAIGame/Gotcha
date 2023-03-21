import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import logo from "@assets/logo.svg";

interface ThemeState {
  themeColor: string;
  themeLogo: string;
}

const initialState: ThemeState = {
  themeColor: "#5551FF",
  themeLogo: logo,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<{ themeColor: string; themeLogo: string }>
    ) => {
      const { themeColor, themeLogo } = action.payload;
      return {
        ...state,
        themeColor,
        themeLogo,
      };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
