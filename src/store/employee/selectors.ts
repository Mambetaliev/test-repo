import { IEmployee, IEmployeeState, IReducer } from "./types";

const selectState = (state?: IReducer): IEmployeeState | undefined =>
    state?.employeeReducer;

export const getEmployeeData = (state?: IReducer): IEmployee[] =>
    selectState(state)?.employeeList || [];

export const getEditingEmployeeObject = (state?: IReducer): IEmployee | null =>
    selectState(state)?.updatingObject || null;
