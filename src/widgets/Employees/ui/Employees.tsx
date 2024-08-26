import { useAppSelector } from "@/app/store/store";
import {
  EmployeesFilters,
  EmployeesList,
  selectEmployeesStatus,
  selectFilteredAndSortedEmployees,
} from "@/entities/Employee";
import { Flex, Loader } from "@/shared/ui";

export const Employees = () => {
  const employees = useAppSelector(selectFilteredAndSortedEmployees);
  const status = useAppSelector(selectEmployeesStatus);

  return (
    <Flex direction="column" gap={20}>
      <EmployeesFilters />
      {status === 'pending' && (
        <Loader spinning />
      )}
			<EmployeesList employees={employees}/>
    </Flex>
  );
};
