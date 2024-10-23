import React from "react";
import './BedrockText.css';

interface BedrockTextProps {
    text: string;
    font?: string;
    color?: string;
}

const BedrockText: React.FC<BedrockTextProps> = ({
    text,
    color,
    font
}) => {
    if (font === undefined) {
        font = "Mojangles";
    }

    return (
        <p className="bedrock-text non-selectable" style={{fontFamily: font, color: color}}>
            {text}
        </p>
    );
}

export default BedrockText;
