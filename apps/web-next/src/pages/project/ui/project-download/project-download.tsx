import { DetailedProjectDto, UserDto } from "@/shared/lib/openapi";
import { activateVoucher } from "@/entities/checkout";
import { ProjectDownloadPopup } from "./project-download-popup";

interface ProjectDownloadProps {
  user?: UserDto;
  detailedProject: DetailedProjectDto;
  hideExtraButtons?: boolean;
  showPublishButton?: boolean;
}

export const ProjectDownload = async ({
  detailedProject,
  user,
  hideExtraButtons = false,
  showPublishButton = false,
}: ProjectDownloadProps) => {
  if (!detailedProject?.downloadFile) return <></>;

  const voucher = await activateVoucher();

  return (
    <ProjectDownloadPopup
      detailedProject={detailedProject}
      user={user}
      voucher={voucher?.error ? undefined : voucher?.data}
      hideExtraButtons={hideExtraButtons}
      showPublishButton={showPublishButton}
    />
  );
};
