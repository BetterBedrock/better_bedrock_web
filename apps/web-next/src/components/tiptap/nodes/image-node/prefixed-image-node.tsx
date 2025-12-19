import Image, { ImageOptions } from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";
import {styles} from ".";

interface PrefixedImageOptions extends ImageOptions {
  prefix: string;
}

export const PrefixedImage = Image.extend<PrefixedImageOptions>({
  name: "image",

  addOptions() {
    const parentOptions = this.parent?.() ?? ({} as ImageOptions);

    return {
      ...parentOptions,
      inline: parentOptions.inline ?? false,
      allowBase64: parentOptions.allowBase64 ?? false,
      HTMLAttributes: parentOptions.HTMLAttributes ?? {},
      prefix: "",
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    const { src, ...rest } = HTMLAttributes;
    const prefix = this.options.prefix;
    const prefixedSrc =
      typeof src === "string" && !src.startsWith("http") ? `${prefix}${src}` : src;

    return ["img", mergeAttributes(rest, { src: prefixedSrc, class: styles.image })];
  },
});
