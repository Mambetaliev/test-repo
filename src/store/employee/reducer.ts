import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IEmployee, IEmployeeState } from "./types";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";

const employeeSlice = createSlice<IEmployeeState, SliceCaseReducers<IEmployeeState>>({
    name: "user",
    initialState: {
        employeeList: [],
        isLoading: false,
        error: "",
        updatingObject: null,
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employeeList.push({ ...action.payload, id: Date.now() });
        },
        deleteEmployee: (state, action) => {
            state.employeeList = state.employeeList.filter(it => it.id !== action.payload)
        },
        editEmployee: (state, action) => {
            const { id, data } = action.payload;
            state.employeeList = state.employeeList.map(it => {
                if (it.id !== id) {
                    return it;
                }
                return {
                    ...it,
                    ...data,
                }
            })
        },
        setEditingEmployee: (state, action: PayloadAction<IEmployee | null>) => {
            state.updatingObject = action.payload;
        }
    },
});

export const {
    addEmployee,
    deleteEmployee,
    editEmployee,
    setEditingEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
