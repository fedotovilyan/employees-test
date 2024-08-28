import classNames from "classnames";
import {
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cls from "./Select.module.scss";
import { DropDown, DropdownItem } from "../DropDown/DropDown";
import { Input } from "../Input/Input";
import { useMemo } from "react";
import crossSvg from "@/shared/assets/icons/cross.svg";

export interface SelectOption {
  label: ReactNode | string;
  key: string | number;
  value: unknown;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface SelectProps {
  defaultValues?: unknown[];
  options: SelectOption[];
  withSearch?: boolean;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  onSelect?: (option: Partial<SelectOption>) => void;
  onSearch?: (value: string) => void;
  onDeselect?: (option: SelectOption) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  props,
  ref
) {
  const {
    className,
    options,
    defaultValues,
    withSearch,
    multiple,
    placeholder,
    onSelect,
    onSearch,
    onDeselect,
    ...rest
  } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectChange = useCallback(
    (option: SelectOption) => {
      if (!multiple) setShowOptions(false);
      setShowInput(false);

      let selectedOption: Partial<SelectOption> = option;
      const isOptionAlreadySelected = !!selectedOptions.find(
        (val) => val.value === option.value
      );

      if (multiple && isOptionAlreadySelected) {
        setSelectedOptions((prev) =>
          prev.filter((val) => val.value !== option.value)
        );
        selectedOption = {};
      } else if (multiple && !isOptionAlreadySelected) {
        setSelectedOptions((prev) => prev.concat(option));
      } else if (!multiple && isOptionAlreadySelected) {
        setSelectedOptions([]);
        selectedOption = {};
      } else if (!multiple && !isOptionAlreadySelected) {
        setSelectedOptions([option]);
      }

      onSelect?.(selectedOption);
    },
    [multiple, onSelect, selectedOptions]
  );

  const items: DropdownItem[] = useMemo(
    () =>
      options.map((option) => ({
        item: (
          <div
            key={option.key}
            className={classNames(cls.select_option, {
              [cls.selected_option]: !!selectedOptions.find(
                (val) => val.label === option.label
              ),
            })}
            onClick={(e) => {
              e.stopPropagation();
              onSelectChange(option);
              option.onClick?.(e);
            }}
          >
            {option.label}
          </div>
        ),
        key: option.key,
      })),
    [onSelectChange, options, selectedOptions]
  );

  useEffect(() => {
    if (defaultValues?.length) {
      const filteredOptions = options.filter((option) =>
        defaultValues.includes(option.value)
      );

      setSelectedOptions(filteredOptions);
    } else {
      setSelectedOptions([]);
    }
  }, [defaultValues, options]);

  useEffect(() => {
    const onBodyClick = () => {
      setShowInput(false);
    };

    document.body.addEventListener("click", onBodyClick);
    return () => document.body.removeEventListener("click", onBodyClick);
  }, [setShowInput]);

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  return (
    <DropDown
      items={items}
      setShowItems={setShowOptions}
      showItems={showOptions}
    >
      <div
        ref={ref}
        onClick={() => {
          if (withSearch) setShowInput(true);
        }}
        className={classNames(
          cls.select,
          { [cls.input_showed]: showInput },
          className
        )}
        {...rest}
      >
        {showInput ? (
          <Input
            className={cls.input}
            value={searchValue}
            placeholder={placeholder}
            ref={inputRef}
            onChange={(e) => {
              const value = e.target.value;
              onSearch?.(value);
              setSearchValue(value);
            }}
          />
        ) : selectedOptions.length ? (
          selectedOptions.map(({ label, key, value }) => (
            <div key={key} className={cls.selected_item}>
              {label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOptions((prev) =>
                    prev.filter((el) => el.value !== value)
                  );
                  onDeselect?.({ label, key, value });
                  if (!multiple) onSelect?.({});
                }}
                className={cls.cross_btn}
              >
                <img
                  height={15}
                  width={15}
                  src={crossSvg}
                  className={cls.cross}
                  alt="Закрыть"
                />
              </button>
            </div>
          ))
        ) : (
          <span className={cls.placeholder}>{placeholder}</span>
        )}
      </div>
    </DropDown>
  );
});
