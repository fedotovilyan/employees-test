import { useAppDispatch } from "@/app/store/store";
import { EmployeeForm, addEmployee } from "@/entities/Employee";
import { Flex, Notification } from "@/shared/ui";
import { useState } from "react";

export const AddEmployee = () => {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  return (
    <>
      <Flex justify="center" gap={10}>
        <EmployeeForm
          disabled={isFormDisabled}
          onSubmit={(formData) => {
            setIsFormDisabled(true);
            dispatch(addEmployee(formData))
              .unwrap()
              .then(() => setShowSuccess(true))
              .catch((e) => setError(e.message))
              .finally(() => setIsFormDisabled(false));
          }}
        />
      </Flex>
      <Notification
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="success"
        position="top-right"
        duration={2000}
      >
        Сотрудник успешно добавлен
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
