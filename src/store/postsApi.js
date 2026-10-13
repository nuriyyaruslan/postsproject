import api from "../api/axios";
import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

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