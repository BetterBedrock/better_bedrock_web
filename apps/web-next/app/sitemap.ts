import { searchProjects } from "@/entities/project";
import { informationData } from "@/pages/information/model/information-data";
import { SimpleProjectDto } from "@/shared/lib/openapi";
import { Routes } from "@/shared/lib/utils";
import dayjs from "dayjs";
import type { MetadataRoute } from "next";

const SITE_URL = "https://betterbedrock.com";

export const revalidate = 60 * 5;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetchPagesData = async () => {
    const projects: SimpleProjectDto[] = [];
    const creators: Set<string> = new Set();

    let page = 1;
    let totalPages = 1;

    do {
      try {
        const { items: nextItems, page: nextPage, totalPages: nextTotalPages } =
          await searchProjects(undefined, undefined, undefined, page);

        projects.push(...nextItems);
        nextItems.forEach((i) => creators.add(i.user.name));

        page = nextPage + 1;
        totalPages = nextTotalPages;
      } catch (err) {
        console.error("Failed to fetch projects for sitemap:", err);
        break;
      }
    } while (page <= totalPages);

    return { creators, projects };
  };


  const data = await fetchPagesData();

  const profileRoutes = Array.from(data.creators).map((creator) => ({
    url: `${SITE_URL}${Routes.PROFILE}/${creator}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  const projectRoutes = data.projects.map((project) => ({
    url: `${SITE_URL}${Routes.PROJECT_PREVIEW}/${project.id}`,
    lastModified: dayjs(project.lastChanged).toDate(),
    changeFrequency: "daily",
    priority: 0.7,
  })) as MetadataRoute.Sitemap;

  const informationRoutes = informationData.map((info) => ({
    url: `${SITE_URL}${Routes.INFORMATION}/${info.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  })) as MetadataRoute.Sitemap;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${SITE_URL}${Routes.DOWNLOADS_BETTERBEDROCK}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${Routes.DOWNLOADS_SIDE_PROJECTS}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${Routes.DOWNLOADS_MAIN}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${Routes.LOGIN}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}${Routes.MONETIZATION}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}${Routes.PRIVACY_POLICY}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${Routes.TERMS}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${Routes.CREATE}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}${Routes.DISCORD}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    },
  ];

  return [...staticRoutes, ...profileRoutes, ...projectRoutes, ...informationRoutes];
}
