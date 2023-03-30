import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import users from "./users/userSlice";
import theme from "./users/themeSlice";
import game from "./game/gameSlice";
import gamePlay from "./game/gamePlaySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "gamePlay"],
};

const reducers = combineReducers({
  users,
  theme,
  game,
  gamePlay,
});

export default persistReducer(persistConfig, reducers);
