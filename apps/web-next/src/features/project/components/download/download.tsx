import { DetailedProjectDto, UserDto } from "@/lib/api";
import { DownloadPopup } from "@/features/project/components/download/download-popup";
import { activateVoucher } from "@/features/project/server/activate-voucher";

interface DownloadProps {
  user?: UserDto;
  detailedProject: DetailedProjectDto;
}

export const Download = async ({ detailedProject, user }: DownloadProps) => {
  if (!detailedProject?.downloadFile) return <></>;

  const voucher = await activateVoucher();

  return (
    <DownloadPopup
      detailedProject={detailedProject}
      user={user}
      voucher={voucher?.error ? undefined : voucher?.data}
    />
  );
};
