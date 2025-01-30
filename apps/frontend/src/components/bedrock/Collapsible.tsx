import { ReactNode, useState } from "react";
import "./Collapsible.css";
import { Button } from "./button/button";

interface CollapsibleProp {
  children?: ReactNode;
  height?: number | string;
  width?: number | string;
}

const Collapsible: React.FC<CollapsibleProp> = ({
  children,
  height,
  width,
  
}) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const button = (
    <Button
      type={"alwaysBlack"}
      setClickedState={isCollapsed}
      height={height}
      width={width}
      text="Example collapsible"
      onChangeStateHandler={(value: boolean) => {
        setCollapsed(value);
      }}
    ></Button>
  );

  const collapsibleElement = (
    <div
      className="collapsible-frame"
      style={{ height: height, maxWidth: width }}
    >
      <div className="collapsible-content">
        {children}
      </div>
    </div>
  );

  if(isCollapsed) {
    return (
      <div>
        {button}
        {collapsibleElement}
      </div>
    )
  }

  return (
    <div>
      {button}
    </div>
  );
};

export default Collapsible;
