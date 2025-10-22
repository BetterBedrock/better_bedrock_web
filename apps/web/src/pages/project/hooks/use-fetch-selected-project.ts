import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";

export const useFetchSelectedProject = () => {
  const { file } = useParams();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[2];
  const { fetched: fetchedUser } = useAuth();
  const { selectedProject, fetched, fetchSelectedProject } = useProjectManager();

  useEffect(() => {
    if (!file || !fetchedUser) return;
    fetchSelectedProject(file, currentPage === "preview" ? false : true);
  }, [file, currentPage, fetchedUser]);

  return {
    selectedProject,
    fetched,
    fetchedUser,
    notFound: fetched && !selectedProject,
  };
};
