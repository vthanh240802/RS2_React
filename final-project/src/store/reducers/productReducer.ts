import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";

interface Product {
  id: number;
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

const BASE_URL = "http://localhost:5000";

export const product = createAsyncThunk("products", async () => {
  const productInfo = await fetchJson(BASE_URL + "/products");
  return productInfo;
});

interface ProductState {
  entities: Record<number, Product>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(product.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(product.fulfilled, (state, action) => {
      state.status = "succeeded";
      const products: Product[] = action.payload;
      state.ids = products.map((product) => product.id);
      products.forEach((product) => {
        state.entities[product.id] = product;
      });
    });
    builder.addCase(product.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const productReducer = productSlice.reducer;
