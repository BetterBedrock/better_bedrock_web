import { SimpleButton } from "~/components/bedrock/simple-button";
import { Tooltip } from "~/components/bedrock/tooltip";
import { styles } from ".";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import EditIcon from "~/assets/ui/tiptap-icons/8.png";
import { useProjectManager } from "~/pages/project/providers/project-manager";

export const ProjectDetailsEditButton = () => {
  const { selectedProject } = useProjectManager();
  const navigate = useNavigate();

  return (
    <Tooltip text="Edit Project">
      <SimpleButton
        transparent
        onClick={() => navigate(Routes.PROJECT_EDIT + "/" + selectedProject!.id)}
      >
        <img src={EditIcon} className={styles.icon} />
      </SimpleButton>
    </Tooltip>
  );
};
