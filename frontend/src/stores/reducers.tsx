import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import users from "./users/userSlice";
import theme from "./player/themeSlice";
import game from "./game/gameSlice";
import gamePlay from "./game/gamePlaySlice";
import rewards from "./game/rewardsSlice";
import loading from "./loading/loadingSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "gamePlay", "theme"],
};

const reducers = combineReducers({
  users,
  theme,
  game,
  gamePlay,
  rewards,
  loading,
});

export default persistReducer(persistConfig, reducers);
