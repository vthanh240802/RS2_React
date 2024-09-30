import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../action";
import { fetchJson } from "../api";

const BASE_URL = "http://localhost:5000";

export const login = createAsyncThunk(
  "login",
  async (userInfo: { email: string; password: string }) => {
    const authInfo = await fetchJson(BASE_URL + "/auth");
    return authInfo;
  }
);

const initialState = {
  isLoggedIn: false,
  loading: "idle",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LOGIN, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      console.log(action);

      const formUserInfo = action.meta.arg;
      const authInfo = action.payload;

      if (
        formUserInfo.email === authInfo.email &&
        formUserInfo.password === authInfo.password
      ) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = "Username or password is not correct";
    });
  },
});

export const authReducer = authSlice.reducer;
