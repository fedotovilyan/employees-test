import classNames from "classnames";
import {
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";
import cls from "./Select.module.scss";
import { DropDown, DropdownItem } from "../DropDown/DropDown";
import { Input, InputProps } from "../Input/Input";

export interface SelectOption {
  label: ReactNode | string;
  key: string | number;
  value: string | number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface SelectProps extends InputProps {
  defaultValue?: string | number;
  options: SelectOption[];
  onSelectChange?: (option: Partial<SelectOption>) => void;
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(function Select(
  props,
  ref
) {
  const { className, options, onSelectChange, defaultValue, ...rest } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SelectOption["value"]>("");

  const onSelect = (option: SelectOption) => {
    setShowOptions(false);

    if (selectedValue === option.label) {
      setSelectedValue("");
      onSelectChange?.({});
      return;
    }

    if (typeof option.label === "string") {
      setSelectedValue(option.label);
    }
    onSelectChange?.(option);
  };

  const items: DropdownItem[] = options.map((option) => ({
    item: (
      <div
        key={option.key}
        className={classNames(cls.select_item, {
          [cls.selected_item]: selectedValue === option.label,
        })}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(option);
          option.onClick?.(e);
        }}
      >
        {option.label}
      </div>
    ),
    key: option.key,
  }));

  useEffect(() => {
    if (defaultValue) {
      const label = options.find(
        (option) => option.value === defaultValue
      )?.label;
      if (typeof label === "string") {
        setSelectedValue(label);
      }
    } else {
      setSelectedValue("");
    }
  }, [defaultValue, options]);

  return (
    <DropDown
      items={items}
      mode="click"
      setShowItems={setShowOptions}
      showItems={showOptions}
    >
      <Input className={className} value={selectedValue} {...rest} ref={ref} />
    </DropDown>
  );
});
