import { useState } from "react";
import { MainArchiveButton, MainItemsList, styles } from ".";
import { Heading } from "~/pages/downloads/components/heading";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { MAIN_LIST } from "~/assets/content/better-bedrock";

export const BetterBedrock = () => {
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();
  const categoryDownloads = MAIN_LIST;

  if (!categoryDownloads) {
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
          {/* <MainActions buttons={category.buttons} /> */}
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
