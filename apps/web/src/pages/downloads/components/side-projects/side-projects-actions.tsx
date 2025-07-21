import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { styles } from ".";
import { useNotification } from "~/providers/notification";
import { DownloadsButtonDto } from "~/lib/api";

interface SideProjectsActionsProps {
  buttons: DownloadsButtonDto[];
}

export const SideProjectsActions = ({ buttons }: SideProjectsActionsProps) => {
  const { sendNotification } = useNotification();

  const buttonList = buttons?.map((button) => (
    <Button
      outlinePaddingRight="0"
      text={button.text}
      type={button.type}
      width="100%"
      onClick={() => {
        if (button.link) {
          window.open(button.link, "_blank", "noopener,noreferrer");
        }

        if (button.notification) {
          sendNotification({
            title: button.notification.title,
            label: button.notification.description,
            type: button.notification.type,
          });
        }
      }}
    />
  ));

  return (
    <>
      {buttonList.length < 2 ? (
        buttonList
      ) : (
        <ButtonSeparator className={styles.actions}>{...buttonList}</ButtonSeparator>
      )}
    </>
  );
};
