import { useAppSelector } from "@/app/store/store";
import { selectEmployee } from "@/entities/Employee";
import { UpdateEmployee } from "@/features/UpdateEmployee";
import { ROUTES } from "@/shared/routes";
import { Alert, AlertType, Breadcrumbs, BreadcrumbsItem, Flex } from "@/shared/ui";
import { ErrorText } from "@/shared/ui/ErrorText/ErrorText";
import { getRoute } from "@/shared/utils/getRoute";
import { useParams } from "react-router-dom";

export const EmployeePage = () => {
  const employeeId = useParams().employee_id;
  const employee = useAppSelector((state) =>
    selectEmployee(state, employeeId || "")
  );

  const breadcrumbItems: BreadcrumbsItem[] = [
    { key: "home", label: "Главная", href: ROUTES.home },
    {
      key: "employees",
      label: "Сотрудники",
      href: ROUTES.employees,
    },
    {
      key: "employee",
      label: employee?.name || "Неизвестный сотрудник",
      href: getRoute(ROUTES.employee, { employee_id: employee?.id }),
      active: true,
    },
  ];

  if (!employeeId || !employee)
    return (
      <Flex style={{ padding: 30 }} justify="center" align="center">
        <Alert type={AlertType.Error}>Сотрудник не найден</Alert>
      </Flex>
    );

  return (
    <Flex direction="column" gap={15}>
      <Breadcrumbs items={breadcrumbItems} />
      <UpdateEmployee employeeId={employeeId} />
    </Flex>
  );
};
