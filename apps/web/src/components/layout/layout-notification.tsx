import { Notification } from "~/components/bedrock/notification";
import { useNotification } from "~/providers/notification";
import { styles } from ".";

export const LayoutNotification = () => {
  const { notificationQueue } = useNotification();

  return (
    <div className={styles.notifications}>
      {notificationQueue.map((notification, index) => (
        <Notification key={index} notification={notification} />
      ))}
    </div>
  );
};
