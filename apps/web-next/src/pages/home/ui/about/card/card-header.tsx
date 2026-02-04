import { CardDescription } from "./card-description";
import { CardTitle } from "./card-title";
import { AboutSectionElement } from "../about-data";

import styles from "./card.module.scss";

interface CardHeaderProps {
  item: AboutSectionElement;
}

export const CardHeader = ({ item }: CardHeaderProps) => (
  <div className={styles.content}>
    <CardTitle title={item.title} />
    <CardDescription description={item.description} />
  </div>
);