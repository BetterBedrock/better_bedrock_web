import clsx from "clsx";
import { ProjectMode } from "@/shared/ui/grid-download-card";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { AuthorDetailsAvatar } from "@/widgets/project-header/ui/author-details/author-details-avatar";
import { AuthorDetailsSkipButton } from "@/widgets/project-header/ui/author-details/author-details-skip-button";

import styles from "./author-details.module.scss";

interface AuthorDetails {
  mode: ProjectMode;
  selectedProject: DetailedProjectDto;
}

export const AuthorDetails = ({ mode, selectedProject }: AuthorDetails) => (
  <div className={clsx(styles.editor)}>
    <AuthorDetailsAvatar selectedProject={selectedProject} />
    {mode === "view" && <AuthorDetailsSkipButton />}
  </div>
);
