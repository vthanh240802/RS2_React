/** @format */

import {
  createAsyncThunk,
  createSlice,
  CaseReducer,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import {
  ProductState,
  ProductModel,
  ProductDataObject,
} from "../../types/products";
import { Action } from "redux";
import { fetchData } from "../../util/fetchData";
// import { TypedActionCreator } from 'react-redux'

export const fetchListProducts = createAsyncThunk(
  "products/fetchListProducts",
  async () => {
    try {
      const productsResponse = await fetchData("products");
      return {
        products: productsResponse,
        error: null,
      };
    } catch (error) {
      return { error };
    }
  }
);

type ActionType = Action<string> & {
  productId: ProductModel["id"];
  changingInput: {
    body: string;
    name: string;
  };
};

const initialState: ProductState = {
  ids: [],
  data: {},
  loading: "idle", // 'idle | 'loading' | 'succeed' | 'failed'
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListProducts.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchListProducts.fulfilled, (state, action) => {
        const products = action.payload?.products || [];
        if (!products.length) return;
        const postObj: ProductDataObject = {};
        const ids = products.reduce(
          (allIds: Array<ProductModel["id"]>, post: ProductModel) => {
            if (!state.data[post.id]) {
              allIds.push(post.id);
            }
            postObj[post.id] = post;
            return allIds;
          },
          []
        );
        state.data = { ...state.data, ...postObj };
        state.ids = [...state.ids, ...ids];
        state.error = action.payload?.error as string;
        state.loading = "succeed";
      });
  },
});

export const productsReducer = productsSlice.reducer;
