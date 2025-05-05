import { Label } from "~/components/bedrock/label";
import { styles } from ".";
import { BedrockText } from "~/components/bedrock/text";
import { Notification as BaseNotification, useNotification } from "~/providers/notification";
import SimpleButton from "~/components/bedrock/simple-button/simple-button";

interface NotificationProps {
  notification: BaseNotification;
}

export const Notification = ({ notification }: NotificationProps) => {
  const { closeNotification } = useNotification();
  return (
    <div className={styles.notification}>
      <Label type="green" width="300px" height="60px">
        <BedrockText text={notification.label} type="p" color="white" />
        <SimpleButton
          onTap={() => {
            closeNotification(notification.id);
          }}
        >
          Close
        </SimpleButton>
      </Label>
    </div>
  );
};
