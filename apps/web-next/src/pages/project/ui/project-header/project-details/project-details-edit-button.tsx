import { SimpleButton } from "@/shared/ui/simple-button";
import { Tooltip } from "@/shared/ui/tooltip";
import EditIcon from "@/public/ui/tiptap-icons/8.png";
import { Routes } from "@/shared/lib/utils";

import { DetailedProjectDto } from "@/shared/lib/openapi";
import { Link } from "@/shared/ui/link";

import styles from "./project-details.module.scss";

interface ProjectDetailsEditButtonProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectDetailsEditButton = ({
  detailedProject,
}: ProjectDetailsEditButtonProps) => (
  <Link link={Routes.PROJECT_EDIT + "/" + detailedProject.id}>
    <Tooltip text="Edit Project">
      <SimpleButton transparent>
        <img src={EditIcon.src} className={styles.icon} />
      </SimpleButton>
    </Tooltip>
  </Link>
);
