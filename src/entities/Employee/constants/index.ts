import { EmployeeRole } from "@/shared/types/Employee";
import { SelectOption } from "@/shared/ui";

export const rolesOptions = [
  {
    key: "cook",
    label: "Повар",
    value: EmployeeRole.cook,
  },
  {
    key: "driver",
    label: "Водитель",
    value: EmployeeRole.driver,
  },
  {
    key: "waiter",
    label: "Официант",
    value: EmployeeRole.waiter,
  },
] satisfies SelectOption[];

export const roleLabels = rolesOptions.reduce((acc, option) => {
	acc[option.value] = option.label;
	return acc;
}, {} as Record<EmployeeRole, string>)
