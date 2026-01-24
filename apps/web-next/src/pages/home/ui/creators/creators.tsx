import { Section } from "@/shared/ui/section";
import { CreatorsModuleList } from "./creators-module-list";
import styles from "./creators.module.scss";

export const Creators = () => (
  <Section
    extraClassName={styles.padding}
    center
    dark
    gradientBackground={false}
    src="/images/crosshair_backgrounds/10.webp"
  >
    <CreatorsModuleList />
  </Section>
);
