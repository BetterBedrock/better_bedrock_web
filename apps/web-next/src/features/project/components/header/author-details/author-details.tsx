import clsx from "clsx";
import { ProjectMode } from "@/components/grid-download-card";
import { DetailedProjectDto } from "@/lib/api";
import { AuthorDetailsAvatar } from "@/features/project/components/header/author-details/author-details-avatar";
import { AuthorDetailsSkipButton } from "@/features/project/components/header/author-details/author-details-skip-button";

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
