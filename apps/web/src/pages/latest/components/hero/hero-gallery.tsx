import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const HeroGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/themes/light_dark_ui/1.png`,
        `${baseUrl}/static/images/themes/light_dark_ui/2.png`,
        `${baseUrl}/static/images/themes/light_dark_ui/3.png`,
        `${baseUrl}/static/images/themes/light_dark_ui/4.png`,
        `${baseUrl}/static/images/themes/light_dark_ui/5.png`,
      ]}
      show={true}
    />
  );
};
