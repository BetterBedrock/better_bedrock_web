"use client";

import { Content, JSONContent } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Selection } from "@tiptap/extensions";
import { GalleryExtension } from "@/components/tiptap/nodes/gallery-node";
import { renderToHTMLString } from "@tiptap/static-renderer";
import { PrefixedImage } from "@/components/tiptap/nodes/image-node";
import { DetailedProjectDto } from "@/lib/api";
import Heading from "@tiptap/extension-heading";
import { baseUrl } from "@/utils/url";

import { styles, useTiptapPreviewHydrator } from ".";
// eslint-disable-next-line boundaries/element-types
import { ProjectManagerProvider } from "@/features/project/providers/project-manager";
import { validateTiptapContent } from "@/utils/tiptap";

interface TiptapPreviewProps {
  content?: Content;
  detailedProject: DetailedProjectDto;
}

export const TiptapPreview = ({
  content,
  detailedProject,
}: TiptapPreviewProps) => {
  const safeContent = validateTiptapContent(content);

  const html = renderToHTMLString({
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
        orderedList: false,
      }),
      Heading.configure({
        levels: [3],
      }),
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Highlight.configure({ multicolor: false }),
      PrefixedImage.configure({
        prefix: baseUrl + "/",
      }),
      Typography,
      Selection,
      GalleryExtension,
    ],
    content: safeContent as JSONContent,
  });

  const children = useTiptapPreviewHydrator({ html });

  return (
    <ProjectManagerProvider detailedProject={detailedProject}>
      <div className={styles.content}>{children}</div>
    </ProjectManagerProvider>
  );
};
