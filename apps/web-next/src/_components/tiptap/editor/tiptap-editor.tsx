"use client";

import {
  Content,
  EditorContent,
  EditorContext,
  useEditor,
} from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";
import { useEffect, useRef, useState } from "react";
import { TextSelection } from "@tiptap/pm/state";
import Heading from "@tiptap/extension-heading";
import { useProject } from "@/_providers/project";
import { baseUrl } from "@/utils/url";
import { ProjectManagerProvider } from "@/app/project/providers/project-manager";
import { DetailedProjectDto } from "@/_lib/api";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { GalleryExtension } from "@/_components/tiptap/nodes/gallery-node";
import { PrefixedImage } from "@/_components/tiptap/nodes/image-node";
import { ImageUploadNode } from "@/_components/tiptap/nodes/image-upload-node";
import { Toolbar } from "@/_components/tiptap/primitive/toolbar";

import { styles, TiptapImageToolbar, TiptapToolbar } from ".";

interface TiptapEditorProps {
  content?: Content | undefined;
  detailedProject: DetailedProjectDto;
  onChange?: (content: Content | undefined) => void;
  onUpload?: () => void;
}

export const TiptapEditor = ({
  content,
  onChange,
  onUpload,
  detailedProject,
}: TiptapEditorProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [imageToolbar, setImageToolbar] = useState(false);

  const { uploadFile } = useProject();

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!detailedProject.id) {
      throw new Error("No project id provided");
    }

    const upload = await uploadFile(detailedProject.id!, file);
    if (!upload) throw new Error("No file returned");
    onUpload?.();

    return upload!.fileUrl;
  };

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editable: true,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: styles.wrapper,
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
      Heading.configure({
        levels: [3],
      }),

      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Highlight.configure({ multicolor: false }),
      PrefixedImage.configure({
        prefix: baseUrl + "/",
      }),
      Typography,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
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
    onCreate: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (!editor || !toolbarRef.current) return;

    const updateToolbarPosition = () => {
      const { state, view } = editor;
      const { from } = state.selection;
      const selection = state.selection;

      const $from = state.doc.resolve(from);
      const indexInParent = $from.index($from.depth - 1);

      const caret = view.coordsAtPos(from);
      const toolbarEl = toolbarRef.current;
      if (!toolbarEl) return;

      if (!(selection instanceof TextSelection)) {
        setImageToolbar(true);
      } else {
        setImageToolbar(false);
      }

      const editorRect = view.dom.getBoundingClientRect();
      const offset = 12;
      const toolbarHeight = toolbarEl.offsetHeight;

      let top = caret.bottom - editorRect.top + offset;

      const maxTop = editorRect.height - toolbarHeight - 8;

      if (top > maxTop && indexInParent > 0) {
        top = caret.top - editorRect.top - toolbarHeight - offset;
      }

      toolbarEl.style.top = `${top}px`;
      toolbarEl.style.visibility = "visible";
    };

    // Update on selection, transactions, scroll, resize
    editor.on("selectionUpdate", updateToolbarPosition);
    editor.on("transaction", updateToolbarPosition);
    window.addEventListener("scroll", updateToolbarPosition, true);
    window.addEventListener("resize", updateToolbarPosition);

    updateToolbarPosition();

    return () => {
      editor.off("selectionUpdate", updateToolbarPosition);
      editor.off("transaction", updateToolbarPosition);
      window.removeEventListener("scroll", updateToolbarPosition, true);
      window.removeEventListener("resize", updateToolbarPosition);
    };
  }, [editor, toolbarRef]);

  return (
    <div className={styles.editor}>
      {isLoading && <CircularProgressIndicator size="medium" center />}
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef}>
          {imageToolbar ? <TiptapImageToolbar /> : <TiptapToolbar />}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className={styles.content}
        />
      </EditorContext.Provider>
    </div>
  );
};
