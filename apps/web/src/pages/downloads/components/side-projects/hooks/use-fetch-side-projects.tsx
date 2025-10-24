import { useState, useRef, useEffect } from "react";
import { SIDE_PROJECTS_LIST } from "~/assets/content/better-bedrock";
import { SimpleProjectDto } from "~/lib/api";
import { useProject } from "~/providers/project";

export const useFetchSideProjects = () => {
  const { fetchProjectsBasicInfo } = useProject();

  const [projects, setProjects] = useState<SimpleProjectDto[] | undefined>();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setProjects(await fetchProjectsBasicInfo(SIDE_PROJECTS_LIST));
  };

  return projects;
};
