import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface gameState {
  brandColor: string;
  logo_url: string;
  title: string;
  event_url: string;
  code: string;
  description: string;
  has_reward: boolean;
  start_date: string;
  end_date: string;
  problems: {
    description: string;
    hint: string;
    name: string;
    // image: {};
  };
}

const initialState: gameState = {
  brandColor: "5551FF",
  logo_url: "",
  title: "",
  event_url: "",
  code: "",
  description: "",
  has_reward: false,
  start_date: "",
  end_date: "",
  problems: {
    description: "",
    hint: "",
    name: "",
    // image: {};
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // 초기 게임 생성
    setGame: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        start_date: string;
        end_date: string;
        problems: {
          description: string;
          hint: string;
          name: string;
        };
      }>
    ) => {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date,
        problems: action.payload.problems,
      };
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
        brandColor: action.payload.brandColor,
        logo_url: action.payload.logoUrl,
      };
    },

    // 로그아웃
    setLogout: (state) => {
      return {
        ...state,
        userId: "",
        isLogin: false,
      };
    },
  },
});

export const { setGame, setGameCustom } = gameSlice.actions;
export default gameSlice.reducer;
