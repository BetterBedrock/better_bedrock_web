import { Card } from "@/components/card";

import { TutorialDescription } from "./tutorial-description";
import { TutorialTitle } from "./tutorial-title";

import styles from "./tutorial.module.scss";

export const TutorialHeading = () => (
  <Card sub className={styles.sub}>
    <TutorialTitle />
    <TutorialDescription />
  </Card>
);
