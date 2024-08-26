"use client";

import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import cls from "./DropDown.module.scss";
import classNames from "classnames";
import DownArrowSvg from "@/shared/assets/icons/down-arrow.svg?react";
import UpArrowSvg from "@/shared/assets/icons/up-arrow.svg?react";

export interface DropdownItem {
  item: ReactNode;
  key: string | number;
}

interface DropDownProps extends PropsWithChildren {
  items: DropdownItem[];
  mode?: "hover" | "click";
  showItems: boolean;
  setShowItems: (value: boolean) => void;
  showIcon?: boolean;
}

export const DropDown: FC<DropDownProps> = (props) => {
  const {
    children,
    items,
    setShowItems,
    showItems,
    mode = "hover",
    showIcon,
  } = props;
  const closeDropdownTimeout = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();

  useEffect(() => {
    if (mode !== "click") return;

    const onBodyClick = () => {
      setShowItems(false);
    };

    document.body.addEventListener("click", onBodyClick);
    return () => document.body.removeEventListener("click", onBodyClick);
  }, [mode, setShowItems]);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (mode !== "click") return;
    e.stopPropagation();
    setShowItems(true);
  };

  const onMouseOver = () => {
    if (mode !== "hover") return;
    setShowItems(true);
    clearTimeout(closeDropdownTimeout.current);
  };

  const onMouseOut = () => {
    if (mode !== "hover") return;
    closeDropdownTimeout.current = setTimeout(() => {
      setShowItems(false);
    }, 350);
  };

  return (
    <div
      className={cls.dropdown_container}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <div className={cls.children}>
        {children}
        {showIcon &&
          (showItems ? (
            <UpArrowSvg
              className={cls.icon}
              fill="#487cffe1"
              height={20}
              width={20}
            />
          ) : (
            <DownArrowSvg
              className={cls.icon}
              fill="#487cffe1"
              height={20}
              width={20}
            />
          ))}
      </div>
      <div
        className={classNames(cls.items, {
          [cls.opened]: showItems,
        })}
      >
        {items.map(({ item, key }) => (
          <div key={key} className={cls.item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
