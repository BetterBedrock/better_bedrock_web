import { fetchUserProjects } from "@/features/project/server/fetch-user-projects";
import { fetchUserByName } from "@/lib/user";
import { notFound } from "next/navigation";

export const loadProfileProjectsPageData = async (
  params?: Promise<{ name: string }>
) => {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const name = loadedParams.name;

  const user = await fetchUserByName(name);
  if (!user) {
    notFound();
  }

  const projects = await fetchUserProjects(user.id);
  
  return projects;
};
