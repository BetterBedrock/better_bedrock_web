import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TutorialVideosTitle {
  section: string;
}

export const TutorialVideosTitle = ({ section }: TutorialVideosTitle) => (
  <BedrockText
    type="h1"
    text={section === "default" ? "Tutorial Videos" : "Deprecated Tutorial Videos"}
    color="white"
    font="MinecraftTen"
  />
);
