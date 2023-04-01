import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import users from "./users/userSlice";
import theme from "./player/themeSlice";
import game from "./game/gameSlice";
import rewards from "./game/rewardsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "theme"],
};

const reducers = combineReducers({
  users,
  theme,
  game,
  rewards,
});

export default persistReducer(persistConfig, reducers);
