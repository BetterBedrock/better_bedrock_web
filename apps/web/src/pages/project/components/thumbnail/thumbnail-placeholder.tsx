import { ImagePlaceholder } from "~/components/image-placeholder";
import { baseUrl } from "~/utils/url";

import { useThumbnailUpload } from ".";

export const ThumbnailPlaceholder = () => {
  const { selectedProject, handleUploadThumbnail } = useThumbnailUpload();

  return (
    <ImagePlaceholder
      onUpload={handleUploadThumbnail}
      src={selectedProject?.thumbnail ? baseUrl + "/" + selectedProject!.thumbnail : undefined}
    />
  );
};
