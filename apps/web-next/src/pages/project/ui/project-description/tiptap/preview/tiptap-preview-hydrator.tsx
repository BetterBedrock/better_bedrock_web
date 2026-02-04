"use client";

import parse from "html-react-parser";
import { Gallery } from "@/pages/project/ui/project-description/tiptap/gallery";
import { styles as galleryStyles } from "../nodes/gallery-node";

interface UseTiptapPreviewHydratorProps {
  html: string;
}

export const useTiptapPreviewHydrator = ({
  html,
}: UseTiptapPreviewHydratorProps) => {
  const options = {
    replace: (domNode: any) => {
      if (
        domNode.name === "div" &&
        domNode.attribs?.["data-tiptap-placeholder"] === "gallery"
      ) {
        const images = JSON.parse(domNode.attribs["images"] || "[]");

        return (
          <Gallery
            images={images}
            show={true}
            className={galleryStyles.gallery}
          />
        );
      }
    },
  };

  return <>{parse(html, options)}</>;
};
