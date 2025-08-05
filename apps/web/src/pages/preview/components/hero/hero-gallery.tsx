import { Gallery } from "~/components/bedrock/gallery";
import { DownloadsItemDto } from "~/lib/api";
import { baseUrl } from "~/utils/url";

interface HeroGalleryProps {
  download: DownloadsItemDto;
}

export const HeroGallery = ({ download }: HeroGalleryProps) => (
  <Gallery
    images={download.imageAssetUrl.map((image) => `${baseUrl}${image}`)}
    show={true}
    fullscreen={false}
  />
);
