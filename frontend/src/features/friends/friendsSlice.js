import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendsService from "./friendsService";

const initialState = {
  friends: [],
  pending: [],
  initPending: [],
  addedPending: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isUpdated: false,
  message: "",
};

export const getFriendsList = createAsyncThunk(
  "friends/getFriendsList",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.getFriendsList(token);
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
export const sendFriendRequest = createAsyncThunk(
  "friends/sendRequest",
  async (recipientId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.sendFriendRequest(recipientId, token);
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

export const getFriendRequests = createAsyncThunk(
  "friends/getRequests",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.getFriendRequests(token);
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
export const getInitializedRequests = createAsyncThunk(
  "friends/getInitializedRequests",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.getInitializedRequests(token);
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

export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptRequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.acceptFriendRequest(id, token);
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
export const declineFriendRequest = createAsyncThunk(
  "friends/declineRequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.declineFriendRequest(id, token);
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
export const cancelPendingRequest = createAsyncThunk(
  "friends/cancelRequest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.cancelPendingRequest(id, token);
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
export const removeFriend = createAsyncThunk(
  "friends/removeFriend",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendsService.removeFriend(id, token);
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


export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    resetFriends: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(getFriendsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendFriendRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.initPending.push(action.payload);
        state.addedPending = true;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.addedPending = false;
        state.message = action.payload;
      })
      .addCase(getFriendRequests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFriendRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pending = action.payload;
      })
      .addCase(getFriendRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInitializedRequests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInitializedRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.initPending = action.payload;
        state.addedPending = false;
      })
      .addCase(getInitializedRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(acceptFriendRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pending = state.pending.filter(
          (obj) => obj._id !== action.payload._id
        );
        state.friends.push(action.payload)
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(declineFriendRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(declineFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pending = state.pending.filter(
          (obj) => obj._id !== action.payload.id
        );
      })
      .addCase(declineFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(cancelPendingRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(cancelPendingRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.initPending = state.initPending.filter(
          (obj) => obj._id !== action.payload.id
        );
      })
      .addCase(cancelPendingRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFriend.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.friends = state.friends.filter(
          (obj) => obj._id !== action.payload.id
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
