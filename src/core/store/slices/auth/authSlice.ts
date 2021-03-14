import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { authService, LoginDto } from "../../../api/authService";
import { AppDispatch, AppThunk } from "../../store";
import { Auth } from "./types";

const emptyToken: Auth = {
  login: undefined,
  token: undefined,
};

function getInitialAuthStateFromLocalStorate(): Auth {
  try {
    const token = localStorage.getItem("token");
    if (!token) return emptyToken;

    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded) return emptyToken;

    return {
      login: decoded.sub,
      token: token,
    };
  } catch (error) {
    return emptyToken;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthStateFromLocalStorate(),
  reducers: {
    set(state, action: PayloadAction<Auth>) {
      return action.payload;
    },
  },
});

export const { set } = authSlice.actions;

export const login = (loginDto: LoginDto): AppThunk => async (
  dispatch: AppDispatch
) => {
  authService.login(loginDto).then((user) => {
    dispatch(authSlice.actions.set(user));
    localStorage.setItem("token", user.token);
  });
};

export default authSlice.reducer;
