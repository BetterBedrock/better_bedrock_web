import { getSchema, JSONContent } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";
import { GalleryExtension } from "@/components/tiptap/nodes/gallery-node";
import { PrefixedImage } from "@/components/tiptap/nodes/image-node";
import Heading from "@tiptap/extension-heading";

const schema = getSchema([
    StarterKit.configure({
        heading: false,
        code: false,
        horizontalRule: false,
        orderedList: false,
    }),
    Heading.configure({ levels: [3] }),
    TextAlign.configure({ types: ["paragraph", "heading"] }),
    Highlight,
    PrefixedImage,
    Typography,
    Selection,
    GalleryExtension,
]);

export const validateTiptapContent = (content: unknown): JSONContent => {
    try {
        const node = schema.nodeFromJSON(content as JSONContent);
        return node.toJSON();
    } catch (_) {
        return {
            type: "doc",
            content: [{ type: "paragraph" }],
        };
    }
}
