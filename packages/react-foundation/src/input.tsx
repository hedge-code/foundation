/* eslint-disable eqeqeq -- the weaker operator was used consciously */
"use client";

import classNames from "classnames";
import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useId,
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, fRef) {
    const inputId = useId();
    const {
      id,
      type,
      label,
      labelProps,
      className,
      isError,
      onChange,
      ...rest
    } = props;
    const { disabled, value, defaultValue } = rest;
    const ref = useRef<HTMLInputElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- will never be null
    useImperativeHandle(fRef, () => ref.current!, []);

    const [filled, setFilled] = useState<boolean>(
      Boolean(value || defaultValue)
    );
    const isTextarea = useMemo(() => type === "textarea" || false, [type]);

    useEffect(() => {
      setFilled((ref.current && ref.current.value != "") || isTextarea);
    }, [isTextarea, type, value]);

    const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (onChange) onChange(e);
        setFilled((ref.current && ref.current.value != "") || isTextarea);
      },
      []
    );

    return (
      <span
        className={classNames(
          "rounded px-2 py-1 relative inline-block has-[:focus]:text-blue-500 transition-colors duration-100 data-[disabled]:text-gray-500 data-[error]:text-red-500",
          className
        )}
        data-disabled={disabled || undefined}
        data-error={isError || undefined}
      >
        {createElement(isTextarea ? "textarea" : "input", {
          onChange: handleInput,
          ref,
          className: "outline-none peer overflow-auto w-full bg-transparent ring-0",
          type: !isTextarea && type,
          id: classNames(inputId, id),
          ...rest,
        })}
        <label
          className={classNames(
            "border peer-focus-within:border-current peer-focus-within:before:border-current peer-focus-within:after:border-current peer-focus-within:[&>span]:-mt-4 border-t peer-focus-within:text-sm peer-focus-within:border-t-0 rounded left-0 top-0 bottom-0 w-full absolute flex before:min-w-2 peer-focus-within:before:border-t before:rounded-l peer-focus-within:after:border-t after:flex-grow after:rounded-r pointer-events-none data-[error]:border-current data-[error]:before:border-t-current data-[error]:after:border-t-current",
            filled &&
              "[&>span]:-mt-4 text-sm border-t-0 before:border-t after:border-t"
          )}
          data-error={isError || undefined}
          htmlFor={inputId}
          {...labelProps}
        >
          <span className="transition-[font-size_margin] leading-7">
            {label}
          </span>
        </label>
      </span>
    );
  }
);

export default Input;
