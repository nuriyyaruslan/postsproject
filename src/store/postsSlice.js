import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../api/axios";

// GET /posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts");

      return response.data;
    } catch (error) {
      return rejectWithValue("Posts yüklənmədi");
    }
  }
);

// GET /posts/1
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue("Post tapılmadı");
    }
  }
);

// GET /posts/1/comments
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/posts/${postId}/comments`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Comments yüklənmədi");
    }
  }
);

// POST /posts
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts", post);

      return response.data;
    } catch (error) {
      return rejectWithValue("Post yaradılmadı");
    }
  }
);

// PUT /posts/1
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/posts/${id}`,
        post
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Post update olunmadı");
    }
  }
);

// PATCH /posts/1
export const patchPost = createAsyncThunk(
  "posts/patchPost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/posts/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Post patch olunmadı");
    }
  }
);

// DELETE /posts/1
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue("Post silinmədi");
    }
  }
);

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