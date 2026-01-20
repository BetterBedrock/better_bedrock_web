import { Card, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { fetchComments } from "@/entities/project/api/fetch-comments";
import { fetchLoggedUser } from "@/lib/auth";
import { ProjectHeaderTitle } from "@/widgets/project-header/ui/project-header-title";
import { ProjectCommentsList } from "@/widgets/project-comments/ui/project-comments-list";
import { ProjectCommentsPost } from "@/widgets/project-comments/ui/project-comments-post";

import styles from "./project-comments.module.scss";

interface ProjectCommentsProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectComments = async ({
  detailedProject,
}: ProjectCommentsProps) => {
  const comments = await fetchComments(detailedProject.id);
  const user = await fetchLoggedUser();
  return (
    <Card sub>
      <div className={styles.editor}>
        <ProjectHeaderTitle title="Comments" />
      </div>
      <CardDivider sub />
      <ProjectCommentsPost user={user} detailedProject={detailedProject} />
      <ProjectCommentsList comments={comments} user={user} />
    </Card>
  );
};
