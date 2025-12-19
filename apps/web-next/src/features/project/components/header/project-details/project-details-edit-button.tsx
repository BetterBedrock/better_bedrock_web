import { SimpleButton } from "@/components/simple-button";
import { Tooltip } from "@/components/tooltip";
import EditIcon from "@/public/ui/tiptap-icons/8.png";
import { Routes } from "@/utils/routes";

import { DetailedProjectDto } from "@/lib/api";
import { Link } from "@/components/link";

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
