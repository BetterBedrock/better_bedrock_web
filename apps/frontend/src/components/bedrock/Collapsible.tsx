import { ReactNode, useState } from "react";
import "./Collapsible.css";
import { Button } from "./button/button";
import { BedrockText } from "./text";

interface CollapsibleProp {
  headerText: string;
  contentText: string;
  useText?: boolean
  children?: ReactNode;
  width?: number | string;
  contentHeight?: number | string;
  indexTextRef?: string | number;
}

export const Collapsible: React.FC<CollapsibleProp> = ({
  headerText,
  contentText,
  children,
  width,
  contentHeight,
  indexTextRef = ""

}) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const buttonElement = (
    <Button
      type={"alwaysBlack"}
      isClicked={isCollapsed}
      // height={"4rem"}
      width={"100%"}
      text={""}
      onTap={() => {
        setCollapsed((prev) => !prev);
      }}
    >
      <div className="buttonElementContainer">
        <div style={{ display: "flex" }}>
          <BedrockText
            type={"p"}
            text={indexTextRef ? `${indexTextRef}. ${headerText}` : headerText}
            textAlign={"left"}
            style={{padding: "0.5rem"}}
          />
        </div>
        <BedrockText
          type={"p"}
          text={isCollapsed ? "-" : "+"}
        />
      </div>
    </Button>
  );

  const collapsibleElement = (
    <div
      className="collapsibleFrame"
      style={{ height: contentHeight, maxWidth: "100%" }}>
      <div className="collapsibleContent">
        <BedrockText type={"p"} text={contentText} textAlign={"left"} style={{ wordBreak: "break-word" }} />
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", width: width, flexDirection: "column" }} >
      {buttonElement}
      {isCollapsed && collapsibleElement}
    </div>
  )
};