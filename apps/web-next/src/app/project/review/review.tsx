import { CardPreview, Description, DownloadButton, Header } from "~/pages/project/components";
import { useReviewAccess } from ".";

export const Review = () => {
  const { hasAccess } = useReviewAccess();

  if (!hasAccess) {
    return null;
  }

  return (
    <>
      <Header mode="view" />
      <Description mode="view" />
      <DownloadButton />
      <CardPreview />
    </>
  );
};
