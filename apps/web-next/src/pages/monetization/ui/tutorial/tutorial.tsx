import { TutorialParts } from "./tutorial-parts";
import { Card } from "@/shared/ui/card";

import { TutorialTitle } from "./tutorial-title";
import { TutorialDescription } from "./tutorial-description";

export const Tutorial = () => (
  <Card fullWidth>
    <Card.Body>
      <TutorialTitle />
      <TutorialDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <TutorialParts />
    </Card.Body>
  </Card>
);
