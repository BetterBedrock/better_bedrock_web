import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Caution from "~/assets/images/glyphs/Caution.png";
import Error from "~/assets/images/glyphs/ErrorGlyph.png";
import Info from "~/assets/images/glyphs/blue_info_glyph.png";
import Success from "~/assets/images/glyphs/confirm.png";

interface NotificationContextProps {
  notificationQueue: Notification[];
  sendNotification: (notification: NotificationInput) => void;
  closeNotification: (id: string) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationTypes = {
  warning: {
    type: "warning",
    color: "#FF9800",
    icon: Caution,
  },
  success: {
    type: "success",
    color: "#4CAF50",
    icon: Success,
  },
  info: {
    type: "info",
    color: "#2196F3",
    icon: Info,
  },
  error: {
    type: "error",
    color: "#F44336",
    icon: Error,
  },
} as const;

export type NotificationType = keyof typeof NotificationTypes;

export interface Notification {
  id?: string;
  title: string;
  type: NotificationType;
  label: string;
  time: "short" | "medium" | "long" | "infinite";
}

type NotificationInput = Omit<Notification, "id" | "time" | "type"> & {
  id?: string;
  time?: "short" | "medium" | "long" | "infinite";
  type?: NotificationType;
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);

  const sendNotification = ({
    title,
    label,
    id = uuidv4(),
    type = "info",
    time = "short",
  }: NotificationInput) => {
    setNotificationQueue((prev) => [
      ...prev,
      {
        id,
        label,
        title,
        type,
        time,
      },
    ]);
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
