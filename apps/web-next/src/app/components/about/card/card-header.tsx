import { styles, CardDescription, CardTitle } from ".";
import { AboutSectionElement } from "../";

interface CardHeaderProps {
  item: AboutSectionElement;
}

export const CardHeader = ({ item }: CardHeaderProps) => (
  <div className={styles.content}>
    <CardTitle title={item.title} />
    <CardDescription description={item.description} />
  </div>
);