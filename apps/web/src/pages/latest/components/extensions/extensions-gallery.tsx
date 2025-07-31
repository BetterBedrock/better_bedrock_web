import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const ExtensionsGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/extensions1.png`,
        `${baseUrl}/static/images/bb/extensions2.png`,
      ]}
      show={true}
    />
  );
};
