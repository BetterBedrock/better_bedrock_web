import { BedrockText } from "~/components/bedrock/bedrock-text";

export const TutorialVideosTitle = () => (
  <BedrockText
    type="h2"
    text={deprected ? "Tutorial Videos" : "Deprecated Tutorial Videos"}
    color="white"
    font="Minecraft"
  />
);
