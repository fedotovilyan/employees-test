import { EmployeesApi } from "@/shared/api/Employees/employees.api";
import { Employee } from "@/shared/types/Employee";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmployeeFormData } from "../ui/EmployeeForm/EmployeeForm";

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  return await EmployeesApi.getEmployees();
});

export const addEmployee = createAsyncThunk<Employee, EmployeeFormData>(
  "employees/add",
  async (employee) => {
    return await EmployeesApi.addEmployee(employee);
  }
);

export const updateEmployee = createAsyncThunk<
  Employee,
  Employee,
  { rejectValue: string }
>("employees/update", async (employee) => {
  return await EmployeesApi.updateEmployee(employee.id, employee);
});
