import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./searchService";

const initialState = {
    searchResponse: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


export const searchForFriends = createAsyncThunk(
    "search/friends",
    async (query, thunkAPI) => {
        try {
            return await searchService.searchForFriends(query)
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
)

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetSearch: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchForFriends.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(searchForFriends.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.searchResponse = action.payload
        })
        .addCase(searchForFriends.rejected, (state, action) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = true,
            state.message = action.payload
        })
    }
})

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;