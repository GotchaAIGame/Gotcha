import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import users from "./users/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const reducers = combineReducers({
  users,
});

export default persistReducer(persistConfig, reducers);