import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
