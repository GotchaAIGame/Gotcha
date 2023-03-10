import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  nickName: string;
  isLogin: boolean;
}

const initialState: UserState = {
  nickName: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인
    setLogin: (
      state,
      action: PayloadAction<{ nickname: string }>
    ) => {
      return{
        ...state,
        nickName: action.payload.nickname,
        isLogin: true,
      };
    },
    // 로그아웃
    logOut: (state) => {
      return{
        ...state,
        nickName: "",
        isLogin: true,
      };
    },
  },
});

export const { setLogin, logOut } = userSlice.actions;
export default userSlice.reducer;