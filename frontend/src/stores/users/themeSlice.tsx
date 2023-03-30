import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import logo from "@assets/logo.svg";

interface ThemeState {
  room: number; // roomId
  reward: boolean; // hasReward
  themeColor: string; // color
  themeLogo: string; // logoUrl
  themeTitle: string; // title
}

const initialState: ThemeState = {
  room: 0,
  reward: false,
  themeColor: "#5551FF",
  themeLogo: logo,
  themeTitle: "",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<{
        room: string;
        reward: boolean;
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
