import { SimpleProjectDto } from "@/_lib/api";
import { Heading } from "@/app/downloads/components/heading";
import { DownloadsItemDto } from "@/public/content/dto/downloads-item.dto";
import { DownloadsListDto } from "@/public/content/dto/downloads-list.dto";

import {
  BetterBedrockArchiveButton,
  BetterBedrockItemsList,
  BetterBedrockBanner,
  styles,
} from ".";
import { fetchProjectsBasicInfo } from "@/_lib/projects/fetch-projects-basic-info";
import { MAIN_LIST } from "@/public/content/better-bedrock";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export interface BetterBedrockProps {
  searchParams?: Promise<{ archived?: boolean }>;
}

export const revalidate = 300;

export default async function BetterBedrock({
  searchParams,
}: BetterBedrockProps) {
  const loadedParams = await searchParams;
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

      categories.push({
        ...category,
        categoryItems: category.items,
        items: data,
      });
    }

    return categories;
  };

  const simpleCategories = await fetchProjects();

  if (simpleCategories.length < 1) {
    return <BetterBedrockBanner />;
  }

  const archivedCategory = simpleCategories.find((c) => c.title === "Archived");

  return (
    <>
      {simpleCategories.map((category) => (
        <div key={category.title} className={styles.category}>
          <Heading title={category.title} description={category.description} />
          <BetterBedrockItemsList
            categoryId={categoryDownloads.id}
            category={category}
          />
        </div>
      ))}

      {archivedCategory && (
        <div className={styles.footer}>
          <BetterBedrockArchiveButton searchParams={loadedParams} />
        </div>
      )}
    </>
  );
}
