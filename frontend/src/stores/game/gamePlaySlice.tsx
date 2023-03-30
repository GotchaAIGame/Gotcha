import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import { gamePlayAPI } from "@apis/apis";

interface problem {
  problemId: number;
  problemName: string;
  problemDesc: string;
  problemImgURL: string;
}

interface gamePlayState {
  solved: boolean[] | undefined;
  problems: Array<problem> | [];
}

const initialState: gamePlayState = {
  solved: undefined,
  problems: [],
};

const getProblemList = createAsyncThunk(
  "gameplay/getProblemList",
  async (payload: { roomId: number; nickname: string }) => {
    const { roomId, nickname } = payload;
    const startDateTime = new Date(Date.now()).toISOString();
    const response = await gamePlayAPI.start(roomId, nickname, startDateTime);

    return response;
  }
);

const gamePlaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    // register user
    registerUser: (
      state,
      action: PayloadAction<{
        roomId: number;
        nickname: string;
        password: number;
      }>
    ) => {
      const { roomId, nickname, password } = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProblemList.fulfilled, (state, action) => {
      const { data } = action.payload;
      const dataLength = data.result.length;

      return {
        ...state,
        problems: data.result,
        solved: new Array(dataLength).fill(false),
      };
    });
  },
});

export { gamePlaySlice, getProblemList };
export const { registerUser } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;
