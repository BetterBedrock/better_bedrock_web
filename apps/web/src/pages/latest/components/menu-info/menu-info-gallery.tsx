import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const MenuInfoGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/menu_info1.png`,
        `${baseUrl}/static/images/bb/menu_info2.png`,
      ]}
      show={true}
    />
  );
};
