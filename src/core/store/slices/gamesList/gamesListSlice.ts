import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameMetadataDto, gamesService } from "../../../api/gamesService";
import { GamesListState } from "./types";

const initialState: GamesListState = {
  games: [],
  error: undefined,
  promise: "initial",
};

const gamesListSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGame(state, action: PayloadAction<GameMetadataDto>) {
      state.games.push(action.payload);
    },
    setGames(state, action: PayloadAction<GameMetadataDto[]>) {
      state.games = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gamesService.fetchGamesList.pending, (state) => {
      state.promise = "pending";
    });
    builder.addCase(
      gamesService.fetchGamesList.fulfilled,
      (state, { payload }) => {
        state.games = payload;
        state.promise = "fulfilled";
      }
    );
    builder.addCase(gamesService.fetchGamesList.rejected, (state, action) => {
      state.promise = "error";
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { addGame, setGames } = gamesListSlice.actions;

export default gamesListSlice.reducer;
