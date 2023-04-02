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

const RegisterandStart = createAsyncThunk(
  "gameplay/RegisterandStart",
  async (payload: { roomId: number; nickname: string, password : string }) => {
    const { roomId, nickname, password } = payload;
    const startDateTime = new Date(Date.now()).toISOString();

    const responseRegister = await gamePlayAPI.register(roomId, nickname, password) // 유저가 등록된 유저인지 확인 
    const responseStart = await gamePlayAPI.start(roomId, nickname, startDateTime); // 게임 시작

    return { responseRegister, responseStart }
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
    builder.addCase(RegisterandStart.fulfilled, (state, action) => {
      console.log(action.payload)

      const {responseStart} = action.payload
      const { data } = responseStart;
      const dataLength = data.result.length;

      return {
        ...state,
        problems: data.result,
        solved: new Array(dataLength).fill(false),
      };
    });
  },
});

export { gamePlaySlice, RegisterandStart };
export const { registerUser } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;
