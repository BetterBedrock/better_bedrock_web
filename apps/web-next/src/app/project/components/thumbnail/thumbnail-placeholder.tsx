"use client";

import { ImagePlaceholder } from "@/_components/image-placeholder";
import { useThumbnailUpload } from "@/app/project/components/thumbnail/hooks";
import { baseUrl } from "@/utils/url";

export const ThumbnailPlaceholder = () => {
  const { selectedProject, handleUploadThumbnail } = useThumbnailUpload();

  return (
    <ImagePlaceholder
      onUpload={handleUploadThumbnail}
      src={selectedProject?.thumbnail ? baseUrl + "/" + selectedProject!.thumbnail : undefined}
    />
  );
};
