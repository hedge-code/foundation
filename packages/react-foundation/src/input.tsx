"use client";

import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: LabelHTMLAttributes<HTMLLabelElement>["children"];
  labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;
  type?: HTMLInputTypeAttribute | "textarea";
  isError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  forwardRef
) {
  const { id, type, label, labelProps, className, isError, onChange, ...rest } =
    props;
  const { disabled, value, defaultValue } = rest;
  const ref = useRef<HTMLInputElement>(null);

  useImperativeHandle(forwardRef, () => ref.current!, []);

  const [filled, setFilled] = useState<boolean>(!!(value || defaultValue));
  const isTextarea = useMemo(() => type === "textarea" || false, [type]);

  useEffect(() => {
    setFilled((ref.current && ref.current.value != "") || isTextarea);
  }, [type, value]);

  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (onChange) onChange(e);
    setFilled((ref.current && ref.current.value != "") || isTextarea);
  }, []);

  const inputId = `${uuidv4()}-select`;

  return (
    <span
      data-error={isError || undefined}
      data-disabled={disabled || undefined}
      className={classNames(
        "rounded px-2 py-1 relative inline-block has-[:focus]:text-blue-500 transition-colors duration-100 data-[disabled]:text-gray-500 data-[error]:text-red-500",
        className
      )}
    >
      {createElement(isTextarea ? "textarea" : "input", {
        onChange: handleInput,
        ref,
        className: "outline-none peer overflow-auto w-full bg-transparent",
        type: !isTextarea && type,
        id: classNames(inputId, id),
        ...rest,
      })}
      <label
        htmlFor={inputId}
        data-error={isError || undefined}
        className={classNames(
          "border peer-focus-within:border-current peer-focus-within:before:border-current peer-focus-within:after:border-current peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded-l peer-focus-within:after:border-t after:flex-grow after:rounded-r pointer-events-none data-[error]:border-current data-[error]:before:border-t-current data-[error]:after:border-t-current",
          filled &&
            "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
        )}
        {...labelProps}
      >
        <span className="transition-[font-size_margin] leading-7">{label}</span>
      </label>
    </span>
  );
});

export default Input;
