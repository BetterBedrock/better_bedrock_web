import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TutorialVideosTitle {
  deprected: boolean;
}

export const TutorialVideosTitle = ({ deprected }: TutorialVideosTitle) => (
  <BedrockText
    type="h1"
    text={deprected ? "Deprecated Tutorial Videos" : "Tutorial Videos"}
    color="white"
    font="MinecraftTen"
  />
);
