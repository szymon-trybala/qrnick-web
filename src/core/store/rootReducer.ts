import { combineReducers } from "redux";
import gamesList from "./slices/gamesList/gamesListSlice"

const rootReducer = combineReducers({
    gamesList,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;