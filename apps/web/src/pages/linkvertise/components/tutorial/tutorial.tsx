import clsx from "clsx";
import { Card } from "~/components/bedrock/card";

import { styles, TutorialHeading } from ".";
import { TutorialParts } from "~/pages/linkvertise/components/tutorial/tutorial-parts";

export const Tutorial = () => (
  <div className={styles.section}>
    <Card className={clsx(styles.card, styles.markdownWrapper, styles.cardContainer)}>
      <TutorialHeading />
      <TutorialParts />
    </Card>
  </div>
);
