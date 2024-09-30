import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./features/budgetSlice";
export const store = configureStore({
  reducer: budgetReducer,
});

export type AppDispatch = typeof store.dispatch;
