import { forwardRef, useEffect, useState } from "react";
import { Select, SelectProps } from "../Select";

export interface SelectWithSearchProps extends SelectProps {
  onSearch?: (value: string) => void;
}

export const SelectWithSearch = forwardRef<
  HTMLInputElement,
  SelectWithSearchProps
>(function SelectWithSearch(props) {
  const { onSearch, value, ...rest } = props;
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <Select
      {...rest}
      onSelectChange={(opt) => {
        if (typeof opt.label === "string") {
          setSearch(opt.label);
        }
      }}
      onChange={(e) => {
        setSearch(e.target.value);
        onSearch?.(e.target.value);
      }}
      value={search}
    />
  );
});
