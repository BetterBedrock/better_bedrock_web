// src/components/GalleryNodeView.tsx
import { useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Gallery } from "~/components/bedrock/gallery";
import { useProject } from "~/providers/project";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { styles } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryNodeView(props: any) {
  const { editor, node, updateAttributes } = props;
  const images = node.attrs.images as string[];
  const maxImages = node.attrs.maxImages as number;
  const [_, setIsEditing] = useState(editor.editable);
  const { uploadFile } = useProject();
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
              const uploadedFile = await uploadFile(selectedProject.id, file);
              return uploadedFile?.fileUrl;
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
