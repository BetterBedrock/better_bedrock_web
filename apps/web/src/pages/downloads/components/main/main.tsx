import { useState } from "react";
import { MainArchiveButton, MainItemsList, styles } from ".";
import { useContent } from "~/providers/content";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Heading } from "~/pages/downloads/components/heading";
import { DownloadsDto } from "~/lib/api";

interface TabsProps {
  setActiveTab: (tab: keyof DownloadsDto) => void;
}

export const Main = ({ setActiveTab }: TabsProps) => {
  const { downloads, fetched } = useContent();
  const [showArchived, setShowArchived] = useState(false);

  if (!fetched) {
    return <CircularProgressIndicator size="medium" />;
  }

  const mainDownloads = downloads!.main;
  const archivedCategory = mainDownloads.find((c) => c.title === "Archived");
  const visibleCategories = showArchived
    ? mainDownloads
    : mainDownloads.filter((c) => c.title !== "Archived");

  return (
    <>
      {visibleCategories.map((category) => (
        <div className={styles.category}>
          <Heading title={category.title} description={category.description} />
          <MainItemsList category={category} />
        </div>
      ))}

      {archivedCategory && (
        <MainArchiveButton showArchived={showArchived} setShowArchived={setShowArchived} setActiveTab={setActiveTab}/>
      )}
    </>
  );
};
