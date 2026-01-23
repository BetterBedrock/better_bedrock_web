"use client";

import { Notification } from "./notification/notification";
import { useNotification } from "@/app/providers/notification";

import styles from "./layout.module.scss";

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
