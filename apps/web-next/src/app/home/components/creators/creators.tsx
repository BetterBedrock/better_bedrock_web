import { Section } from "@/app/_components/section";
import { styles, CreatorsModuleList } from ".";

export const Creators = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <CreatorsModuleList />
  </Section>
);
