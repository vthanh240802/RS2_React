import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";

interface Color {
  id: number;
  name: string;
}

const BASE_URL = "http://localhost:5000";

export const color = createAsyncThunk("colors", async () => {
  const ColorgoryInfo = await fetchJson(BASE_URL + "/colors");
  return ColorgoryInfo;
});

interface ColorState {
  entities: Record<number, Color>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ColorState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(color.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(color.fulfilled, (state, action) => {
      state.status = "succeeded";
      const colors: Color[] = action.payload;
      state.ids = colors.map((color) => color.id);
      colors.forEach((color) => {
        state.entities[color.id] = color;
      });
    });
    builder.addCase(color.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const colorReducer = colorSlice.reducer;
