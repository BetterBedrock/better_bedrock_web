import { styles } from ".";
import { useNotification } from "~/providers/notification";
import { DownloadsButtonDto } from "~/lib/api";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface MainActionsProps {
  buttons?: DownloadsButtonDto[];
}

export const MainActions = ({ buttons }: MainActionsProps) => {
  const { sendNotification } = useNotification();

  if (!buttons || buttons.length < 1) {
    return;
  }

  return (
    <ButtonGroup className={styles.actions}>
      {buttons?.map((button, index) => (
        <Button
          key={index}
          type={button.type}
          width="100%"
          height="auto"
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
          center
        >
          <BedrockText
            text={button.text}
            type="p"
            color={button.type === "white" ? "black" : "white"}
          />
        </Button>
      ))}
    </ButtonGroup>
  );
};
