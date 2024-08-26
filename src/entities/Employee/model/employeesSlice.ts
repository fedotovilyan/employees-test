import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeRole } from "@/shared/types/Employee";
import { fetchEmployees, addEmployee, updateEmployee } from "./asyncThunks";
import { SortOrder } from '@/shared/types';

export interface IEmployeesFilters {
  isArchive?: boolean;
  role?: EmployeeRole;
}

export interface EmployeesSort {
  name?: SortOrder;
  birthday?: SortOrder;
}

export interface EmployeesState {
  status: 'idle' | 'pending' | 'success' | 'error';
  entities: Record<Employee["id"], Employee>;
  ids: Employee["id"][];
  filters: IEmployeesFilters;
  sort: EmployeesSort;
}

const initialState: EmployeesState = {
  entities: {},
  ids: [],
  status: 'idle',
  filters: {},
  sort: {},
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    updateEmployeesFilters: (
      state,
      { payload }: PayloadAction<Partial<IEmployeesFilters>>
    ) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },
    updateEmployeesSort: (
      state,
      { payload }: PayloadAction<Partial<EmployeesSort>>
    ) => {
      state.sort = {
        ...state.sort,
        ...payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'success';

        state.entities = {};
        state.ids = [];
        for (const employee of action.payload) {
          const id = employee.id;
          state.entities[id] = employee;
          state.ids.push(id);
        }
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = 'error';
      });

    builder
      .addCase(addEmployee.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = "success";
        state.entities[payload.id] = payload;
        state.ids.push(payload.id);
      })
      .addCase(addEmployee.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(updateEmployee.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateEmployee.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.entities[payload.id] = payload;
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.status = "error";
      });
  },
  selectors: {
    selectEmployeesEntities: (state) => state.entities,
    selectEmployeesIds: (state) => state.ids,
    selectEmployeesFilters: (state) => state.filters,
    selectEmployeesSort: (state) => state.sort,
    selectEmployeesStatus: (state) => state.status,
    selectEmployees: (state) => state,
  },
});

export const {
  selectEmployees,
  selectEmployeesEntities,
  selectEmployeesIds,
  selectEmployeesFilters,
  selectEmployeesStatus,
  selectEmployeesSort,
} = employeesSlice.selectors;

export const { updateEmployeesFilters, updateEmployeesSort } = employeesSlice.actions;