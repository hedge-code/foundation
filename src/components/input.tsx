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
    type,
    label,
    labelProps,
    onChange,
    ...props
  }: Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    label: LabelHTMLAttributes<HTMLLabelElement>["children"];
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
    type?: "input" | "textarea";
  },
  forwardRef: ForwardedRef<HTMLInputElement>
) {
  const [filled, setFilled] = useState("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(e.target.value);
  };

  return (
    <label
      className="border border-t-0 rounded px-2 py-1 relative inline-block"
      {...labelProps}
    >
      {createElement(type || "input", {
        onChange: handleInput,
        ref: forwardRef,
        className: classNames(
          "outline-none peer overflow-auto",
          labelProps?.className
        ),
        ...props,
      })}
      <span
        className={classNames(
          "peer-focus-within:[&>strong]:-mt-3 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded peer-focus-within:after:border-t after:flex-grow after:rounded pointer-events-none",
          filled.length &&
            "[&>strong]:-mt-3 text-sm border-t-0 before:border-t after:border-t"
        )}
      >
        <strong className="transition-text-and-margin">{label}</strong>
      </span>
    </label>
  );
});

export default Input;
