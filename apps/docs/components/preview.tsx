import { type PropsWithChildren, type ReactElement } from "react";

interface PreviewProps {
  component: ReactElement;
}

function Preview({
  children,
  component,
}: PropsWithChildren<PreviewProps>): ReactElement {
  return (
    <div className="flex flex-col justify-stretch rounded-xl my-4">
      <div className="flex justify-center items-center py-6">
        {component}
      </div>
      <div className="-mb-4">
        {children}
      </div>
    </div>
  );
}

export default Preview;
