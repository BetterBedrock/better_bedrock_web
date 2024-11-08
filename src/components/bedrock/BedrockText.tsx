import React from "react";
import './BedrockText.css';

interface BedrockTextProps {
    text: string;
    font?: string;
    color?: string;
    selectable?: boolean;
    type: BedrockTextType;
}

enum BedrockTextType {
    h1,
    h2,
    h3,
    p
}

const BedrockText: React.FC<BedrockTextProps> = ({
    text,
    color,
    font,
    type,
    selectable = true,
}) => {
    if (font === undefined) {
        font = "Mojangles";
    }

    return (
        <p className={"bedrock-text " + (selectable === false ? "non-selectable " : "") + BedrockTextType[type]} style={{fontFamily: font, color: color}}>
            {text}
        </p>
    );
}

export {BedrockText, BedrockTextType};
