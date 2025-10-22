import { Section } from "~/components/section";
import { styles } from ".";
import { Outlet } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { useFetchSelectedProject } from "~/pages/project/hooks/use-fetch-selected-project";
import { useProjectNotFoundRedirect } from "~/pages/project/hooks/use-project-not-found-redirect";

export type ProjectMode = "edit" | "view" | "review";

export const Project = () => {
  const { selectedProject, fetched, fetchedUser, notFound } = useFetchSelectedProject();
  useProjectNotFoundRedirect(notFound);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <div className={styles.card}>
          {selectedProject && fetched && fetchedUser ? (
            <Outlet />
          ) : (
            <CircularProgressIndicator size="medium" center />
          )}
        </div>
      </Section>
    </main>
  );
};
