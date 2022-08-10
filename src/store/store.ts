import { combineReducers, configureStore } from "@reduxjs/toolkit";

import employeeReducer from "../store/employee/reducer";

const rootReducer = combineReducers({
  employeeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
