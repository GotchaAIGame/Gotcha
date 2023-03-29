import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 편집 중
interface problemListState {
  problems: object[];
}

interface problemState {
  image: string;
  name: string;
  description: string;
  hint: string;
}

const initialState: problemListState = {
  problems: [],
};

export const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    // 문제 추가
    newProblem: (state, action: PayloadAction<problemState>) => {
      state.problems.push(action.payload);
    },
  },
});

// export const { setGame, setGameCustom } = gameSlice.actions;
// export default gameSlice.reducer;
