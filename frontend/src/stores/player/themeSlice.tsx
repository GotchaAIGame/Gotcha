// 사용하는 곳 (참여자 관련된 모든 곳)
// 1. 커스텀 네브바 2. 새게임, 재참여페이지 3. 게임페이지 4. 랭킹페이지
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import logo from "@assets/logo.svg";

interface ThemeState {
  room: number; // roomId
  reward: boolean; // hasReward
  themeColor: string; // color
  themeLogo: string; // logoUrl
  themeTitle: string; // title
  eventDesc?: string;
  eventUrl?: string;
}

const initialState: ThemeState = {
  room: 0,
  reward: false,
  themeColor: "#5551FF",
  themeLogo: logo,
  themeTitle: "",
  eventDesc: "",
  eventUrl: "",
};

const resetState = () => {
  return { ...initialState };
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Event 정보
    setEventInfo: (
      state,
      action: PayloadAction<{ eventDesc: string; eventUrl: string }>
    ) => {
      const { eventDesc, eventUrl } = action.payload;
      return {
        ...state,
        eventDesc,
        eventUrl,
      };
    },
    // 방정보
    setTheme: (
      state,
      action: PayloadAction<{
        room: number;
        reward: boolean;
        themeColor: string;
        themeLogo: string;
        themeTitle: string;
        eventUrl?: string;
        eventDesc?: string;
      }>
    ) => {
      const { room, reward, themeColor, themeLogo, themeTitle, eventUrl } =
        action.payload;
      return {
        ...state,
        room,
        reward,
        themeColor,
        themeLogo,
        themeTitle,
        eventUrl,
      };
    },
    // 게임 정보 초기화
    resetTheme: (state) => resetState(),
  },
});

export const { setTheme, resetTheme, setEventInfo } = themeSlice.actions;
export default themeSlice.reducer;
