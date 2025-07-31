import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const MenuModsGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/menu_mods1.png`,
        `${baseUrl}/static/images/bb/menu_mods2.png`,
        `${baseUrl}/static/images/bb/menu_mods3.png`,
        `${baseUrl}/static/images/bb/menu_mods4.png`,
        `${baseUrl}/static/images/bb/menu_mods5.png`,
      ]}
      show={true}
    />
  );
};
