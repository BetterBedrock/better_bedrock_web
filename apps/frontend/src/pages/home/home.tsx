import { Hero } from "components/home/hero";
import { Creators } from "components/home/creators";
import { About } from "components/home/about";

import styles from "./home.module.css";

export const Home = () => (
  <main id={styles.page_sections}>
    <Hero />
    <About sectionIndex={0} />
    <About sectionIndex={1} />
    <Creators />
  </main>
);
