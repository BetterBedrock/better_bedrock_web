"use client"

import { Notification } from "@/_components/notification";
import { useNotification } from "@/_providers/notification";

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
