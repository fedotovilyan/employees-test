import { Employee, EmployeeRole } from "@/shared/types/Employee";
import { Button, Flex, Input, Select } from "@/shared/ui";
import { phoneMaskInputHandler } from "@/shared/utils/phoneMaskInputHandler";
import { useEffect, useId, useMemo } from "react";
import cls from "./EmployeeForm.module.scss";
import { birthdayMaskInputHandler } from "@/shared/utils/birthdayMaskInputHandler";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { ErrorText } from "@/shared/ui/ErrorText/ErrorText";
import { rolesOptions } from "../../constants";

export type EmployeeFormData = Omit<Employee, "id">;

interface EmployeeFormProps {
  onSubmit: (formData: EmployeeFormData) => void;
  defaultValues?: Partial<EmployeeFormData>;
  disabled?: boolean;
  submitButtonText?: string;
}

export const EmployeeForm = ({
  onSubmit,
  defaultValues,
  disabled,
  submitButtonText = "Добавить сотрудника",
}: EmployeeFormProps) => {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormData>();
  const role = useMemo(() => [defaultValues?.role], [defaultValues?.role]);

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, val]) => {
        setValue(key as keyof EmployeeFormData, val, { shouldValidate: true });
      });
    }
  }, [defaultValues, setValue]);

  return (
    <form className={cls.employee_form} onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-name`}>Имя:</label>
        <Input
          {...register("name", {
            required: "Введите имя!",
            maxLength: {
              value: 255,
              message: "Не больше 255 символов",
            },
          })}
          aria-invalid={errors.name ? "true" : "false"}
          className={classNames({
            [cls.err_input]: !!errors.name,
          })}
          id={`${id}-name`}
          placeholder="Введите имя"
        />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </Flex>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-phone`}>Телефон:</label>
        <Input
          {...register("phone", {
            required: "Введите телефон!",
            onChange: phoneMaskInputHandler,
          })}
          id={`${id}-phone`}
          placeholder="+0(000)000-00-00"
          aria-invalid={errors.phone ? "true" : "false"}
          className={classNames({
            [cls.err_input]: !!errors.phone,
          })}
        />
        {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
      </Flex>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-birthday`}>День рождения:</label>
        <Input
          {...register("birthday", {
            required: "Введите день рождения!",
            onChange: birthdayMaskInputHandler,
          })}
          id={`${id}-birthday`}
          placeholder="DD.MM.YYYY"
          className={classNames({
            [cls.err_input]: !!errors.birthday,
          })}
        />
        {errors.birthday && <ErrorText>{errors.birthday.message}</ErrorText>}
      </Flex>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-role`}>Должность:</label>
        <Select
          {...register("role", {
            required: "Выберите должность!",
          })}
          placeholder="Выберите должность"
          id={`${id}-role`}
          options={rolesOptions}
          className={classNames({
            [cls.err_input]: !!errors.role,
          })}
          defaultValues={role}
          onSelect={({ value }) => setValue("role", value as EmployeeRole)}
        />
        {errors.role && <ErrorText>{errors.role.message}</ErrorText>}
      </Flex>
      <Flex direction="column" gap={5}>
        <p>Статус:</p>
        <Flex>
          <Input
            style={{ maxWidth: 30 }}
            {...register("isArchive", {})}
            id={`${id}-isArchive`}
            type="checkbox"
          />
          <label htmlFor={`${id}-isArchive`}>в архиве</label>
        </Flex>
      </Flex>
      <Button disabled={disabled} type="submit">
        {submitButtonText}
      </Button>
    </form>
  );
};
