import { SimpleButton } from "@/_components/simple-button";
import { Tooltip } from "@/_components/tooltip";
import EditIcon from "@/public/ui/tiptap-icons/8.png";
import { Routes } from "@/utils/routes";

import { styles } from ".";
import { DetailedProjectDto } from "@/_lib/api";
import { Link } from "@/_components/link";

interface ProjectDetailsEditButtonProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectDetailsEditButton = ({
  detailedProject,
}: ProjectDetailsEditButtonProps) => {
  return (
    <Link link={Routes.PROJECT_EDIT + "/" + detailedProject.id}>
      <Tooltip text="Edit Project">
        <SimpleButton transparent>
          <img src={EditIcon.src} className={styles.icon} />
        </SimpleButton>
      </Tooltip>
    </Link>
  );
};
