import { Card } from "@/_components/card";

import { styles, TutorialDescription, TutorialTitle } from ".";

export const TutorialHeading = () => (
  <Card sub className={styles.sub}>
    <TutorialTitle />
    <TutorialDescription />
  </Card>
);
