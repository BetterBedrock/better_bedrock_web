import { fetchProjectsBasicInfo } from "@/entities/project/api/fetch-projects-basic-info";
import { SimpleCategory } from "@/shared/model/simple-category";
import { MAIN_LIST } from "@/public/content/better-bedrock";

interface LoadDownloadsBetterBedrockPageDataProps {
  loadedParams?: { archived?: boolean };
}

export const loadDownloadsBetterBedrockPageData = async ({
  loadedParams,
}: LoadDownloadsBetterBedrockPageDataProps): Promise<SimpleCategory[]> => {
  const categoryDownloads = MAIN_LIST;
  const visibleCategories = loadedParams?.archived
    ? categoryDownloads.lists
    : categoryDownloads.lists.filter((c) => c.title !== "Archived");

  const fetchProjects = async () => {
    const categories: SimpleCategory[] = [];

    for (const category of visibleCategories) {
      const ids = category.items.map((item) => item.projectId);
      const data = await fetchProjectsBasicInfo(ids);
      if (!data || data.length < 1) continue;

      const sortedData = data.sort((a, b) => {
        return ids.indexOf(a.id) - ids.indexOf(b.id);
      });

      categories.push({
        ...category,
        categoryItems: category.items,
        items: sortedData,
      });
    }

    return categories;
  };

  const simpleCategories = await fetchProjects();

  return simpleCategories;
};
