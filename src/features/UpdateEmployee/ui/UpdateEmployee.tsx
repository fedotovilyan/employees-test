import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  EmployeeForm,
  selectEmployee,
  updateEmployee,
} from "@/entities/Employee";
import { Flex, Notification } from "@/shared/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UpdateEmployeeProps {
  employeeId: string | number;
}

export const UpdateEmployee = ({ employeeId }: UpdateEmployeeProps) => {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const employee = useAppSelector((state) => selectEmployee(state, employeeId));
  const navigate = useNavigate();

  return (
    <>
      <Flex justify="center" gap={10}>
        <EmployeeForm
          disabled={isFormDisabled}
          defaultValues={employee || undefined}
          submitButtonText="Обновить сотрудника"
          onSubmit={(formData) => {
            setIsFormDisabled(true);
            dispatch(updateEmployee({ id: employeeId, ...formData }))
              .unwrap()
              .then(() => setShowSuccess(true))
              .catch((e) => setError(e.message))
              .finally(() => setIsFormDisabled(false));
          }}
        />
      </Flex>
      <Notification
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate(-1);
        }}
        type="success"
        position="top-right"
        duration={2000}
      >
        Сотрудник успешно обновлен
      </Notification>
      <Notification
        isOpen={!!error}
        onClose={() => setError(null)}
        type="error"
        position="top-right"
        duration={2000}
      >
        {`Что-то пошло не так при попытке добавить сотрудника:\n${error}`}
      </Notification>
    </>
  );
};
