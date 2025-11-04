"use client";

import { useContext } from "react";
import { EditorContext } from "@tiptap/react";
import ImageGalleryIcon from "@/public/ui/tiptap-icons/18.png";
import { ToolbarButton } from "@/_components/tiptap/primitive/toolbar-button";
import { TiptapIcon } from "@/_components/tiptap/tiptap-icon";

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
        <TiptapIcon icon={ImageGalleryIcon.src} className="tiptap-button-icon" />
      </ToolbarButton>
    </>
  );
};
