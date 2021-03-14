import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "../../store";
import { Game } from "./types";

const initialState: Game[] = [
  {
    id: 0,
    name: "Mockup - Heroes III",
    updatedAt: new Date("2021-03-05"),
    version: "1.0",
    downloadUrls: ["/temp", "/temp2", "/temp3", "/temp4"],
  },
  {
    id: 1,
    name: "Mockup - Kangurek Kao",
    updatedAt: new Date("2021-03-02"),
    version: "1.2",
    downloadUrls: ["/temp", "/temp2", "/temp3", "/temp4"],
  },
  {
    id: 2,
    name: "Mockup - Diablo 2",
    updatedAt: new Date("2021-02-23"),
    version: "1.6",
    downloadUrls: ["/temp", "/temp2", "/temp3", "/temp4"],
  },
];

const gamesListSlice = createSlice({
  name: "gamesList",
  initialState,
  reducers: {
    addGame(state, action: PayloadAction<Game>) {
      state.push(action.payload);
    },
    setGames(state, action: PayloadAction<Game[]>) {
      return action.payload;
    },
  },
});

export const { addGame, setGames } = gamesListSlice.actions;

export const refreshGamesList = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  // const newGamesList = await gamesService.get();
  // dispatch(gamesListSlice.actions.addGames(newGamesList));
  console.log("TODO - pobieranie listy gier, po dodaniu API");
};

export default gamesListSlice.reducer;
