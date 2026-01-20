import { HeroDescription } from "./header/header-description";
import { HeroActions } from "./header/header-actions";
import { HeroTitle } from "./header/header-title";
import styles from "./hero.module.scss";
import { PartnerImage } from "@/shared/ui/partner-image/partner-image";

export const HeroHeader = () => (
  <div className={styles.header}>
    <HeroTitle />
    <HeroDescription />
    <HeroActions />
    <PartnerImage />
  </div>
);
