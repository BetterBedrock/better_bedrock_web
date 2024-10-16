import React from "react";
import './BedrockText.css';

interface BedrockTextProps {
    text: string;
    font?: string;
}

const BedrockText: React.FC<BedrockTextProps> = ({
    text,
    font
}) => {
    if (font === undefined) {
        font = "Mojangles";
    }

    return (
        <p className="bedrock-text non-selectable" style={{fontFamily: font}}>
            {text}
        </p>
    );
}

export default BedrockText;
