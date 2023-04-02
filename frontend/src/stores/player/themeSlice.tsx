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
}

const initialState: ThemeState = {
  room: 0,
  reward: false,
  themeColor: "#5551FF",
  themeLogo: logo,
  themeTitle: "",
};

const resetState = () => {
  return { ...initialState };
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // 방정보
    setTheme: (
      state,
      action: PayloadAction<{
        room: number;
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

    // 참여자 정보
    setPlayer: (
      state,
      action: PayloadAction<{
        room: number; // roomId
        nickname: string; // 닉네임
        startTime: string; // 시작시간
      }>
    ) => {
      const { room, nickname, startTime } = action.payload;
      return {
        ...state,
        room,
        nickname,
        startTime,
      };
    },
    // 게임 정보 초기화
    resetTheme: (state) => resetState(),
  },
});

export const { setTheme, setPlayer, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
