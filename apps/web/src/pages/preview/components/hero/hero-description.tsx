import { BedrockText } from "~/components/bedrock/bedrock-text";
import { DownloadsItemDto } from "~/lib/api";
import { styles } from ".";

interface HeroDescriptionProps {
  download: DownloadsItemDto;
}

export const HeroDescription = ({ download }: HeroDescriptionProps) => (
  <BedrockText
    text={download.description}
    extraClassName={styles.description}
    type="p"
    textAlign="start"
    color="white"
  />
);
