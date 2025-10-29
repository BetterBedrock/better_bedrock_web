import { Card } from "~/components/bedrock/card";

import { styles, TutorialDescription, TutorialTitle } from ".";

export const TutorialHeading = () => (
  <Card sub className={styles.sub}>
    <TutorialTitle />
    <TutorialDescription />
  </Card>
);
