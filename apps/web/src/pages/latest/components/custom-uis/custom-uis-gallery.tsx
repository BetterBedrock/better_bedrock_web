import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const CustomUisGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/uploads/public/images/bb/custom_uis1.png`,
        `${baseUrl}/static/uploads/public/images/bb/custom_uis2.png`,
        `${baseUrl}/static/uploads/public/images/bb/custom_uis3.png`,
        `${baseUrl}/static/uploads/public/images/bb/custom_uis4.png`,
        `${baseUrl}/static/uploads/public/images/bb/custom_uis5.png`,
      ]}
      show={true}
    />
  );
};
