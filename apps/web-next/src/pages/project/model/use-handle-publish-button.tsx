import { useNotification } from "@/app/providers/notification";
import { useProjectManager } from "@/app/providers/project-manager";
import { publishProject } from "@/entities/project";
import { Routes } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";

interface UseHandlePublishButtonProps {
  onClose?: () => void;
  notify?: boolean;
  updateLastChanged?: boolean;
}

export const useHandlePublishButton = ({
  onClose,
  notify,
  updateLastChanged,
}: UseHandlePublishButtonProps) => {
  const router = useRouter();
  const { sendNotification, throwError } = useNotification();
  const { selectedProject } = useProjectManager();

  const onPublish = async () => {
    const { error } = await publishProject(
      selectedProject!.id,
      notify,
      updateLastChanged,
    );

    if (error) {
      throwError(null, error);
      return;
    }

    sendNotification({
      type: "success",
      title: selectedProject!.title,
      label: "The project has been published",
    });
    onClose?.();

    router.push(Routes.PANEL_PROJECTS);
  };

  return onPublish;
};
