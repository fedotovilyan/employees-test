import { AddEmployee } from "@/features/AddEmployee";
import { ROUTES } from "@/shared/routes";
import { Breadcrumbs, BreadcrumbsItem } from "@/shared/ui";
import { Divider } from "@/shared/ui/Divider/Divider";
import { Employees } from "@/widgets/Employees";

const breadcrumbItems: BreadcrumbsItem[] = [
  {key: 'home', label: "Главная", href: ROUTES.home},
  {key: 'employees', label: "Сотрудники", href: ROUTES.employees, active: true},
];

export default function EmployeesPage() {
	return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <AddEmployee />
      <Divider />
      <Employees />
    </div>
  );
};