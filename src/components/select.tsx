"use client";

import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';

import type {
  ChangeEventHandler,
  ForwardedRef,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

const Select = forwardRef(function Input(
  {
    value,
    type,
    label,
    labelProps,
    className,
    onChange,
    children,
    required,
    ...props
  }: SelectHTMLAttributes<HTMLSelectElement> & {
    label: LabelHTMLAttributes<HTMLLabelElement>["children"];
    labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;
    type?: "input" | "textarea";
  },
  forwardRef: ForwardedRef<HTMLSelectElement>
) {
  const [filled, setFilled] = useState<number>(
    ((value as string) || "").length
  );

  const handleInput: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(e.target.value.length);
  };

  return (
    <label
      className={classNames(
        "rounded px-2 py-1 relative inline-block",
        className
      )}
      {...labelProps}
    >
      <select
        className="outline-none peer overflow-auto w-full bg-transparent"
        onChange={handleInput}
        ref={forwardRef}
        value={value}
        required={required}
        {...props}
      >
        <option hidden></option>
        {children}
      </select>
      <span
        className={classNames(
          "border peer-focus-within:border-blue-500/50 peer-focus-within:before:border-blue-500/50 peer-focus-within:after:border-blue-500/50 peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded peer-focus-within:after:border-t after:flex-grow after:rounded pointer-events-none",
          filled &&
            "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
        )}
      >
        <span className="transition-text-and-margin leading-8">{label}</span>
      </span>
    </label>
  );
});

export default Select;
