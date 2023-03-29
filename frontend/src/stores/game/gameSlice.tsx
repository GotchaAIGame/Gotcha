import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface gameState {
  brandColor: string;
  logoUrl: string;
  title: string;
  eventUrl: string;
  description: string;
  hasReward: boolean;
  startTime: string;
  endTime: string;
  problems: object[];
}

interface problemState {
  image: string;
  name: string;
  description: string;
  hint: string;
}

const initialState: gameState = {
  brandColor: "5551FF",
  logoUrl: "",
  title: "",
  eventUrl: "",
  description: "",
  hasReward: false,
  startTime: "",
  endTime: "",
  problems: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // 초기 정보 생성
    setGame: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        startTime: string;
        endTime: string;
      }>
    ) => {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
      };
    },

    // 게임 문제 추가
    newProblem: (state, action: PayloadAction<problemState>) => {
      state.problems.push(action.payload);
    },

    // 게임 커스텀
    setGameCustom: (
      state,
      action: PayloadAction<{
        brandColor: string;
        logoUrl: string;
      }>
    ) => {
      return {
        ...state,
        logo_url: action.payload.logoUrl,
        brandColor: action.payload.brandColor,
      };
    },
  },
});

export const { setGame, setGameCustom } = gameSlice.actions;
export default gameSlice.reducer;
