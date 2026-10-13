import {
  createSlice,
} from "@reduxjs/toolkit";

import { fetchComments, fetchPosts, fetchPostById, createPost, updatePost, patchPost, deletePost } from "./postsApi";

const initialState = {
  posts: [],
  selectedPost: null,
  comments: [],

  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },

    clearComments: (state) => {
      state.comments = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================
      // GET POSTS
      // =====================

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // GET POST BY ID
      // =====================

      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })

      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // GET COMMENTS
      // =====================

      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // POST
      // =====================

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      // =====================
      // PUT
      // =====================

      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }

        state.selectedPost = action.payload;
      })

      // =====================
      // PATCH
      // =====================

      .addCase(patchPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }

        state.selectedPost = action.payload;
      })

      // =====================
      // DELETE
      // =====================

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload
        );
      });
  },
});

export const {
  clearSelectedPost,
  clearComments,
} = postsSlice.actions;

export default postsSlice.reducer;