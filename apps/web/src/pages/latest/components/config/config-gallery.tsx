import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const ConfigGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/config1.png`,
        `${baseUrl}/static/images/bb/config2.png`,
      ]}
      show={true}
    />
  );
};
