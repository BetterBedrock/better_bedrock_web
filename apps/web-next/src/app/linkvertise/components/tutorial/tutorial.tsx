import clsx from "clsx";
import { styles, TutorialHeading, TutorialParts } from ".";
import { Card } from "@/_components/card";

export const Tutorial = () => (
  <div className={styles.section}>
    <Card
      className={clsx(
        styles.card,
        styles.markdownWrapper,
        styles.cardContainer
      )}
    >
      <TutorialHeading />
      <TutorialParts />
    </Card>
  </div>
);
