"use client";

import classNames from "classnames";
import type {
  ChangeEventHandler,
  ForwardedRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import React, { createElement, forwardRef, useState } from "react";

const Input = forwardRef(function Input(
  {
    value,
    type,
    label,
    labelProps,
    className,
    onChange,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    label: LabelHTMLAttributes<HTMLLabelElement>["children"];
    labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;
    type?: "input" | "textarea";
  },
  forwardRef: ForwardedRef<HTMLInputElement>
) {
  const [filled, setFilled] = useState<string>((value as string) || "");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(e.target.value);
  };

  return (
    <label
      className={classNames(
        "border border-t-0 rounded px-2 py-1 relative inline-block",
        className
      )}
      {...labelProps}
    >
      {createElement(type || "input", {
        onChange: handleInput,
        ref: forwardRef,
        value,
        className: "outline-none peer overflow-auto",
        ...props,
      })}
      <span
        className={classNames(
          "peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded peer-focus-within:after:border-t after:flex-grow after:rounded pointer-events-none",
          filled.length &&
            "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
        )}
      >
        <span className="transition-text-and-margin leading-8">{label}</span>
      </span>
    </label>
  );
});

export default Input;
