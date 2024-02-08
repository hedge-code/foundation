import classNames from "classnames";
import { SVGProps, memo } from "react";

type CircleProps = { cx: number; begin: number; strokeWidth?: number | string };

const Circle = memo(({ cx, begin, strokeWidth }: CircleProps) => (
  <circle stroke="none" cx={cx} cy="50" r="6" strokeWidth={strokeWidth}>
    <animateTransform
      attributeName="transform"
      dur="0.5s"
      type="translate"
      values="0 0;0 8;0 0;0 -8;0 0"
      repeatCount="indefinite"
      begin={begin}
    />
  </circle>
));

type LoadingIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "fill" | " viewBox" | "xmlns"
> & { strokeWidth?: CircleProps["strokeWidth"] };

const LoadingIcon = ({
  className,
  strokeWidth,
  ...props
}: LoadingIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 100 100"
    className={classNames("h-full", className)}
    {...props}
  >
    {[25, 50, 75].map((cx, index) => (
      <Circle
        key={index}
        cx={cx}
        begin={index * 0.125}
        strokeWidth={strokeWidth}
      />
    ))}
  </svg>
);

export default LoadingIcon;
