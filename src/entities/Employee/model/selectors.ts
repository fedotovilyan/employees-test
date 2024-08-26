import { createSelector } from "@reduxjs/toolkit";
import {
  selectEmployeesEntities,
  selectEmployeesFilters,
  selectEmployeesIds,
  selectEmployeesSort,
} from "./employeesSlice";
import { SortOrder } from "@/shared/types";
import dayjs from "dayjs";
import { Employee } from "@/shared/types/Employee";

export const selectEmployee = createSelector(
  [
    selectEmployeesEntities,
    (state, employeeId: Employee["id"]) => employeeId
  ],
  (entities, employeeId) => (employeeId ? entities[employeeId] : null)
);

export const selectFilteredEmployees = createSelector(
  selectEmployeesEntities,
  selectEmployeesIds,
  selectEmployeesFilters,
  (entities, ids, filters) => {
    let employees = ids.map((id) => entities[id]);

    if (filters.isArchive !== undefined) {
      employees = employees.filter(
        (employee) => employee.isArchive === filters.isArchive
      );
    }
    if (filters.role) {
      employees = employees.filter(
        (employee) => employee.role === filters.role
      );
    }

    return employees;
  }
);

export const selectFilteredAndSortedEmployees = createSelector(
  selectFilteredEmployees,
  selectEmployeesSort,
  (employees, sort) => {
    let employeesCopy = Array.from(employees);

    if (sort.birthday) {
      employeesCopy = employeesCopy.toSorted((a, b) => {
        const aBirthday = dayjs(a.birthday);
        const bBirthday = dayjs(b.birthday);

        if (sort.birthday === SortOrder.Asc) {
          return aBirthday.isAfter(bBirthday) ? 1 : -1;
        } else {
          return bBirthday.isAfter(aBirthday) ? 1 : -1;
        }
      });
    }

    if (sort.name) {
      employeesCopy = employeesCopy.toSorted((a, b) => {
        return sort.name === SortOrder.Asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    }

    return employeesCopy;
  }
);
