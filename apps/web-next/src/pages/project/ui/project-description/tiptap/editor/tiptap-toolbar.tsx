import { GalleryButton } from "@/pages/project/ui/project-description/tiptap/components/gallery/gallery-button";
import { HeaderButton } from "@/pages/project/ui/project-description/tiptap/components/header-button/header-button";
import { ImageUploadButton } from "@/pages/project/ui/project-description/tiptap/components/image-upload-button";
import { LinkPopover } from "@/pages/project/ui/project-description/tiptap/components/link-popover";
import { ListButton } from "@/pages/project/ui/project-description/tiptap/components/list-button";
import { MarkButton } from "@/pages/project/ui/project-description/tiptap/components/mark-button";
import { UndoRedoButton } from "@/pages/project/ui/project-description/tiptap/components/undo-redo-button";

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
