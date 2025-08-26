import * as React from "react";
import { Content, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Toolbar } from "~/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "~/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "~/components/tiptap-node/list-node/list-node.scss";
import "~/components/tiptap-node/image-node/image-node.scss";
import "~/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Hooks ---
import { useIsMobile } from "~/hooks/use-mobile";
import { useWindowSize } from "~/hooks/use-window-size";
import { useCursorVisibility } from "~/hooks/use-cursor-visibility";

// --- Lib ---
import { MAX_FILE_SIZE } from "~/lib/tiptap-utils";

// --- Styles ---
import "~/components/tiptap-templates/simple/simple-editor.scss";
import { PrefixedImage } from "~/components/tiptap-node/image-node/prefixed-image-node";
import { baseUrl } from "~/utils/url";
import { useParams } from "react-router-dom";
import { useProject } from "~/providers/project";
import { SimpleToolbar } from "~/components/tiptap-templates/simple/simple-toolbar";

interface SimpleEditor {
  content?: Content | undefined;
  editable?: boolean;
  onChange?: (content: Content | undefined) => void;
}

export function SimpleEditor({ content, onChange, editable }: SimpleEditor) {
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const toolbarRef = React.useRef<HTMLDivElement>(null);

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
    ],
    content,
    onUpdate: (data) => {
      onChange?.(data.editor.getJSON());
    },
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  // React.useEffect(() => {
  //   if (!isMobile && mobileView !== "main") {
  //     setMobileView("main");
  //   }
  // }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        {editable && (
          <Toolbar
            ref={toolbarRef}
            style={{
              ...(isMobile
                ? {
                    bottom: `calc(100% - ${height - rect.y}px)`,
                  }
                : {}),
            }}
          >
            <SimpleToolbar
              isMobile={isMobile}
            />
          </Toolbar>
        )}

        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
      </EditorContext.Provider>
    </div>
  );
}
