import { Card } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { TiptapPreview } from "../tiptap/preview";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";

interface ViewModeProps {
  detailedProject: DetailedProjectDto;
}

export const ViewMode = ({ detailedProject }: ViewModeProps) => (
  <Card>
    <Card.Body>
      <ProjectHeaderTitle title="Description" />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <TiptapPreview
        detailedProject={detailedProject}
        content={detailedProject?.description}
      />
    </Card.Body>
  </Card>
);
