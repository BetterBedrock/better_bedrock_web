import { useState } from "react";
import { MainActions, MainArchiveButton, MainItemsList, styles } from ".";
import { useContent } from "~/providers/content";
import { Heading } from "~/pages/downloads/components/heading";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "~/utils/routes";

export const Main = () => {
  const { downloads, fetched } = useContent();
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const categoryDownloads = downloads?.categories.find((c) => c.id === category);

  if (!fetched || !categoryDownloads) {
    return;
  }

  const archivedCategory = categoryDownloads.lists.find((c) => c.title === "Archived");
  const visibleCategories = showArchived
    ? categoryDownloads.lists
    : categoryDownloads.lists.filter((c) => c.title !== "Archived");

  const handleSetActiveTab = (tab: string) => {
    navigate(Routes.DOWNLOADS + "/" + tab);
  };

  return (
    <>
      {visibleCategories.map((category) => (
        <div key={category.title} className={styles.category}>
          <Heading title={category.title} description={category.description} />
          <MainActions buttons={category.buttons} />
          <MainItemsList categoryId={categoryDownloads.id} category={category} />
        </div>
      ))}

      <div className={styles.footer}>
        {archivedCategory && (
          <MainArchiveButton
            showArchived={showArchived}
            setShowArchived={setShowArchived}
            setActiveTab={handleSetActiveTab}
          />
        )}
      </div>
    </>
  );
};
