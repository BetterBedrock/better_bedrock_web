import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Gallery } from "~/components/bedrock/gallery";
import { DownloadsRichDescriptionDto } from "~/lib/api";
import { styles } from ".";
import { baseUrl } from "~/utils/url";

interface HeroRichDescriptionProps {
  description: DownloadsRichDescriptionDto;
}

export const HeroRichDescription = ({ description }: HeroRichDescriptionProps) => (
  <div>
    <BedrockText
      type="h1"
      text={description.name}
      color="white"
      font="MinecraftTen"
      extraClassName={styles.description}
    />
    <Gallery
      images={description.images.map((image) => `${baseUrl}${image}`)}
      show={true}
      fullscreen={false}
    />
  </div>
);
