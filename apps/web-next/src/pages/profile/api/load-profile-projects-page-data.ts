import { fetchUserProjects } from "@/entities/project";
import { fetchUserByName } from "@/entities/user";
import { notFound } from "next/navigation";

export const loadProfileProjectsPageData = async (
  params?: Promise<{ name: string }>,
) => {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const name = decodeURIComponent(loadedParams.name);

  const user = await fetchUserByName(name);
  if (!user) {
    notFound();
  }

  const projects = await fetchUserProjects(user.id);

  return projects;
};
