import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { useProject } from "~/providers/project";
import { useEffect, useState } from "react";
import { SimpleProjectDto } from "~/lib/api";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";

export const Projects = () => {
  const { submittedProjects } = useProject();
  const [projects, setProjects] = useState<SimpleProjectDto[]>();

  useEffect(() => {
    submittedProjects().then((data) => setProjects(data));
  }, []);

  return (
    <main>
      <Section className={styles.background} extraClassName={styles.padding} fixed center>
        <Hero />
        <div className={styles.projects}>
          {projects?.map((project, index) => (
            <GridDownloadCard key={index} project={project} mode="review" />
          ))}
        </div>
      </Section>
    </main>
  );
};
