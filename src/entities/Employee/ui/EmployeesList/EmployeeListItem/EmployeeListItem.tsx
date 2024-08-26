import { roleLabels } from "@/entities/Employee/constants";
import { Employee } from "@/shared/types/Employee";
import { Flex } from "@/shared/ui";
import cls from "./EmployeeListItem.module.scss";
import { useNavigate } from "react-router-dom";
import { getRoute } from "@/shared/utils/getRoute";
import { ROUTES } from "@/shared/routes";

interface EmployeeListItemProps {
  employee: Employee;
}

export const EmployeeListItem = ({ employee }: EmployeeListItemProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-between"
      wrap="wrap"
      className={cls.employee_list_item_container}
      onClick={() =>
        navigate(getRoute(ROUTES.employee, { employee_id: employee.id }))
      }
			gap={5}
    >
      <Flex direction="column" gap={5}>
        <h3 className={cls.employee_name}>{employee.name}</h3>
        <p className={cls.employee_role}>{roleLabels[employee.role]}</p>
      </Flex>
      <p>{employee.phone}</p>
    </Flex>
  );
};
