import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import cls from "./Input.module.scss";
import { forwardRef } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props: InputProps,
  ref
) {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      className={classNames(cls.Input, className)}
      {...rest}
    />
  );
});
