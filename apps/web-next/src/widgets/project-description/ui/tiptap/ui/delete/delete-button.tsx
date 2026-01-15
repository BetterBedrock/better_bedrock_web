import { useContext } from "react";
import { EditorContext } from "@tiptap/react";
import TrashIcon from "@/public/images/trash.png";
import { ToolbarButton } from "@/widgets/project-description/ui/tiptap/primitive/toolbar-button";
import { TiptapIcon } from "@/widgets/project-description/ui/tiptap/tiptap-icon";

export const DeleteButton = () => {
  const { editor } = useContext(EditorContext);

  const handleDelete = () => {
    if (!editor) return;
    editor.chain().focus().deleteSelection().run();
  };

  return (
    <>
      <ToolbarButton
        type="button"
        role="button"
        tabIndex={-1}
        onClick={handleDelete}
        tooltip="Delete"
      >
        <TiptapIcon icon={TrashIcon.src} className="tiptap-button-icon" />
        <span className="tiptap-button-text">Delete</span>
      </ToolbarButton>
    </>
  );
};
