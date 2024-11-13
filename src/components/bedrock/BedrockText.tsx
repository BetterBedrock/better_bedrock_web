import React from "react";
import "./BedrockText.css";

interface BedrockTextProps {
  text: string;
  font?: string;
  color?: string;
  selectable?: boolean;
  type: BedrockTextType;
  strong?: boolean;
}

enum BedrockTextType {
  h1,
  h2,
  h3,
  p,
}

const BedrockText: React.FC<BedrockTextProps> = ({
  text,
  color,
  font,
  type,
  selectable = true,
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
      style={{ fontFamily: font, color: color }}
    >
      {text}
    </p>
  );
};

export { BedrockText, BedrockTextType };
