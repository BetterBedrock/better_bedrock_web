import { Notification } from "@/_components/notification";
import { styles } from ".";
import { useNotification } from "@/app/_providers/notification";

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
