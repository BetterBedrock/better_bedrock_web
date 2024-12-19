import React from "react";
import "./BedrockText.css";

interface BedrockTextProps {
  text: string;
  font?: string;
  color?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end" | undefined;
  margin?: string;
  selectable?: boolean;
  type: BedrockTextType;
  strong?: boolean;
}

enum BedrockTextType {
  h1,
  h2,
  h3,
  p1,
  p2,
  p3,
}

const BedrockText: React.FC<BedrockTextProps> = ({
  text,
  color,
  font,
  type,
  textAlign,
  selectable = true,
  margin,
  strong,
}) => {
  if (font === undefined) {
    font = "Mojangles";
  }

  return (
    <p
      className={
        "bedrock-text " +
        (strong !== undefined ? "strong " : "") +
        (selectable === false ? "non-selectable " : "") +
        BedrockTextType[type]
      }
      style={{ fontFamily: font, color: color, textAlign: textAlign, margin: margin}}
    >
      {text}
    </p>
  );
};

export { BedrockText, BedrockTextType };
