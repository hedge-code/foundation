"use client";

import classNames from 'classnames';
import type { ChangeEventHandler, LabelHTMLAttributes, SelectHTMLAttributes } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import LoadingIcon from './loading-icon';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple'> {
  labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;
  label: LabelHTMLAttributes<HTMLLabelElement>["children"];
  type?: "input" | "textarea";
  isLoading?: boolean;
  isError?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Input(
  {
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
  },
  forwardRef
) {
  const ref = useRef<HTMLSelectElement>(null);

  useImperativeHandle(forwardRef, () => ref.current!, []);

  const [filled, setFilled] = useState<boolean>(
    (ref.current && ref.current.value != "") || isLoading
  );

  useEffect(() => {
    if (isLoading) setFilled(true);
    else setFilled((ref.current && ref.current.value != "") || isLoading);
  }, [isLoading]);

  const handleInput: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(e.target.value != "" || isLoading);
  };

  return (
    <label
      className={classNames(
        isError && "text-red-500",
        "rounded px-2 py-1 relative inline-block has-[:focus]:text-blue-500",
        className
      )}
      {...labelProps}
    >
      <div className="flex items-center">
        <select
          className={classNames(
            "outline-none peer overflow-auto w-full bg-transparent z-10 transition-all",
            isLoading && "pl-7"
          )}
          onChange={handleInput}
          required={required}
          ref={ref}
          {...props}
        >
          {!required && <option />}
          {children}
        </select>
        <LoadingIcon
          className={classNames(
            "w-7 absolute z-0 transition-all duration-500",
            !isLoading && "scale-x-0 opacity-0"
          )}
        />
        <span
          className={classNames(
            "border peer-focus-within:border-current peer-focus-within:before:border-current peer-focus-within:after:border-current peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded peer-focus-within:after:border-t after:flex-grow after:rounded pointer-events-none",
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
