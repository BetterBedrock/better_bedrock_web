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
    console.log("Before logging font: ", font)
    if (font === undefined) {
        font = "Mojangles";
    }

    console.log("Text: ", text,  " | Font name: ", font)

    return (
        <p className="bedrock-text non-selectable" style={{fontFamily: font}}>
            {text}
        </p>
    );
}

export default BedrockText;
