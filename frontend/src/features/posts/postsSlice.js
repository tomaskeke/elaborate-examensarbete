import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  event: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isUpdated: false,
  message: "",
};

export const getEventPosts = createAsyncThunk(
  "posts/eventPosts",
  async (eventData, thunkAPI) => {
    try {
      return await postsService.getEventPosts(eventData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPosts: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getEventPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
