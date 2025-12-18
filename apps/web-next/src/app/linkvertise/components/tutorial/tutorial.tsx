import clsx from "clsx";
import { TutorialHeading } from "./tutorial-heading";
import { TutorialParts } from "./tutorial-parts";
import { Card } from "@/_components/card";

import styles from "./tutorial.module.scss";

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
