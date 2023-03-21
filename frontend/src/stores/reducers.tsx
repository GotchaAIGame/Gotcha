import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import users from "./users/userSlice";
import theme from "./users/themeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const reducers = combineReducers({
  users,
  theme,
});

export default persistReducer(persistConfig, reducers);