import { FC, HTMLAttributes } from "react";
import cls from "./Divider.module.scss";
import classNames from "classnames";

type DividerProps = HTMLAttributes<HTMLDivElement>

export const Divider: FC<DividerProps> = ({ className, ...rest}) => {
	return <div className={classNames(cls.Divider, className)} {...rest}></div>;
};
