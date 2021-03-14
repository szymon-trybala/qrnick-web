import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { Auth } from "./types";

const emptyState: Auth = {
  login: undefined,
  token: undefined,
};

function getInitialAuthStateFromLocalStorate(): Auth {
  try {
    const token = localStorage.getItem("token");
    if (!token) return emptyState;

    const decoded = jwtDecode<any>(token);
    if (!decoded) return emptyState;

    return {
      login: decoded.unique_name,
      token: token,
    };
  } catch (error) {
    return emptyState;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthStateFromLocalStorate(),
  reducers: {
    login(state, action: PayloadAction<Auth>) {
      return action.payload;
    },
    logout: (state) => emptyState,
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
