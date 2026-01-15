"use client";

import { Notification } from "@/shared/ui/layout/notification";
import { useNotification } from "@/shared/model/notification";

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
