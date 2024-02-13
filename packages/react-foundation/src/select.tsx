"use client";

import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ChangeEventHandler,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

import LoadingIcon from "./loading-icon";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">;
  label: LabelHTMLAttributes<HTMLLabelElement>["children"];
  isLoading?: boolean;
  isError?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Input(
  {
    id,
    onChange,
    label,
    labelProps,
    children,
    disabled,
    className,
    isLoading = false,
    isError = false,
    ...props
  },
  forwardRef
) {
  const ref = useRef<HTMLSelectElement>(null);
  const { required, multiple, value, defaultValue, size = 0 } = props;

  useImperativeHandle(forwardRef, () => ref.current!, []);

  const isMultiValues = useMemo(() => multiple || size > 1, [multiple, size]);
  const [filled, setFilled] = useState<boolean>(!!(value || defaultValue) || isMultiValues);

  useEffect(() => {
    if (isMultiValues || isLoading) setFilled(true);
    else setFilled(!!(ref.current && ref.current.value != ""));
  }, [isLoading, multiple, size]);

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (onChange) onChange(e);
    setFilled(e.target.value != "" || isMultiValues || isLoading);
  };

  const selectId = `${uuidv4()}-select`;

  return (
    <span
      data-error={isError || undefined}
      data-disabled={isLoading || disabled || undefined}
      className={classNames(
        "rounded px-2 py-1 relative inline-block has-[:focus]:text-blue-500 transition-colors duration-100 data-[disabled]:text-gray-500 data-[error]:text-red-500",
        className
      )}
    >
      <div className="flex items-center">
        <select
          id={classNames(selectId, id)}
          className={classNames(
            "outline-none peer overflow-auto w-full bg-transparent",
            isLoading && "pl-7"
          )}
          onChange={handleSelect}
          disabled={disabled || isLoading}
          ref={ref}
          {...props}
        >
          {!required && !isMultiValues && <option />}
          {children}
        </select>
        <LoadingIcon
          className={classNames(
            "w-7 absolute transition-opacity duration-500",
            !isLoading && "scale-x-0 opacity-0"
          )}
        />
        <label
          htmlFor={selectId}
          data-error={isError || undefined}
          className={classNames(
            "border peer-focus-within:border-current peer-focus-within:before:border-current peer-focus-within:after:border-current peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded-l peer-focus-within:after:border-t after:flex-grow after:rounded-r pointer-events-none",
            isError &&
              "border-current before:border-t-current after:border-t-current",
            filled &&
              "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t",
            { ...labelProps }
          )}
        >
          <span className="transition-[font-size_margin] leading-7">
            {label}
          </span>
        </label>
      </div>
    </span>
  );
});

export default Select;
