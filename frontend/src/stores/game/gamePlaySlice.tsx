import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { gamePlayAPI } from "@apis/apis";

interface problem {
  problemId: number;
  problemName: string;
  problemDesc: string;
  problemImgURL: string;
}

interface gamePlayState {
  roomId: number;
  nickname: string;
  startTime: string;
  solved: Array<{ id: number; solved: boolean }>;
  problems: Array<problem> | [];
}

const initialState: gamePlayState = {
  roomId: 0,
  nickname: "",
  startTime: "",
  solved: [{ id: 0, solved: false }],
  problems: [],
};

// 게임 새로 시작
const RegisterandStart = createAsyncThunk(
  "gameplay/RegisterandStart",
  async (payload: { roomId: number; nickname: string; password: string }) => {
    const { roomId, nickname, password } = payload;
    const startDateTime = new Date(Date.now()).toISOString();

    const responseRegister = await gamePlayAPI.register(
      roomId,
      nickname,
      password
    ); // 유저가 등록된 유저인지 확인
    const responseStart = await gamePlayAPI.start(
      roomId,
      nickname,
      startDateTime
    ); // 게임 시작

    localStorage.setItem("curUserInfo", JSON.stringify({ roomId, nickname }));

    return {
      responseRegister,
      responseStart,
      roomId,
      nickname,
      password,
      startDateTime,
    };
  }
);

// 게임 재시작
const reStart = createAsyncThunk(
  "gameplay/reStart",
  async (payload: { roomId: number; nickname: string; password: number }) => {
    const { roomId, nickname, password } = payload;

    // 유저가 새 유저 정보 받아오기
    const responseReStart = await gamePlayAPI.rejoin(roomId, nickname); // 게임 시작

    return {
      responseReStart,
      roomId,
      nickname,
      password,
    };
  }
);

const gamePlaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    // register user
    setProblems: (
      state,
      action: PayloadAction<
        Array<{
          id: number;
          name: string;
          hint: string;
          imageUrl: string;
        }>
      >
    ) => {
      const newProblems = action.payload.map((item) => {
        const { id, name, hint, imageUrl } = item;
        return {
          problemId: id,
          problemName: name,
          problemDesc: hint,
          problemImgURL: imageUrl,
        };
      });

      const newSolved = newProblems.map((problem: any) => {
        return { id: problem.problemId, solved: false };
      });

      return {
        ...state,
        problems: newProblems,
        solved: newSolved,
      };
    },
    setSolved: (state, action: PayloadAction<{ idx: string }>) => {
      const { idx } = action.payload;
      const idxinNum = parseInt(idx, 10);

      const localSolved = JSON.parse(localStorage.getItem("solved") as string);
      const newLocalSolved = localSolved.map((item: any) => {
        const newItem = item;

        if (newItem.id === idxinNum) {
          // 같으면
          newItem.solved = true;
        }
        return newItem;
      });

      localStorage.setItem("solved", JSON.stringify(newLocalSolved));

      state.solved?.map((item) => {
        const newItem = item;

        if (newItem.id === idxinNum) {
          // 같으면
          newItem.solved = true;
        }
        return newItem;
      });
    },
    // 참여자 정보
    setPlayer: (
      state,
      action: PayloadAction<{
        roomId: number; // roomId
        nickname: string; // 닉네임
        startTime: string; // 시작시간
      }>
    ) => {
      const { roomId, nickname } = action.payload;
      let { startTime } = action.payload;
      if (!startTime.endsWith("Z")) {
        startTime += "Z";
      }

      return {
        ...state,
        roomId,
        nickname,
        startTime,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterandStart.fulfilled, (state, action) => {
      const {
        responseStart,
        roomId,
        nickname,
        password,
        startDateTime,
        responseRegister,
      } = action.payload;
      const { data } = responseStart;
      const newSolved = data.result.map((problem: any) => {
        return { id: problem.problemId, solved: false };
      });

      localStorage.setItem("solved", JSON.stringify(newSolved));

      return {
        ...state,
        roomId,
        nickname,
        password,
        problems: data.result,
        solved: newSolved,
        startTime: startDateTime,
      };
    });
    builder.addCase(reStart.fulfilled, (state, action) => {
      const { responseReStart, roomId, nickname } = action.payload;
      const { data } = responseReStart;

      const localCurUserInfo = localStorage.getItem("curUserInfo");
      const localSolved = localStorage.getItem("solved");

      let JsonLocalCurUserInfo;
      let JsonLocalSolved;

      if (localCurUserInfo && localSolved) {
        // 저장된 기록이 있다면
        JsonLocalCurUserInfo = JSON.parse(localCurUserInfo);
        JsonLocalSolved = JSON.parse(localSolved);

        const { localNickname = nickname, localRoomId = roomId } =
          JsonLocalCurUserInfo;

        if (nickname === localNickname && roomId === localRoomId) {
          // 저장된 기록이 유효하다면
          // console.log("기록 유효");
        }
      } else {
        // 저장된 기록이 유효하지 않거나, 정보가 없다면727
        JsonLocalSolved = data.result.map((problem: any) => {
          return { id: problem.problemId, solved: false };
        });
      }

      // local에 저장
      localStorage.setItem("curUserInfo", JSON.stringify({ nickname, roomId }));
      localStorage.setItem("solved", JSON.stringify(JsonLocalSolved));

      return {
        ...state,
        roomId,
        nickname,
        problems: data.result,
        solved: JsonLocalSolved,
      };
    });
  },
});

export { gamePlaySlice, RegisterandStart, reStart };
export const { setProblems, setSolved, setPlayer } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;
