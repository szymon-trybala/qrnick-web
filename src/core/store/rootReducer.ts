import { combineReducers } from "redux";
import gamesList from "./slices/gamesList/gamesListSlice";
import auth from "./slices/auth/authSlice";

const rootReducer = combineReducers({
  gamesList,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
