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
    setProblems: (
      state,
      action: PayloadAction<Array<{
        id : number,
        name : string,
        hint : string,
        imageUrl : string,
      }>>
    ) => {
      const newProblems = action.payload.map((item, idx) => {
        const {id, name, hint, imageUrl} = item
        return {
          problemId : id,
          problemName : name,
          problemDesc : hint,
          problemImgURL : imageUrl
        }
      })
      
      return {
        ...state,
        problems : newProblems
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterandStart.fulfilled, (state, action) => {
      console.log(action.payload)

      const {responseStart} = action.payload
      const { data } = responseStart;
      const newSolved = data.result.map((problem : any) => {
        return { id : problem.problemId, solved : false }
      })
      const dataLength = data.result.length;

      return {
        ...state,
        problems: data.result,
        solved: newSolved
      };
    });
  },
});

export { gamePlaySlice, RegisterandStart };
export const { setProblems } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;
