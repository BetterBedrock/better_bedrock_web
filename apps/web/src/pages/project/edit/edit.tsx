import { useNavigate } from "react-router-dom";
import { Actions } from "~/pages/project/components/actions/actions";
import { Description } from "~/pages/project/components/description";
import { DetailsEditor } from "~/pages/project/components/details-editor";
import { DownloadButton } from "~/pages/project/components/download-button";
import { Header } from "~/pages/project/components/header";
import { Thumbnail } from "~/pages/project/components/thumbnail";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";
// import { BedrockText } from "~/components/bedrock/bedrock-text";
// import { styles } from ".";

export const Edit = () => {
  const navigate = useNavigate();
  const { throwError } = useNotification();
  const { user } = useAuth();
  const { selectedProject } = useProjectManager();

  if (user?.id !== selectedProject!.userId && !user?.admin) {
    navigate(Routes.PROJECT_PREVIEW + "/" + selectedProject?.id);
    throwError(null, "You don't have access to edit this project");
    return;
  }

  return (
    <>
      <Header mode="edit" />
      <DownloadButton />
      <DetailsEditor />
      <Thumbnail />
      <Description mode="edit" />
      <Actions />
    </>
  );
};
