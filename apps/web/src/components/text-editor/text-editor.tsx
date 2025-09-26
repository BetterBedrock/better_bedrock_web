import { Content, EditorContent, EditorContext, useEditor } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";
import { Toolbar } from "~/components/text-editor/primitive/toolbar";
import { ImageUploadNode } from "~/components/text-editor/nodes/image-upload-node/image-upload-node-extension";
import { MAX_FILE_SIZE } from "~/lib/tiptap-utils";
import { styles } from ".";
import { PrefixedImage } from "~/components/text-editor/nodes/image-node/prefixed-image-node";
import { baseUrl } from "~/utils/url";
import { useParams } from "react-router-dom";
import { useProject } from "~/providers/project";
import { TextEditorToolbar } from "~/components/text-editor/text-editor-toolbar";
import { useRef } from "react";
import { GalleryExtension } from "~/components/text-editor/nodes/gallery-node/gallery-node-extension";

interface TextEditorProps {
  content?: Content | undefined;
  editable?: boolean;
  onChange?: (content: Content | undefined) => void;
  onUpload?: () => void;
}

export const TextEditor = ({ content, onChange, onUpload, editable }: TextEditorProps) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const { file: id } = useParams();
  const { uploadFile } = useProject();

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!id) {
      throw new Error("No project id provided");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`);
    }

    const upload = await uploadFile(id!, file);
    onUpload?.();

    return upload!.fileUrl;
  };

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editable: editable,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
        orderedList: false,
      }),
      TextAlign.configure({ types: ["paragraph"] }),
      Highlight.configure({ multicolor: false }),
      PrefixedImage.configure({
        prefix: baseUrl + "/",
      }),
      Typography,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      GalleryExtension,
    ],
    content,
    onUpdate: (data) => {
      onChange?.(data.editor.getJSON());
    },
  });

  return (
    <div className={styles.editor}>
      <EditorContext.Provider value={{ editor }}>
        {editable && (
          <Toolbar ref={toolbarRef}>
            <TextEditorToolbar />
          </Toolbar>
        )}

        <EditorContent editor={editor} role="presentation" className={styles.content} />
      </EditorContext.Provider>
    </div>
  );
};
