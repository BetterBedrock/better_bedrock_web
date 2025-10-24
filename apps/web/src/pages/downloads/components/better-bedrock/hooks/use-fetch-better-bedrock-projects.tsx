import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_LIST } from "~/assets/content/better-bedrock";
import { SimpleCategory } from "~/pages/downloads/components/side-projects";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

export const useFetchBetterBedrockProjects = () => {
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

  return { simpleCategories, categoryDownloads, showArchived, setShowArchived, handleSetActiveTab };
};
