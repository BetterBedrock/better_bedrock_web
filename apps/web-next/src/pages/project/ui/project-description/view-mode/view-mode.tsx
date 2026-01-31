import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { TiptapPreview } from "../tiptap/preview";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";

import styles from "./view-mode.module.scss";

interface ViewModeProps {
  detailedProject: DetailedProjectDto;
}

export const ViewMode = ({ detailedProject }: ViewModeProps) => (
  <Card>
    <CardBody>
      <ProjectHeaderTitle title="Description" />
    </CardBody>
    <CardDivider />
    <CardBody>
      <TiptapPreview
        detailedProject={detailedProject}
        content={detailedProject?.description}
      />
    </CardBody>
  </Card>
);
