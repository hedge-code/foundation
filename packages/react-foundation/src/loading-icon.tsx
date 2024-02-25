import classNames from "classnames";
import type { ReactElement, SVGProps } from "react";
import { memo } from "react";

interface CircleProps {
  cx: number;
  begin: number;
  strokeWidth?: number | string;
}

const Circle = memo(function Circle({ cx, begin, strokeWidth }: CircleProps) {
  return (
    <circle cx={cx} cy="50" r="6" stroke="none" strokeWidth={strokeWidth}>
      <animateTransform
        attributeName="transform"
        begin={begin}
        dur="0.5s"
        repeatCount="indefinite"
        type="translate"
        values="0 0;0 8;0 0;0 -8;0 0"
      />
    </circle>
  );
});

type LoadingIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "fill" | " viewBox" | "xmlns"
> & { strokeWidth?: CircleProps["strokeWidth"] };

function LoadingIcon({
  className,
  strokeWidth,
  ...props
}: LoadingIconProps): ReactElement {
  return (
    <svg
      className={classNames("h-full", className)}
      fill="currentColor"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {[25, 50, 75].map((cx, index) => (
        <Circle
          begin={index * 0.125}
          cx={cx}
          key={cx}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}

export default LoadingIcon;
