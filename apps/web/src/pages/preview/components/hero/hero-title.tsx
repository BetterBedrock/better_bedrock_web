import { BedrockText } from "~/components/bedrock/bedrock-text";
import { DownloadsItemDto } from "~/lib/api";

interface HeroTitleProps {
  download: DownloadsItemDto;
}

export const HeroTitle = ({ download }: HeroTitleProps) => (
  <BedrockText
    text={download.title}
    type="h1"
    textAlign="center"
    color="white"
    font="MinecraftTen"
  />
);
