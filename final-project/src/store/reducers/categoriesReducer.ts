import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";

interface Category {
  id: number;
  name: string;
}

const BASE_URL = "http://localhost:5000";

export const category = createAsyncThunk("categories", async () => {
  const CategoryInfo = await fetchJson(BASE_URL + "/categories");
  return CategoryInfo;
});

interface CatetogyState {
  entities: Record<number, Category>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CatetogyState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(category.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(category.fulfilled, (state, action) => {
      state.status = "succeeded";
      const categories: Category[] = action.payload;
      state.ids = categories.map((category) => category.id);
      categories.forEach((category) => {
        state.entities[category.id] = category;
      });
    });
    builder.addCase(category.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const categoryReducer = categorySlice.reducer;
