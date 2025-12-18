import clsx from "clsx";
import { ProjectMode } from "@/_components/grid-download-card";
import { DetailedProjectDto } from "@/_lib/api";
import { AuthorDetailsAvatar } from "@/app/project/components/header/author-details/author-details-avatar";
import { AuthorDetailsSkipButton } from "@/app/project/components/header/author-details/author-details-skip-button";

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
