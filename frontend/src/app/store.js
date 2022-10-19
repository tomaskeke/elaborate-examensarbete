import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";
import postReducer from "../features/posts/postsSlice";
import friendReducer from "../features/friends/friendsSlice"
import searchReducer from "../features/search/searchSlice"
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  posts: postReducer,
  friends: friendReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
