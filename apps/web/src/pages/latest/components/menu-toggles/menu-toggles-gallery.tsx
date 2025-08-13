import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const MenuTogglesGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/uploads/public/images/bb/menu_toggles1.png`,
        `${baseUrl}/static/uploads/public/images/bb/menu_toggles2.png`,
        `${baseUrl}/static/uploads/public/images/bb/menu_toggles3.png`,
      ]}
      show={true}
    />
  );
};
