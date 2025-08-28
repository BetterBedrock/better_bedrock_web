import { ImageUploadButton } from "~/components/text-editor/ui/image-upload-button";
import { LinkPopover } from "~/components/text-editor/ui/link-popover";
import { MarkButton } from "~/components/text-editor/ui/mark-button";
import { UndoRedoButton } from "~/components/text-editor/ui/undo-redo-button";
import { ListButton } from "~/components/text-editor/ui/list-button";

import { styles } from ".";

export const TextEditorToolbar = () => (
  <div className={styles.toolbar}>
    <UndoRedoButton action="undo" />
    <UndoRedoButton action="redo" />

    <ListButton type={"bulletList"} text={"Bullet List"} showTooltip={false} />
    <MarkButton type="bold" />
    <MarkButton type="italic" />
    <MarkButton type="strike" />
    <MarkButton type="underline" />
    <MarkButton type="highlight" />

    <LinkPopover />

    <ImageUploadButton text="Add" />
  </div>
);
