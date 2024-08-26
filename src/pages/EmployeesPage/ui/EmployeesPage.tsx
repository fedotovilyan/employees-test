import { AddEmployee } from "@/features/AddEmployee";
import { Divider } from "@/shared/ui/Divider/Divider";
import { Employees } from "@/widgets/Employees";

export default function EmployeesPage() {
	return (
    <div>
      <AddEmployee />
      <Divider />
      <Employees />
    </div>
  );
};