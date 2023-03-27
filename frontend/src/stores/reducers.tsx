import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import users from "./users/userSlice";
import theme from "./users/themeSlice";
import game from "./game/gameSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const reducers = combineReducers({
  users,theme, game
});

export default persistReducer(persistConfig, reducers);
