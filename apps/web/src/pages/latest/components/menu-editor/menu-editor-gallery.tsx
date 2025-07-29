import { Gallery } from "~/components/bedrock/gallery";
import { baseUrl } from "~/utils/url";

export const MenuEditorGallery = () => {
  return (
    <Gallery
      images={[
        `${baseUrl}/static/images/bb/menu_editor1.png`,
        `${baseUrl}/static/images/bb/menu_editor2.png`,
        `${baseUrl}/static/images/bb/menu_editor3.png`,
        `${baseUrl}/static/images/bb/menu_editor4.png`,
        `${baseUrl}/static/images/bb/menu_editor5.png`,
      ]}
      show={true}
    />
  );
};
