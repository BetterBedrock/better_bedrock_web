export const bedrockSizes = ["small", "medium", "large"];
export type BedrockSize = (typeof bedrockSizes)[number];

export interface BedrockComponentProps {
    size?: BedrockSize;
}