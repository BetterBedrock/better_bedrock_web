import { Header } from "./header/header";
import { ProjectsList } from "./projects-list/projects-list";
import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.hero}>
    <Header />
    <ProjectsList />
  </div>
);
