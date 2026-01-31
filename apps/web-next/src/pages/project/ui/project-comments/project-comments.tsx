import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { fetchComments } from "@/entities/project";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { ProjectCommentsList } from "./project-comments-list";
import { ProjectCommentsPost } from "./project-comments-post";

import styles from "./project-comments.module.scss";
import { fetchLoggedUser } from "@/entities/auth";

interface ProjectCommentsProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectComments = async ({
  detailedProject,
}: ProjectCommentsProps) => {
  const comments = await fetchComments(detailedProject.id);
  const user = await fetchLoggedUser();
  return (
    <Card>
      <div className={styles.editor}>
        <ProjectHeaderTitle title="Comments" />
      </div>
      <CardDivider />
      <CardBody gap>
        <ProjectCommentsPost user={user} detailedProject={detailedProject} />
        <ProjectCommentsList comments={comments} user={user} />
      </CardBody>
    </Card>
  );
};
