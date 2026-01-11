import { TutorialParts } from "./tutorial-parts";
import { Card, CardBody, CardDivider } from "@/components/card";

import { TutorialTitle } from "./tutorial-title";
import { TutorialDescription } from "./tutorial-description";

export const Tutorial = () => (
  <Card fullWidth>
    <CardBody>
      <TutorialTitle />
      <TutorialDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <TutorialParts />
    </CardBody>
  </Card>
);
