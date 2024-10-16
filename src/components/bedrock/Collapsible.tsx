import React, { ReactNode, useState } from "react";
import "./Collapsible.css";
import BedrockText from "./BedrockText";
import { Button, ButtonType } from "./Button";

interface CollapsibleProp {
  height?: number | string;
  width?: number | string;
  isOpen?: boolean;
}

const Collapsible: React.FC<CollapsibleProp> = ({
  isOpen,
  height,
  width,
}) => {
  const [isCollapsed, setCollapsed] = useState(false);

  let button = (
    <Button
      type={ButtonType.alwaysBlack}
      height={"48px"}
      width={"450px"}
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
      style={{ height: "48px", width: "450px" }}
    >
      <div className="collapsible-content"></div>
    </div>
  );

  if (collapsible == null) {
    collapsible = (
      <div
        className="collapsible-frame"
        style={{ height: "48px", width: "450px" }}
      >
        <div className="collapsible-content"></div>
      </div>
    );
  }

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
