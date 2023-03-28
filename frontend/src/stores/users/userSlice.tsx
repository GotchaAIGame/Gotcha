import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  nickname: string;
  organization?: string;
  profileImage?: string;
  isLogin: boolean;
}

const initialState: UserState = {
  email: "",
  nickname: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인
    setLogin: (
      state,
      action: PayloadAction<UserState>
    ) => {
      return {
        ...state,
        email: action.payload.email,
        nickname: action.payload.nickname,
        isLogin: true,
      };
    },
    // 로그아웃
    setLogout: (state) => {
      return {
        ...state,
        email: "",
        isLogin: false,
      };
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
