import { useState } from "react";
import { MainArchiveButton, MainItemsList } from "./main";
import { styles, DownloadsHeading, DOWNLOAD_LIST } from ".";

export const DownloadsMain = () => {
  const [showArchived, setShowArchived] = useState(false);

  const archivedCategory = DOWNLOAD_LIST.find((c) => c.title === "Archived");
  const visibleCategories = showArchived
    ? DOWNLOAD_LIST
    : DOWNLOAD_LIST.filter((c) => c.title !== "Archived");

  return (
    <>
      {visibleCategories.map((category) => (
        <div className={styles.category}>
          <DownloadsHeading title={category.title} description={category.description} />
          <MainItemsList category={category} />
        </div>
      ))}

      {archivedCategory && (
        <MainArchiveButton showArchived={showArchived} setShowArchived={setShowArchived} />
      )}
    </>
  );
};
