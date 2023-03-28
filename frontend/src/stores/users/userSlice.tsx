import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  isLogin: boolean;
}

const initialState: UserState = {
  email: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인
    setLogin: (state, action: PayloadAction<{ email: string }>) => {
      return {
        ...state,
        email: action.payload.email,
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
