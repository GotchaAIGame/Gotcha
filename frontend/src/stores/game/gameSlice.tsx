import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import produce from "immer";

interface gameState {
  brandColor: string;
  logoUrl: string;
  title: string;
  eventDesc: string;
  eventUrl: string;
  hasReward: boolean;
  startTime: string;
  endTime: string;
  problems: object[];
}

interface problemState {
  id?: number;
  image: string;
  name: string;
  hint: string;
}

// interface listProblemState {Record<names, number>}

const initialState: gameState = {
  brandColor: "#5551FF",
  logoUrl: "",
  title: "",
  eventUrl: "",
  eventDesc: "",
  hasReward: false,
  startTime: "",
  endTime: "",
  problems: [
    {
      image: "",
      name: "",
      hint: "",
    },
  ],
};

const resetState = () => {
  return { ...initialState };
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
        startTime: string;
        eventDesc: string;
        endTime: string;
      }>
    ) => {
      return {
        ...state,
        title: action.payload.title,
        eventDesc: action.payload.eventDesc,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
      };
    },

    // 생성된 정보 받아와서 갱신
    setOriginGame: (
      state,
      action: PayloadAction<{
        title: string;
        startTime: string;
        eventDesc: string;
        endTime: string;
        logoUrl: string;
      }>
    ) => {
      return {
        ...state,
        title: action.payload.title,
        eventDesc: action.payload.eventDesc,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        logoUrl: action.payload.logoUrl,
      };
    },

    // 게임 문제창 추가
    addProblem: (state) => {
      state.problems.push({
        image: "",
        name: "",
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

    // 게임 문제 전체 갱신
    setProblems: (state, action: PayloadAction<object[]>) => {
      return {
        ...state,
        problems: action.payload,
      };
    },

    // 게임 문제 삭제
    // deleteProblem: (state, action: PayloadAction<{ idx: number }>) => {
    //   console.log("지워볼게");
    //   const data = action.payload;
    //   const coppiedProblems = state.problems;
    //   coppiedProblems.splice(data.idx, 1);

    //   return {
    //     ...state,
    //     problems: coppiedProblems,
    //   };
    // },

    deleteProblem: (state, action: PayloadAction<number>) => {
      // const idxToDelete = state.problems.findIndex(p => p.id === action.payload);
      const idxToDelete = action.payload;
      return produce(state, (draft) => {
        draft.problems.splice(idxToDelete, 1);
      });
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

    // 게임 정보 초기화
    resetGame: (state) => resetState(),
  },
});

export const {
  setGame,
  addProblem,
  setProblem,
  deleteProblem,
  setGameCustom,
  resetGame,
  setProblems,
  setOriginGame,
} = gameSlice.actions;
export default gameSlice.reducer;
