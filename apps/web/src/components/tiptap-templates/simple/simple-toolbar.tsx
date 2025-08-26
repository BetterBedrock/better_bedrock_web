import { Spacer } from "~/components/tiptap-ui-primitive/spacer";
import { ToolbarGroup } from "~/components/tiptap-ui-primitive/toolbar";

import "~/components/tiptap-node/list-node/list-node.scss";
import "~/components/tiptap-node/image-node/image-node.scss";
import "~/components/tiptap-node/paragraph-node/paragraph-node.scss";

import { ImageUploadButton } from "~/components/tiptap-ui/image-upload-button";
import { LinkPopover, LinkButton } from "~/components/tiptap-ui/link-popover";
import { MarkButton } from "~/components/tiptap-ui/mark-button";
import { UndoRedoButton } from "~/components/tiptap-ui/undo-redo-button";
import { ListButton } from "~/components/tiptap-ui/list-button";

interface SimpleToolbarProps {
  isMobile: boolean;
}

export const SimpleToolbar = ({
  isMobile,
}: SimpleToolbarProps) => (
  <>
    <Spacer />

    <ToolbarGroup>
      <UndoRedoButton action="undo" />
      <UndoRedoButton action="redo" />
    </ToolbarGroup>

    <ToolbarGroup>
      {/* <MarkButton type="bulletList" /> */}
      <ListButton type={"bulletList"} text={"Bullet List"} showTooltip={false} />
      {/* <ListDropdownMenu types={["bulletList"]} portal={isMobile} /> */}
    </ToolbarGroup>

    <ToolbarGroup>
      <MarkButton type="bold" />
      <MarkButton type="italic" />
      <MarkButton type="strike" />
      <MarkButton type="underline" />
      <MarkButton type="highlight" />

      {!isMobile ? <LinkPopover /> : <LinkButton />}
    </ToolbarGroup>

    <ToolbarGroup>
      <ImageUploadButton text="Add" />
    </ToolbarGroup>

    <Spacer />
  </>
);
