import { Employee } from "@/shared/types/Employee";
import { Flex } from "@/shared/ui";
import { EmployeeListItem } from "./EmployeeListItem/EmployeeListItem";

interface EmployeesListProps {
	employees: Employee[];
}

export const EmployeesList = ({ employees }: EmployeesListProps) => {
	return (
    <Flex direction="column" justify="center" align="center" gap={10}>
      {employees.map((employee) => (
        <EmployeeListItem employee={employee} key={employee.id}/>
      ))}
    </Flex>
  );
};