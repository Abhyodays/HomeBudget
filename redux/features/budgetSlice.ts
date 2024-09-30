import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Budget } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  budgets: [] as Budget[],
};

export const fetchBudgetsFromStorage = createAsyncThunk(
  "budgets/fetchBudgetsFromStorage",
  async () => {
    const budgetString = await AsyncStorage.getItem("budgets");
    return budgetString ? JSON.parse(budgetString) : ([] as Budget[]);
  }
);
export const storeBudgetsInStorage = createAsyncThunk(
  "budget/storeBudgetInStorage",
  async (_, { getState }) => {
    try {
      const state = getState() as { budgets: Budget[] };
      const budgets = state.budgets;
      await AsyncStorage.setItem("budgets", JSON.stringify(budgets));
      return budgets;
    } catch (error) {
      throw new Error("Failed in storing budgets in Storage.");
    }
  }
);
export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      const newBudget: Budget = {
        name: action.payload.name,
        plannedAmount: action.payload.plannedAmount,
        actualAmount: action.payload.actualAmount,
      };
      state.budgets.push(newBudget);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetsFromStorage.fulfilled, (state, { payload }) => {
        state.budgets = payload;
      })
      .addCase(storeBudgetsInStorage.fulfilled, (state, { payload }) => {
        state.budgets = payload;
      });
  },
});

export const { addBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
