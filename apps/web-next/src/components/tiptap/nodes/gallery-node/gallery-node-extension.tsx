import GalleryNodeView from "@/components/tiptap/nodes/gallery-node/gallery-node";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

export interface GalleryOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    gallery: {
      setGallery: (options: {
        images: string[];
        maxImages?: number;
      }) => ReturnType;
    };
  }
}

export const GalleryExtension = Node.create<GalleryOptions>({
  name: "gallery",
  group: "block",
  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      images: { default: [] },
      maxImages: { default: 10 },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="gallery"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-tiptap-placeholder": "gallery",
        "data-type": "gallery",
        "data-images": JSON.stringify(node.attrs.images),
        "data-max-images": node.attrs.maxImages,
      }),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(GalleryNodeView);
  },
  addCommands() {
    return {
      setGallery:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
