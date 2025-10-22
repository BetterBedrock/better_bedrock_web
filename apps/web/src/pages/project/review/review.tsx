import { useNavigate } from "react-router-dom";
import { CardPreview } from "~/pages/project/components/card-preview";
import { Description } from "~/pages/project/components/description";
import { DownloadButton } from "~/pages/project/components/download-button";
import { Header } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";

export const Review = () => {
  const navigate = useNavigate();
  const { throwError } = useNotification();
  const { user } = useAuth();
  const { selectedProject } = useProjectManager();

  if (!user?.admin) {
    navigate(Routes.PROJECT_PREVIEW + "/" + selectedProject?.id);
    throwError(null, "Only admins can review projects");
  }

  if (!selectedProject?.submitted) {
    navigate(Routes.HOME);
    throwError(null, "This project is no longer submitted");
  }

  return (
    <>
      <Header mode="view" />
      <Description mode="view" />
      <DownloadButton />
      <CardPreview />
    </>
  );
};
