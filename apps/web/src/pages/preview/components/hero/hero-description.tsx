import { BedrockText } from "~/components/bedrock/bedrock-text";
import { DownloadsItemDto } from "~/lib/api";
import { styles } from ".";

interface HeroDescriptionProps {
  download: DownloadsItemDto;
}

export const HeroDescription = ({ download }: HeroDescriptionProps) => (
  <BedrockText
    text={`${download.description ? download.description + " By " : ""}@${download.creator}`}
    extraClassName={styles.description}
    type="p"
    textAlign="center"
    color="white"
  />
);
