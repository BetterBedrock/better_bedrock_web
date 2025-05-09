import { styles } from ".";
import { BedrockText } from "~/components/bedrock/text";
import {
  Notification as BaseNotification,
  NotificationTypes,
  useNotification,
} from "~/providers/notification";
import clsx from "clsx";
import Exit from "~/assets/images/exit.png";

interface NotificationProps {
  notification: BaseNotification;
}

export const Notification = ({ notification }: NotificationProps) => {
  const { closeNotification } = useNotification();
  const { color, icon } = NotificationTypes[notification.type];

  const handleExit = () => {
    closeNotification(notification.id!);
  };

  return (
    <div className={clsx(styles.wrapper, styles.outerShape, styles.outer)}>
      <div className={clsx(styles.innerShape, styles.inner)}>
        <div className={styles.column}>
          <img alt={`${notification.type} notification`} src={icon} className={styles.icon} />
        </div>

        <div className={styles.column}>
          <div className={styles.heading}>
            <BedrockText text={notification.title} type="p" color={color} textAlign="left" />
            <img alt="Close" src={Exit} className={styles.close} onClick={handleExit} />
          </div>
          <BedrockText text={notification.label} type="p" color="white" textAlign="left" />
        </div>
      </div>
    </div>
  );
};
