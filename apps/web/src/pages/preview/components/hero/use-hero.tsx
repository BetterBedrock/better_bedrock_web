import { useParams } from "react-router-dom";
import { useContent } from "~/providers/content";

export const useHero = () => {
  const { downloads, fetched } = useContent();
  const params = useParams();
  const downloadId = params.file;

  const download = downloads?.categories
    .flatMap((category) => category.lists)
    .flatMap((list) => list.items)
    .find(
      (item) =>
        item.downloadId === downloadId && (item.richDescription || item.imageAssetUrl.length > 1),
    );

  return { download, downloads, fetched };
};
