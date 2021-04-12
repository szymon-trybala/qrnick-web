import { GameMetadataDto } from "../../../api/gamesService";

export interface GamesListState {
  games: GameMetadataDto[];
  promise: "initial" | "pending" | "error" | "fulfilled";
  error: string | undefined;
}

export interface GamesListRefreshError {
  errorMessage: string;
}
