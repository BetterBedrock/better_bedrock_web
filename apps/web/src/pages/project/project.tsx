import { Section } from "~/components/section";
import { styles } from ".";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { Routes } from "~/utils/routes";
import { useNotification } from "~/providers/notification";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { useEffect } from "react";

export type ProjectMode = "edit" | "view" | "review";

export const Project = () => {
  const { file } = useParams();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[2];

  const navigate = useNavigate();
  const { throwError } = useNotification();
  const { selectedProject, fetched, fetchSelectedProject } = useProjectManager();

  useEffect(() => {
    if (!file) return;
    fetchSelectedProject(file, currentPage === "preview" ? false : true);
  }, [file, currentPage]);

  if (fetched && !selectedProject) {
    navigate(Routes.HOME);
    throwError(null, "Project with this id does not exist");
  }
  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <div className={styles.card}>
          {selectedProject && fetched ? (
            <Outlet />
          ) : (
            <CircularProgressIndicator size="medium" center />
          )}
        </div>
      </Section>
    </main>
  );
};
