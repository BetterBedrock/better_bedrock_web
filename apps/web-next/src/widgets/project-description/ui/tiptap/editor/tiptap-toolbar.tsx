import { GalleryButton } from "@/widgets/project-description/ui/tiptap/ui/gallery/gallery-button";
import { HeaderButton } from "@/widgets/project-description/ui/tiptap/ui/header-button/header-button";
import { ImageUploadButton } from "@/widgets/project-description/ui/tiptap/ui/image-upload-button";
import { LinkPopover } from "@/widgets/project-description/ui/tiptap/ui/link-popover";
import { ListButton } from "@/widgets/project-description/ui/tiptap/ui/list-button";
import { MarkButton } from "@/widgets/project-description/ui/tiptap/ui/mark-button";
import { UndoRedoButton } from "@/widgets/project-description/ui/tiptap/ui/undo-redo-button";

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
