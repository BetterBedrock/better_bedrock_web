"use client";

import { useContext } from "react";
import { EditorContext } from "@tiptap/react";
import HeaderIcon from "@/public/images/header.webp";
import { ToolbarButton } from "@/pages/project/ui/project-description/tiptap/primitive/toolbar-button";
import { TiptapIcon } from "@/pages/project/ui/project-description/tiptap/tiptap-icon";

export const HeaderButton = () => {
  const { editor } = useContext(EditorContext);

  const handleDelete = () => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: 3 }).run();
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
        <TiptapIcon icon={HeaderIcon.src} className="tiptap-button-icon" />
      </ToolbarButton>
    </>
  );
};
