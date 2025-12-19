import { Section } from "@/components/section";
import { CreatorsModuleList } from "./creators-module-list";
import styles from "./creators.module.scss";

export const Creators = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <CreatorsModuleList />
  </Section>
);
