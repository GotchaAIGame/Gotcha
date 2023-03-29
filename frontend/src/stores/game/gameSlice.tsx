import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

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

// interface listProblemState {Record<names, number>}

const initialState: gameState = {
  brandColor: "5551FF",
  logoUrl: "",
  title: "",
  eventUrl: "",
  description: "",
  hasReward: false,
  startTime: "",
  endTime: "",
  problems: [
    {
      image: "",
      name: "",
      description: "",
      hint: "",
    },
  ],
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

    // 게임 문제창 추가
    addProblem: (state) => {
      state.problems.push({
        image: "",
        name: "",
        description: "",
        hint: "",
      });
    },

    // 게임 문제 내용 반영
    setProblem: (
      state,
      action: PayloadAction<{ problemState: problemState; idx: number }>
    ) => {
      const { problemState, idx } = action.payload;
      // console.log(problemState, "state");

      const newProblems = state.problems.map((data, dataIdx) => {
        let tempData = data;
        if (dataIdx === idx) {
          tempData = problemState;
        }
        return tempData;
      });

      return {
        ...state,
        problems: newProblems,
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
        logo_url: action.payload.logoUrl,
        brandColor: action.payload.brandColor,
      };
    },
  },
});

export const { setGame, addProblem, setProblem, setGameCustom } =
  gameSlice.actions;
export default gameSlice.reducer;
