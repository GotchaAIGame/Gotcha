import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string;
  isLogin: boolean;
}

const initialState: UserState = {
  userId: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인
    setLogin: (
      state,
      action: PayloadAction<{ userId: string }>
    ) => {
      return{
        ...state,
        userId: action.payload.userId,
        isLogin: true,
      };
    },
    // 로그아웃
    setLogout: (state) => {
      return{
        ...state,
        userId: "",
        isLogin: false,
      };
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;