import { randomUUID } from "crypto";
import { createContext, ReactNode, useContext, useState } from "react";

interface NotificationContextProps {
  notificationQueue: Notification[];
  sendNotification: (title: string, label: string, type: "green" | "white") => void;
  closeNotification: (id: string) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export interface Notification {
  id: string;
  title: string;
  type: "green" | "white";
  label: string;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);

  const sendNotification = (title: string, label: string, type: "green" | "white") => {
    const notification = {
        label,
        title,
        id: randomUUID(),
        type,
    } as Notification;
    setNotificationQueue((prev) => [...prev, notification]);
  };

  const closeNotification = (id: string) => {
    setNotificationQueue((prev) => [...prev.filter((notification) => notification.id !== id)]);
  };

  return (
    <NotificationContext.Provider
      value={{ notificationQueue, closeNotification, sendNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw Error("useNotification has to be used within NotificationContext");
  }

  return context;
};
