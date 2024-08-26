import { UpdateEmployee } from "@/features/UpdateEmployee";
import { Flex } from "@/shared/ui";
import { ErrorText } from "@/shared/ui/ErrorText/ErrorText";
import { useParams } from "react-router-dom";

export const EmployeePage = () => {
	const employeeId = useParams().employee_id;

	if (!employeeId) return (
		<Flex style={{ padding: 30}} justify="center" align="center">
			<ErrorText>Сотрудник не найден</ErrorText>
		</Flex>
	)

	return <UpdateEmployee employeeId={employeeId} />;
};