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
import { Banner } from "~/components/bedrock/banner";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const BetterBedrock = () => {
  const { fetchProjectsBasicInfo } = useProject();

  const [showArchived, setShowArchived] = useState(false);
  const [simpleCategories, setSimpleCategories] = useState<SimpleCategory[] | undefined>();

  const hasFetched = useRef(false);

  const navigate = useNavigate();
  const categoryDownloads = MAIN_LIST;

  const visibleCategories = showArchived
    ? categoryDownloads.lists
    : categoryDownloads.lists.filter((c) => c.title !== "Archived");

  const handleSetActiveTab = (tab: string) => {
    navigate(Routes.DOWNLOADS_MAIN + "/" + tab);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const categories: SimpleCategory[] = [];

    for (const category of visibleCategories) {
      const ids = category.items.map((item) => item.projectId);
      const data = await fetchProjectsBasicInfo(ids);
      if (!data || data.length < 1) continue;

      categories.push({
        ...category,
        categoryItems: category.items,
        items: data,
      });
    }

    setSimpleCategories(categories);
  };

  if (!simpleCategories || !categoryDownloads) {
    return <CircularProgressIndicator size="medium" />;
  }

  if (simpleCategories.length < 1) {
    return (
      <Banner
        type="info"
        message="Better Bedrock content is not yet prepared, please wait a while and refresh this site."
      />
    );
  }

  const archivedCategory = simpleCategories.find((c) => c.title === "Archived");

  return (
    <>
      {simpleCategories.map((category) => (
        <div key={category.title} className={styles.category}>
          <Heading title={category.title} description={category.description} />
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
