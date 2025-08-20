import * as React from "react";
import { Content, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
// import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "~/components/tiptap-ui-primitive/button";
import { Spacer } from "~/components/tiptap-ui-primitive/spacer";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "~/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "~/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "~/components/tiptap-node/list-node/list-node.scss";
import "~/components/tiptap-node/image-node/image-node.scss";
import "~/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { ImageUploadButton } from "~/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "~/components/tiptap-ui/list-dropdown-menu";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "~/components/tiptap-ui/color-highlight-popover";
import { LinkPopover, LinkContent, LinkButton } from "~/components/tiptap-ui/link-popover";
import { MarkButton } from "~/components/tiptap-ui/mark-button";
import { TextAlignButton } from "~/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "~/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "~/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "~/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "~/components/tiptap-icons/link-icon";

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

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} portal={isMobile} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

interface SimpleEditor {
  content?: Content | undefined;
  editable?: boolean;
  onChange?: (content: Content | undefined) => void;
}

export function SimpleEditor({ content, onChange, editable }: SimpleEditor) {
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = React.useState<"main" | "highlighter" | "link">("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const { uploadFile } = useProject();

  /**
   * Handles image upload with progress tracking and abort capability
   * @param file The file to upload
   * @param onProgress Optional callback for tracking upload progress
   * @param abortSignal Optional AbortSignal for cancelling the upload
   * @returns Promise resolving to the URL of the uploaded image
   */
  const handleImageUpload = async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal,
  ): Promise<string> => {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    if (!id) {
      throw new Error("No project id provided");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`);
    }

    // For demo/testing: Simulate upload progress. In production, replace the following code
    // with your own upload implementation.
    for (let progress = 0; progress <= 100; progress += 10) {
      if (abortSignal?.aborted) {
        throw new Error("Upload cancelled");
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      onProgress?.({ progress });
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
      }),
      TextAlign.configure({ types: ["paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      PrefixedImage.configure({
        // inline: true,
        // allowBase64: true, // if needed
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

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
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
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
      </EditorContext.Provider>
    </div>
  );
}
