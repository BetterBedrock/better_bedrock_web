import { DetailedProjectDto, UserDto } from "@/shared/api/openapi";
import { ProjectDownloadPopup } from "@/widgets/project-download/ui/project-download-popup";
import { activateVoucher } from "@/entities/voucher/activate-voucher";

interface ProjectDownloadProps {
  user?: UserDto;
  detailedProject: DetailedProjectDto;
}

export const ProjectDownload = async ({
  detailedProject,
  user,
}: ProjectDownloadProps) => {
  if (!detailedProject?.downloadFile) return <></>;

  const voucher = await activateVoucher();

  return (
    <ProjectDownloadPopup
      detailedProject={detailedProject}
      user={user}
      voucher={voucher?.error ? undefined : voucher?.data}
    />
  );
};
