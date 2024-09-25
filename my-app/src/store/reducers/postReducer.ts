import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fectData";
import { PostModel, PostsDataObject, PostsState } from "../../types/Post";
import { UserModel } from "../../types/user";
import { EDIT_POST } from "../action";

export const fetchListPosts = createAsyncThunk(
  "posts/fetchListPosts",
  async () => {
    try {
      const postsResponse = await fetchData("posts");
      return {
        posts: postsResponse,
        error: null,
      };
    } catch (error) {
      return { error };
    }
  }
);

const initialState: PostsState = {
  ids: [],
  data: {},
  loading: "idle", // 'idle | 'loading' | 'succeed' | 'failed'
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListPosts.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(fetchListPosts.fulfilled, (state, action) => {
      const posts = action.payload?.posts || [];
      if (!posts.length) return;
      const postObj: PostsDataObject = {};
      const ids = posts.reduce(
        (allIds: Array<PostModel["id"]>, post: PostModel) => {
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
    builder.addCase(fetchListPosts.rejected, (state, action) => {
      state.loading = "failed";
    });
    // builder.addCase(EDIT_POST, (state, action: {
    //   type: string,
    //   changingInput: {
    //     body:
    //   }
    //   postId: number,
    // }) => {

    //   console.log("action", action);
    //   if (action.changingInput.body) {
    //     state.data[action.postId] = {
    //       ...state.data[action.postId],
    //       body: state.data[action.postId]["body"],
    //     };
    //   }
    // });
  },
});

export const postsReducer = postsSlice.reducer;
