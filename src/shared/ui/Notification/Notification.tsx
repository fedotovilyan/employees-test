import {
  FC,
  useEffect,
  useState,
  PropsWithChildren,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { Alert, AlertType } from "../Alert/Alert";
import classNames from "classnames";
import cls from "./Notification.module.scss";
import CrossSvg from "@/shared/assets/icons/cross.svg?react";
import { Button, ButtonTheme } from "../Button/Button";

interface NotificationProps extends PropsWithChildren {
  className?: string;
  position?: "top-right" | "top-left" | "top";
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  closable?: boolean;
  isOpen: boolean;
  onClose?: () => void;
}

export const Notification: FC<NotificationProps> = (props) => {
  const {
    position = "top",
    type = "info",
    className,
    duration,
    closable,
    children,
    isOpen,
    onClose,
  } = props;

  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isClosing, setIsClosing] = useState(false);
  const [notificationDuration, setNotificationDuration] = useState<
    number | null
  >(null);

  const onNotificationClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 500);
  }, [onClose]);

  const onMouseOver = () => {
    setNotificationDuration(null);
  };

  const onMouseOut = () => {
    setNotificationDuration(duration ?? null);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setNotificationDuration(duration ?? null);
  }, [duration]);

  useEffect(() => {
    if (notificationDuration && isOpen
    ) {
      timerRef.current = setTimeout(() => {
        onNotificationClose();
      }, notificationDuration);
    }
    return () => clearTimeout(timerRef.current);
  }, [isOpen, notificationDuration, onNotificationClose]);

  return mounted
    ? createPortal(
        <div
          className={classNames(
            cls.Notification,
            {
              [cls[position]]: true,
              [cls.opened]: isOpen,
              [cls.is_closing]: isClosing,
            },
            className
          )}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          {type === "error" && <Alert type={AlertType.Error}>{children}</Alert>}
          {type === "info" && <Alert type={AlertType.Info}>{children}</Alert>}
          {type === "warning" && (
            <Alert type={AlertType.Warning}>{children}</Alert>
          )}
          {type === "success" && (
            <Alert type={AlertType.Success}>{children}</Alert>
          )}
          {closable && (
            <Button
              theme={ButtonTheme.Transparent}
              className={cls.close_btn}
              onClick={onNotificationClose}
            >
              <CrossSvg
                width={20}
                height={20}
                className={cls.cross_icon}
              />
            </Button>
          )}
        </div>,
        document.querySelector(".app") || document.body
      )
    : null;
};
