import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const PlatformSupportGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/platform_support1.png`,
        `${baseUrl}/static/images/bb/platform_support2.png`,
      ]}
      show={true}
    />
  );
};
