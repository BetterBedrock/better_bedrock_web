import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { DownloadsItemDto } from "~/lib/api";

interface HeroHeaderProps {
  downloadItem: DownloadsItemDto;
}

export const HeroHeader = ({ downloadItem }: HeroHeaderProps) => (
  <div>
    <div className={styles.header}>
      <BedrockText type="h1" text="DOWNLOADING" color="white" font="MinecraftTen" />
    </div>
    <BedrockText type="p" color="white" text={downloadItem.title} />
  </div>
);
