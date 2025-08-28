import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { ImagePlaceholder } from "~/components/image-placeholder";
import { styles, useFileUpload } from ".";

export const ImageUploadNodeComponent = (props: NodeViewProps) => {
  const { handleUpload, handleClick } = useFileUpload({ props });

  return (
    <NodeViewWrapper className={styles.upload} tabIndex={0} onClick={handleClick}>
      <ImagePlaceholder
        placeholder="Click to upload image"
        onUpload={(file) => handleUpload([file])}
      />
    </NodeViewWrapper>
  );
};
