import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import produce from "immer";

interface rewardsState {
  rewards: Array<{
    id: number;
    name: string;
    grade: number;
    image: string;
  }>;
}

const initialState: rewardsState = {
  rewards: [
    {
      id: -1,
      name: "",
      grade: 1,
      image: "",
    },
    {
      id: -2,
      name: "",
      grade: 2,
      image: "",
    },
    {
      id: -3,
      name: "",
      grade: 3,
      image: "",
    },
  ],
};

export const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    // 초기 정보 생성
    setRewards: (
      state,
      action: PayloadAction<{
        rewards: Array<{
          id: number;
          name: string;
          grade: number;
          image: string;
        }>;
      }>
    ) => {
      return {
        ...state,
        rewards: action.payload.rewards,
      };
    },
  },
});

export const { setRewards } = rewardsSlice.actions;
export default rewardsSlice.reducer;
