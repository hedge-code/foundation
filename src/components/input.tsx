"use client";

import classNames from 'classnames';
import { createElement, forwardRef, useState } from 'react';

import type {
  ChangeEventHandler,
  ForwardedRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

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
    type?: HTMLInputTypeAttribute | "textarea";
  },
  forwardRef: ForwardedRef<HTMLInputElement>
) {
  const [filled, setFilled] = useState<number>(
    ((value as string) || "").length
  );

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
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
      {createElement(type === "textarea" ? "textarea" : "input", {
        onChange: handleInput,
        ref: forwardRef,
        value,
        className: "outline-none peer overflow-auto w-full",
        type: type !== "textarea" && type,
        ...props,
      })}
      <span
        className={classNames(
          "border peer-focus-within:border-blue-500/50 peer-focus-within:before:border-inherit peer-focus-within:after:border-inherit peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded peer-focus-within:after:border-t after:flex-grow after:rounded pointer-events-none",
          filled &&
            "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
        )}
      >
        <span className="transition-text-and-margin leading-8">{label}</span>
      </span>
    </label>
  );
});

export default Input;
