export interface Employee {
  id: number | string;
  name: string;
  isArchive: boolean;
  role: EmployeeRole;
  phone: string;
  birthday: string;
};

export enum EmployeeRole {
  driver = "driver",
  waiter = "waiter",
  cook = "cook",
}