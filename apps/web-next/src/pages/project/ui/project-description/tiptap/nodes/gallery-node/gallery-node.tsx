"use client";

import { useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { styles } from ".";
import { Gallery } from "@/pages/project/ui/project-description/tiptap/gallery";
import { useNotification } from "@/app/providers/notification";
import { uploadFile } from "@/entities/project";
import { useProjectManager } from "@/app/providers/project-manager";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryNodeView(props: any) {
  const { editor, node, updateAttributes } = props;
  const { throwError, sendNotification } = useNotification();

  const images = node.attrs.images as string[];
  const maxImages = node.attrs.maxImages as number;
  const [_, setIsEditing] = useState(editor.editable);
  const { selectedProject } = useProjectManager();

  return (
    <NodeViewWrapper className="tiptap-gallery-node">
      <Gallery
        images={images}
        show={true}
        className={styles.gallery}
        edit={editor.view.editable}
        onClose={() => setIsEditing(false)}
        onDeleteImage={(index) => {
          updateAttributes({ images: images.filter((_, i) => i !== index) });
        }}
        onAddImages={async (files) => {
          if (!selectedProject) return;

          const urls = await Promise.all(
            Array.from(files).map(async (file) => {
              const { data, error } = await uploadFile(
                selectedProject.id,
                file,
              );
              if (error) {
                throwError(null, error);
                return;
              }

              sendNotification({
                title: "Uploaded",
                label: "Successfully uploaded photo",
                type: "success",
              });

              return data.fileUrl;
            }),
          );

          const validUrls = urls.filter(Boolean) as string[];
          const next = images.concat(validUrls).slice(0, maxImages);
          updateAttributes({ images: next });
        }}
        maxImages={maxImages}
      />
    </NodeViewWrapper>
  );
}
