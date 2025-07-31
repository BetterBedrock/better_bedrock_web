import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const GameplayGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/hud1.png`,
        `${baseUrl}/static/images/bb/hud2.png`,
        `${baseUrl}/static/images/bb/hud3.png`,
        `${baseUrl}/static/images/bb/hud4.png`,
        `${baseUrl}/static/images/bb/hud5.png`,
        `${baseUrl}/static/images/bb/hud6.png`,
        `${baseUrl}/static/images/bb/hud7.png`,
        `${baseUrl}/static/images/bb/hud8.png`,
      ]}
      show={true}
    />
  );
};
