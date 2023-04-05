import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reward {
  id: number;
  name: string;
  grade: number;
  image: string;
}

interface RewardsState {
  rewards: Reward[];
}

const initialState: RewardsState = {
  rewards: [],
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setRewards: (state, action: PayloadAction<Reward[]>) => {
      state.rewards = action.payload;
    },
    updateReward: (state, action: PayloadAction<Reward>) => {
      const rewardIndex = state.rewards.findIndex(
        (reward) => reward.id === action.payload.id
      );
      if (rewardIndex !== -1) {
        state.rewards[rewardIndex] = action.payload;
      }
    },
  },
});

export const { setRewards, updateReward } = rewardsSlice.actions;

export default rewardsSlice.reducer;