import classNames from "classnames";
import type { ReactNode, SVGProps } from "react";

type CloseIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "fill" | " viewBox" | "xmlns"
>;

function CloseIcon({ className, ...props }: CloseIconProps): ReactNode {
  return (
    <svg
      className={classNames("h-full rotate-45", className)}
      fill="currentColor"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11 0.7H13V23.3H11z" />
      <path d="M0.7 11H23.3V13H0.7z" />
    </svg>
  );
}
export default CloseIcon;
