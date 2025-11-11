import { Header } from "./header";
import { ProjectsList } from "./projects-list";
import { styles } from ".";

export const Hero = () => (
  <div className={styles.hero}>
    <Header />
    <ProjectsList />
  </div>
);
