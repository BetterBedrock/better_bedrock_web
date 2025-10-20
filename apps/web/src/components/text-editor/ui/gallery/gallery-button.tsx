import { useContext } from "react";
import { EditorContext } from "@tiptap/react";
import ImageGalleryIcon from "~/assets/ui/tiptap-icons/18.png";
import { ToolbarButton } from "~/components/text-editor/primitive/toolbar-button";
import { TiptapIcon } from "~/components/text-editor/tiptap-icon";

export const GalleryButton = () => {
  const { editor } = useContext(EditorContext);

  const handleCreateGallery = () => {
    if (!editor) return;
    editor.chain().focus().setGallery({ images: [] }).run();
  };

  const isActive = !editor?.can().setGallery({ images: [] });

  return (
    <>
      <ToolbarButton
        type="button"
        data-active-state={isActive ? "on" : "off"}
        role="button"
        tabIndex={-1}
        aria-pressed={isActive}
        onClick={handleCreateGallery}
        tooltip="Add gallery"
      >
        <TiptapIcon icon={ImageGalleryIcon} className="tiptap-button-icon" />
      </ToolbarButton>
    </>
  );
};
