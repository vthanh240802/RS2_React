import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";

interface Category {
  id: string;
  name: string;
}

const BASE_URL = "http://localhost:5000";

export const fetchCategories = createAsyncThunk("categories", async () => {
  const CategoryInfo = await fetchJson(BASE_URL + "/categories");
  return CategoryInfo;
});

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory: Category) => {
    const newId = (newCategory.id || Date.now()).toString();
    const response = await updateJson(
      BASE_URL + "/categories",
      { ...newCategory, id: newId },
      "POST"
    );
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    try {
      const response = await updateJson(
        `${BASE_URL}/categories/${category.id}`,
        category,
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: number) => {
    await deleteJson(BASE_URL + "/categories", categoryId.toString());
    return categoryId;
  }
);

interface CatetogyState {
  entities: Record<string, Category>;
  ids: string[];
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
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      const categories: Category[] = action.payload;
      state.ids = categories.map((category) => category.id);
      categories.forEach((category) => {
        state.entities[category.id] = category;
      });
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      const addCategory: Category = action.payload;
      const newId = addCategory.id.toString();
      state.entities[newId] = addCategory;
      state.ids.push(newId);
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updateCategory: Category = action.payload;
      state.entities[updateCategory.id.toString()] = updateCategory;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.error.message || "Failed to update product";
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const categoryId = action.payload.toString();
      delete state.entities[categoryId];
      state.ids = state.ids.filter((id) => id !== categoryId);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.error.message || "Failed to delete product";
    });
  },
});

export const categoryReducer = categorySlice.reducer;
