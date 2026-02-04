import { fetchProjectsBasicInfo } from "@/entities/project";
import { SimpleProjectDto } from "@/shared/lib/openapi";
import { SIDE_PROJECTS_LIST } from "@/public/content/better-bedrock";

export const loadDownloadsSideProjectsPageData = async (): Promise<
  SimpleProjectDto[]
> => {
  const data = await fetchProjectsBasicInfo(SIDE_PROJECTS_LIST);

  if (!data || data.length < 1) {
    return [];
  }

  const sortedData = data.sort((a, b) => {
    return SIDE_PROJECTS_LIST.indexOf(a.id) - SIDE_PROJECTS_LIST.indexOf(b.id);
  });

  return sortedData;
};
