import React, { ReactNode, useState } from "react";
import "./Collapsible.css";
import BedrockText from "./BedrockText";
import { Button, ButtonType } from "./Button";

interface CollapsibleProp {
  height?: number | string;
  width?: number | string;
  isOpen?: boolean;
  collapsibleHeight?: number | string;
}

const Collapsible: React.FC<CollapsibleProp> = ({
  isOpen,
  height,
  width,
  collapsibleHeight = "48px"
}) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const button = (
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

  const collapsibleElement = (
    <div
      className="collapsible-frame"
      style={{ height: collapsibleHeight, width: width }}>
      <div className="collapsible-content"></div>
    </div>
  );

  let collapsible = collapsibleElement
  
  if (collapsible == null) collapsible = collapsibleElement;

  if (isCollapsed) {
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
