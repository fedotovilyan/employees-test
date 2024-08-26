import classNames from "classnames";
import { FC, PropsWithChildren, useState } from "react";
import cls from "./Alert.module.scss";
import WarningSvg from "@/shared/assets/icons/diamond-exclamation.svg?react";
import SuccessSvg from "@/shared/assets/icons/check.svg?react";
import InfoSvg from "@/shared/assets/icons/exclamation.svg?react";
import ErrorSvg from "@/shared/assets/icons/x.svg?react";
import CrossSvg from "@/shared/assets/icons/cross.svg?react";
import { Button, ButtonTheme } from "../Button/Button";

export enum AlertType {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

interface AlertProps extends PropsWithChildren {
	type?: AlertType;
	className?: string;
	closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
	const { children, className, type = AlertType.Info, closable } = props;
	const [isHidden, setIsHidden] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const onClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsHidden(true);
		}, 500);
	};

	return (
		<div
			className={classNames(
				cls.Alert,
				cls[type],
				{ [cls.hidden]: isHidden, [cls.is_closing]: isClosing },
				className
			)}
		>
			{type === AlertType.Info && (
				<InfoSvg
					fill="#1677ff"
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{type === AlertType.Error && (
				<ErrorSvg
					fill="#ff4d4f"
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{type === AlertType.Success && (
				<SuccessSvg
					fill="#52c41a"
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{type === AlertType.Warning && (
				<WarningSvg
					fill="#faad14"
					width={24}
					height={24}
					className={cls.icon}
				/>
			)}
			{children}
			{closable && (
				<Button
					theme={ButtonTheme.Transparent}
					className={cls.close_btn}
					onClick={onClose}
				>
					<CrossSvg
						width={20}
						height={20}
						className={cls.cross_icon}
					/>
				</Button>
			)}
		</div>
	);
};
