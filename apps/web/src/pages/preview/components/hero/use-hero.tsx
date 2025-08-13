import { useParams } from "react-router-dom";
import { DownloadsItemDto } from "~/lib/api";
import { useContent } from "~/providers/content";

interface UseHeroProps {
  create?: boolean;
}

export const useHero = ({ create }: UseHeroProps) => {
  if (create) {
    return { download: {
      title: "Test",
      creator: "iDarkQ",
      description: "123123",
      downloadId: "test.mcpack",
      buttonType: "white",
      itemWeight: 12,
      imageAssetUrl: [],
    } as DownloadsItemDto };
  }

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
