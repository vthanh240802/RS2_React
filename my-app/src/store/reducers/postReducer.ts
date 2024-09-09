import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fectData";
import { PostModel, PostsState } from "../../types/Post";

export const fectchListPosts = createAsyncThunk(
  "posts/fecthListPosts",
  async () => {
    try {
      const postsResponse = await fetchData("posts");
      const usersResponse = await fetchData("users");
      console.log("data user", usersResponse);

      const postsWithAuthors = postsResponse.map((post: PostModel) => {
        const author = usersResponse.find(
          (user: { id: number }) => user.id === post.userId
        );
        return { ...post, name: author?.name || "Unknown" };
      });

      return postsWithAuthors;
    } catch (error) {
      return error;
    }
  }
);

const initialState: PostsState = {
  list: [],
  loading: "idle", // 'idle', 'loading', 'succeed', 'failed'
  error: "",
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fectchListPosts.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(fectchListPosts.fulfilled, (state, action) => {
      console.log("state @@", state);
      console.log("action @@", action);
      state.list = action.payload || [];
      state.loading = "succeed";
    });
    builder.addCase(fectchListPosts.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export const postsReducer = postsSlice.reducer;
