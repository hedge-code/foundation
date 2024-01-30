import classNames from "classnames";
import { SVGProps } from "react";

const LoadingIcon = (
  {className, ...props}: Omit<
    SVGProps<SVGSVGElement>,
    "fill" | " viewBox" | "xmlns"
  >
) => {
  const values = "0 0;0 8;0 0;0 -8;0 0";

  const Circle = ({ cx, begin }: { cx: number; begin: number }) => (
    <circle stroke="none" cx={cx} cy="50" r="6">
      <animateTransform
        attributeName="transform"
        dur="0.5s"
        type="translate"
        values={values}
        repeatCount="indefinite"
        begin={begin}
      />
    </circle>
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 100 100"
      className={classNames('h-full', className)}
      {...props}
    >
      <Circle cx={25} begin={0} />
      <Circle cx={50} begin={0.125} />
      <Circle cx={75} begin={0.25} />
    </svg>
  );
};

export default LoadingIcon;
