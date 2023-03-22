import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import logo from "@assets/logo.svg";

interface ThemeState {
  themeColor: string;
  themeLogo: string;
  themeTitle: string;
}

const initialState: ThemeState = {
  themeColor: "#5551FF",
  themeLogo: logo,
  themeTitle: "일이삼사오육칠팔구십일이삼사오육칠팔구십"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<{
        themeColor: string;
        themeLogo: string;
        themeTitle: string;
      }>
    ) => {
      const { themeColor, themeLogo, themeTitle } = action.payload;
      return {
        ...state,
        themeColor,
        themeLogo,
        themeTitle,
      };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
