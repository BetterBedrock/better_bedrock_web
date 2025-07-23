import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { useNotification } from "~/providers/notification";
import { DownloadsButtonDto } from "~/lib/api";
import { ButtonGroup } from "~/components/button-group/button-group";

interface CommunityActionsProps {
  buttons: DownloadsButtonDto[];
}

export const CommunityActions = ({ buttons }: CommunityActionsProps) => {
  const { sendNotification } = useNotification();

  const buttonList = buttons?.map((button) => (
    <Button
      outlinePaddingRight="0"
      text={button.text}
      type={button.type}
      width="100%"
      height={"auto"}
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
        <ButtonGroup className={styles.actions}>{...buttonList}</ButtonGroup>
      )}
    </>
  );
};
