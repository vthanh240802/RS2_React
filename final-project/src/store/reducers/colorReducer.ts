import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";

interface Color {
  id: string;
  name: string;
}

const BASE_URL = "http://localhost:5000";

export const fetchColor = createAsyncThunk("colors", async () => {
  const ColorgoryInfo = await fetchJson(BASE_URL + "/colors");
  return ColorgoryInfo;
});

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (newColor: Color) => {
    const newId = (newColor.id || Date.now()).toString();
    const response = await updateJson(
      BASE_URL + "/colors",
      { ...newColor, id: newId },
      "POST"
    );
    return response;
  }
);

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (color: Color) => {
    try {
      const response = await updateJson(
        `${BASE_URL}/colors/${color.id}`,
        color,
        "PUT"
      );
      console.log("Update response:", response);
      return response;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }
);

export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (colorId: number) => {
    await deleteJson(BASE_URL + "/colors", colorId.toString());
    return colorId;
  }
);

interface ColorState {
  entities: Record<string, Color>;
  ids: string[];
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
    builder.addCase(fetchColor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchColor.fulfilled, (state, action) => {
      state.status = "succeeded";
      const colors: Color[] = action.payload;
      state.ids = colors.map((color) => color.id);
      colors.forEach((color) => {
        state.entities[color.id] = color;
      });
    });
    builder.addCase(fetchColor.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(addColor.fulfilled, (state, action) => {
      const addColor: Color = action.payload;
      const newId = addColor.id.toString();
      state.entities[newId] = addColor;
      state.ids.push(newId);
    });
    builder.addCase(updateColor.fulfilled, (state, action) => {
      const updateColor: Color = action.payload;
      state.entities[updateColor.id.toString()] = updateColor;
    });
    builder.addCase(updateColor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.error.message || "Failed to update product";
    });
    builder.addCase(deleteColor.fulfilled, (state, action) => {
      const colorId = action.payload.toString();
      delete state.entities[colorId];
      state.ids = state.ids.filter((id) => id !== colorId);
    });
    builder.addCase(deleteColor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.error.message || "Failed to delete product";
    });
  },
});

export const colorReducer = colorSlice.reducer;
