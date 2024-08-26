import { employeesSlice } from "@/entities/Employee";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
  useStore,
} from "react-redux";

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
