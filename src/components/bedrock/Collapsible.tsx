import React, { ReactNode, useState } from "react";
import "./Collapsible.css";
import BedrockText from "./BedrockText";
import { Button, ButtonType } from "./Button";

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

  let button = (
    <Button
      type={ButtonType.alwaysBlack}
      height={height}
      width={width}
      toggleButton={true}
      onChangeStateHandler={(value: boolean) => {
        setCollapsed(value);
        console.log("On Change State Handler: ", value);
      }}
    ></Button>
  );

  let collapsible = (
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
        {collapsible}
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
