import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const ExtensionsGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/uploads/public/images/bb/extensions1.png`,
        `${baseUrl}/static/uploads/public/images/bb/extensions2.png`,
      ]}
      show={true}
    />
  );
};
