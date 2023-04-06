import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import logo from "@assets/logo.svg";

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const unState = () => {
  return { ...initialState };
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    // 로드완료
    setLoaded: (state) => unState(),
    // 로딩 상태 변경
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
