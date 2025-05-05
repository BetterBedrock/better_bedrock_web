import { useState } from "react";
import { MainArchiveButton, MainItemsList, styles } from ".";
import { useContent } from "~/providers/content";
import CircularProgressIndicator from "~/components/bedrock/CircularProgressIndicator";
import { Heading } from "~/pages/downloads/components/heading";

export const Main = () => {
  const { downloads, fetched } = useContent();
  const [showArchived, setShowArchived] = useState(false);

  const archivedCategory = downloads.find((c) => c.title === "Archived");
  const visibleCategories = showArchived
    ? downloads
    : downloads.filter((c) => c.title !== "Archived");

  if (!fetched) {
    return <CircularProgressIndicator width="50px" height="50px" />;
  }
  return (
    <>
      {visibleCategories.map((category) => (
        <div className={styles.category}>
          <Heading title={category.title} description={category.description} />
          <MainItemsList category={category} />
        </div>
      ))}

      {archivedCategory && (
        <MainArchiveButton showArchived={showArchived} setShowArchived={setShowArchived} />
      )}
    </>
  );
};
