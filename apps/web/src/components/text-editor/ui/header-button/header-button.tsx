// src/components/text-editor/ui/gallery-button.tsx
import React, { useContext } from "react";
import { EditorContext } from "@tiptap/react";
import HeaderIcon from "~/assets/images/header.webp";
import { ToolbarButton } from "~/components/text-editor/primitive/toolbar-button";
import { TiptapIcon } from "~/components/text-editor/tiptap-icon";

export const HeaderButton = () => {
  const { editor } = useContext(EditorContext);

  const handleDelete = () => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  return (
    <>
      <ToolbarButton
        type="button"
        role="button"
        tabIndex={-1}
        onClick={handleDelete}
        tooltip="Header"
      >
        <TiptapIcon icon={HeaderIcon} className="tiptap-button-icon" />
      </ToolbarButton>
    </>
  );
};
