import { useEffect, useRef, useState } from "react";
import { MainArchiveButton, MainItemsList, styles } from ".";
import { Heading } from "~/pages/downloads/components/heading";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { MAIN_LIST } from "~/assets/content/better-bedrock";
import { useProject } from "~/providers/project";
import { SimpleProjectDto } from "~/lib/api";
import { DownloadsListDto } from "~/assets/content/dto/downloads-list.dto";
import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const BetterBedrock = () => {
  const { fetchProjectsBasicInfo } = useProject();

  const [showArchived, setShowArchived] = useState(false);
  const [simpleCategories, setSimpleCategories] = useState<SimpleCategory[]>([]);

  const hasFetched = useRef(false); // <-- Add this ref

  const navigate = useNavigate();
  const categoryDownloads = MAIN_LIST;

  const visibleCategories = showArchived
    ? categoryDownloads.lists
    : categoryDownloads.lists.filter((c) => c.title !== "Archived");

  const handleSetActiveTab = (tab: string) => {
    navigate(Routes.DOWNLOADS_MAIN + "/" + tab);
  };

  useEffect(() => {
    if (hasFetched.current) return; // <-- Prevent double call
    hasFetched.current = true;
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    visibleCategories.map(async (category) => {
      const ids = category.items.map((item) => item.projectId);

      const data = await fetchProjectsBasicInfo(ids);
      if (!data || data.length < 1) return;

      setSimpleCategories((prev) => [
        ...prev,
        { ...category, categoryItems: category.items, items: data },
      ]);
    });
  };

  if (!categoryDownloads) {
    return;
  }

  const archivedCategory = simpleCategories.find((c) => c.title === "Archived");

  return (
    <>
      {simpleCategories.map((category) => (
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
