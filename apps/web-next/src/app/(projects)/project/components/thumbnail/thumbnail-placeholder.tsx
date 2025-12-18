"use client";

import { ImagePlaceholder } from "@/_components/image-placeholder";
import { useThumbnailUpload } from "@/app/(projects)/project/components/thumbnail/hooks/use-thumbnail-upload";
import { baseUrl } from "@/utils/url";

export const ThumbnailPlaceholder = () => {
  const { selectedProject, handleUploadThumbnail } = useThumbnailUpload();

  return (
    <ImagePlaceholder
      onUpload={handleUploadThumbnail}
      src={
        selectedProject?.thumbnail
          ? baseUrl + "/" + selectedProject!.thumbnail
          : undefined
      }
    />
  );
};
