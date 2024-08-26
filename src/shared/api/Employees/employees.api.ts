import { Employee } from "@/shared/types/Employee";
import { apiInstance } from "../apiInstance";
import { EmployeeFormData } from "@/entities/Employee";

export class EmployeesApi {
  static async getEmployees() {
    const res = await apiInstance.get<Employee[]>("/employees");

    return res.data;
  }

  static async getEmployee(employeeId: Employee["id"]) {
    const res = await apiInstance.get<Employee[]>(`/employees/${employeeId}`);

    return res.data;
  }

  static async addEmployee(employee: EmployeeFormData) {
    const res = await apiInstance.post<Employee>("/employees", employee);

    return res.data;
  }

  static async updateEmployee(employeeId: Employee["id"], employee: Employee) {
    const res = await apiInstance.put<Employee>(
      `/employees/${employeeId}`,
      employee
    );

    return res.data;
  }
}
