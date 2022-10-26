import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService"

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


export const addTodo = createAsyncThunk(
    "todo/add",
    async (todoDetails, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
            return await todoService.addTodo(todoDetails, token)
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
export const getTodos = createAsyncThunk(
    "todo/get",
    async (todoDetails, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
            return await todoService.getTodos(token)
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


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        resetTodos: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(addTodo.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.todos = action.payload;
        })
        .addCase(addTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getTodos.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.todos = action.payload;
        })
        .addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        
    }

})

export const { resetTodos } = todoSlice.actions;
export default todoSlice.reducer;