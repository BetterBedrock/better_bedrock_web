import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TutorialVideosTitle {
  deprected: boolean;
}

export const TutorialVideosTitle = ({ deprected }: TutorialVideosTitle) => (
  <BedrockText
    type="h1"
    text={deprected ? "Tutorial Videos" : "Deprecated Tutorial Videos"}
    color="white"
    font="Minecraft"
  />
);
