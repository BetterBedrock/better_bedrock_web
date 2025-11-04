import { GalleryButton } from "@/_components/tiptap/ui/gallery/gallery-button";
import { HeaderButton } from "@/_components/tiptap/ui/header-button/header-button";
import { ImageUploadButton } from "@/_components/tiptap/ui/image-upload-button";
import { LinkPopover } from "@/_components/tiptap/ui/link-popover";
import { ListButton } from "@/_components/tiptap/ui/list-button";
import { MarkButton } from "@/_components/tiptap/ui/mark-button";
import { UndoRedoButton } from "@/_components/tiptap/ui/undo-redo-button";

import { styles } from ".";

export const TiptapToolbar = () => (
  <div className={styles.toolbar}>
    <UndoRedoButton action="undo" />
    <UndoRedoButton action="redo" />

    <ListButton type="bulletList" text="Bullet List" />
    <MarkButton type="bold" />
    <HeaderButton />
    <MarkButton type="italic" />
    <MarkButton type="strike" />
    <MarkButton type="underline" />
    <MarkButton type="highlight" />

    <LinkPopover />

    <ImageUploadButton />
    <GalleryButton />
  </div>
);
