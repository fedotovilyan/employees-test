import { Flex, Input, Select } from "@/shared/ui";
import { rolesOptions } from "../../constants";
import { useId } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  IEmployeesFilters,
  selectEmployeesSort,
  updateEmployeesFilters,
  updateEmployeesSort,
} from "../../model/employeesSlice";
import { SortOrder } from "@/shared/types";

export const EmployeesFilters = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const { birthday, name } = useAppSelector(selectEmployeesSort);

  return (
    <Flex gap={10} wrap="wrap" align="center">
      <Select
        options={rolesOptions}
        placeholder="Должность"
        onSelectChange={({ value }) =>
          dispatch(
            updateEmployeesFilters({
              role: value as IEmployeesFilters["role"],
            })
          )
        }
      />
      <Flex gap={5} align="center">
        <Input
          style={{ maxWidth: 30 }}
          id={`${id}-isArchive`}
          type="checkbox"
          onChange={(e) =>
            dispatch(
              updateEmployeesFilters({
                isArchive: e.target.checked === true ? true : undefined,
              })
            )
          }
        />
        <label style={{ minWidth: 60 }} htmlFor={`${id}-isArchive`}>
          в архиве
        </label>
      </Flex>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-birthday`}>Сортировка по дате рождения:</label>
        <Select
          placeholder="Дата рождения"
          id={`${id}-birthday`}
          defaultValue={birthday}
          options={[
            {
              label: "По убыванию",
              key: "birthday-desc",
              value: SortOrder.Desc,
            },
            {
              label: "По возрастанию",
              key: "birthday-asc",
              value: SortOrder.Asc,
            },
          ]}
          onSelectChange={({ value }) =>
            dispatch(
              updateEmployeesSort({
                birthday: value as SortOrder,
                name: undefined,
              })
            )
          }
        />
      </Flex>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-name`}>Сортировка по имени:</label>
        <Select
          placeholder="Имя"
          id={`${id}-name`}
          defaultValue={name}
          options={[
            {
              label: "По убыванию",
              key: "name-desc",
              value: SortOrder.Desc,
            },
            {
              label: "По возрастанию",
              key: "name-asc",
              value: SortOrder.Asc,
            },
          ]}
          onSelectChange={({ value }) =>
            dispatch(
              updateEmployeesSort({
                name: value as SortOrder,
                birthday: undefined,
              })
            )
          }
        />
      </Flex>
    </Flex>
  );
};
