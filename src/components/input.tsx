"use client";

import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
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
  { id, type, label, labelProps, className, isError, onChange, ...props },
  forwardRef
) {
  const ref = useRef<HTMLInputElement>(null);
  const { disabled } = props;

  useImperativeHandle(forwardRef, () => ref.current!, []);

  const [filled, setFilled] = useState<boolean>(false);

  useEffect(() => {
    setFilled(
      (ref.current && ref.current.value != "") || false
    );
  }, [type]);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(
      (ref.current && ref.current.value != "") || type === "textarea" || false
    );
  };

  const inputId = `${uuidv4()}-select`;

  return (
    <span
      className={classNames(
        isError && "text-red-500",
        disabled && "shadow-inner opacity-65",
        "rounded px-2 py-1 relative inline-block has-[:focus]:text-blue-500 transition-colors duration-100",
        className
      )}
    >
      {createElement(type === "textarea" ? "textarea" : "input", {
        onChange: handleInput,
        ref,
        className: "outline-none peer overflow-auto w-full",
        type: type !== "textarea" && type,
        id: classNames(inputId, id),
        ...props,
      })}
      <label
        htmlFor={inputId}
        className={classNames(
          "border peer-focus-within:border-current peer-focus-within:before:border-current peer-focus-within:after:border-current peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded-l peer-focus-within:after:border-t after:flex-grow after:rounded-r pointer-events-none",
          isError &&
            "border-current before:border-t-current after:border-t-current",
          filled &&
            "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
        )}
        {...labelProps}
      >
        <span className="transition-text-and-margin leading-7">{label}</span>
      </label>
    </span>
  );
});

export default Input;
