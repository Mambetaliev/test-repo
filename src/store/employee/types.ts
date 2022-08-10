export interface IEmployee {
    id: number;
    name: string;
    post: string;
    birthday: string;
    gender: string;
    fired: boolean;
}

export interface IEmployeeState {
    employeeList: IEmployee[];
    updatingObject: IEmployee | null;
    isLoading: boolean;
    error: string;
}

export interface IReducer {
    employeeReducer: IEmployeeState
}