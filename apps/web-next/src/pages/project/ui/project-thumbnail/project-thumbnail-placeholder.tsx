"use client";

import { ImagePlaceholder } from "@/shared/ui/image-placeholder";
import { useThumbnailUpload } from "@/pages/project/model/use-thumbnail-upload";
import { baseUrl } from "@/shared/lib/utils";

export const ProjectThumbnailPlaceholder = () => {
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
