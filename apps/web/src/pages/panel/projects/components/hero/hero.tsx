import { styles } from ".";
import { ProjectsList } from "~/pages/panel/projects/components/hero/projects-list";
import { Header } from "~/pages/panel/projects/components/hero/header";

export const Hero = () => (
  <div className={styles.hero}>
    <Header />
    <ProjectsList />
  </div>
);
