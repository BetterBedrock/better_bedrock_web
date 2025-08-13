import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Rating } from "~/components/rating";
import { DownloadsItemDto } from "~/lib/api";
import { styles } from ".";

interface HeroTitleProps {
  create?: boolean;
  download: DownloadsItemDto;
}

export const HeroTitle = ({ download, create }: HeroTitleProps) => (
  <div className={styles.title}>
    <BedrockText
      text={download.title}
      type="h1"
      textAlign="start"
      color="white"
      font="MinecraftTen"
    />
    {!create && <Rating simple rating={4.2} />}
  </div>
);
