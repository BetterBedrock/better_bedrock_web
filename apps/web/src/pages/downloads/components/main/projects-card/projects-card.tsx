import { Card, CardBody, CardDivider } from "~/components/bedrock/card";

import {
  ProjectsCardBanner,
  ProjectsCardContainer,
  ProjectsCardOrder,
  ProjectsCardSearchBar,
  ProjectsCardSearchProvider,
  ProjectsCardTitle,
  ProjectsCardType,
  styles,
} from ".";

export const ProjectsCard = () => (
  <Card sub className={styles.main}>
    <CardBody>
      <ProjectsCardBanner />
      <ProjectsCardTitle />
    </CardBody>
    <CardDivider sub />
    <CardBody>
      <ProjectsCardSearchProvider>
        <ProjectsCardSearchBar />
        <ProjectsCardType />
        <ProjectsCardOrder />
        <ProjectsCardContainer />
      </ProjectsCardSearchProvider>
    </CardBody>
  </Card>
);
