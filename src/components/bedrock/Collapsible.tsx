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
      style={{ maxWidth: width }}>
      <div className="collapsible-content">
        <BedrockText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat aliquid ad adipisci nesciunt inventore, sequi natus maxime doloribus dolor quidem, ratione ipsum, expedita odio mollitia tempore? Ipsa labore nisi nostrum!"></BedrockText>
        <BedrockText text="TEST TEST TEST"></BedrockText>
      </div>
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
