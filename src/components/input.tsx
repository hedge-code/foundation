import type {
  ForwardedRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import React, { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    labelProps,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    label: LabelHTMLAttributes<HTMLLabelElement>["children"];
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  },
  forwardRef: ForwardedRef<HTMLInputElement>
) {
  return (
    <label className="border rounded p-2 py-1" {...labelProps}>
      {label}
      <input {...props} ref={forwardRef} />
    </label>
  );
});

export default Input;
