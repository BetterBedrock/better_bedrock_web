import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const MenuSettingsGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/uploads/public/images/bb/menu_settings1.png`,
        `${baseUrl}/static/uploads/public/images/bb/menu_settings2.png`,
        `${baseUrl}/static/uploads/public/images/bb/menu_settings3.png`,
      ]}
      show={true}
    />
  );
};
