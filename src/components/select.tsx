"use client";

import classNames from "classnames";
import React, { forwardRef, useState } from "react";

import type {
  ChangeEventHandler,
  ForwardedRef,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import Loading from "./loading";

const Select = forwardRef(function Input(
  {
    value,
    type,
    label,
    isLoading = false,
    labelProps,
    className,
    onChange,
    children,
    required,
    isError = false,
    ...props
  }: SelectHTMLAttributes<HTMLSelectElement> & {
    labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;
    label: LabelHTMLAttributes<HTMLLabelElement>["children"];
    type?: "input" | "textarea";
    isLoading?: boolean;
    isError?: boolean;
  },
  forwardRef: ForwardedRef<HTMLSelectElement>
) {
  const [filled, setFilled] = useState<boolean>(
    ((value as string) || "").length > 0 || isLoading
  );

  const handleInput: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(e.target.value.length > 0 || isLoading);
  };

  return (
    <label
      className={classNames(
        isError && 'text-red-500',
        "rounded px-2 py-1 relative inline-block",
        className
      )}
      {...labelProps}
    >
      <div className="flex items-center">
        {isLoading && <Loading className="w-7" />}
        <select
          className="outline-none peer overflow-auto w-full bg-transparent focus:text-blue-500"
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
            "border peer-focus-within:text-blue-500 peer-focus-within:border-current peer-focus-within:before:border-current peer-focus-within:after:border-current peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded peer-focus-within:after:border-t after:flex-grow after:rounded pointer-events-none",
            isError &&
              "border-current before:border-t-current after:border-t-current",
            filled &&
              "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
          )}
        >
          <span className="transition-text-and-margin leading-7">{label}</span>
        </span>
      </div>
    </label>
  );
});

export default Select;
