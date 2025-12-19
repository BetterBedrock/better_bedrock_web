import { GalleryButton } from "@/components/tiptap/ui/gallery/gallery-button";
import { HeaderButton } from "@/components/tiptap/ui/header-button/header-button";
import { ImageUploadButton } from "@/components/tiptap/ui/image-upload-button";
import { LinkPopover } from "@/components/tiptap/ui/link-popover";
import { ListButton } from "@/components/tiptap/ui/list-button";
import { MarkButton } from "@/components/tiptap/ui/mark-button";
import { UndoRedoButton } from "@/components/tiptap/ui/undo-redo-button";

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
