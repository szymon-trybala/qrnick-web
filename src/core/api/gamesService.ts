import { createAsyncThunk } from "@reduxjs/toolkit";
import { GamesListRefreshError } from "../store/slices/gamesList/types";
import { AppDispatch } from "../store/store";

export interface GameMetadataDto {
  name: string;
  version: string;
  uploadedAt: Date;
  gameId: string;
  description: string;
}

const fetchGamesList = createAsyncThunk<
  GameMetadataDto[],
  undefined,
  {
    dispatch: AppDispatch;
    rejectValue: GamesListRefreshError;
  }
>("game/list", async (_, thunkApi) => {
  const response = await fetch("http://localhost:5000/game/List", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue({ errorMessage: "Błąd serwera" });
  }

  const chats = (await response.json()) as GameMetadataDto[];
  return chats;
});

export const gamesService = {
  fetchGamesList,
};
