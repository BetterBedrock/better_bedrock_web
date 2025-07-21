import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Caution from "~/assets/images/glyphs/Caution.png";
import Error from "~/assets/images/glyphs/ErrorGlyph.png";
import Info from "~/assets/images/glyphs/blue_info_glyph.png";
import Success from "~/assets/images/glyphs/confirm.png";
import { AxiosError } from "axios";

interface NotificationContextProps {
  notificationQueue: Notification[];
  sendNotification: (notification: NotificationInput) => void;
  closeNotification: (id: string) => void;
  throwError: (err: unknown, message: string) => void;
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

enum NotificationTime {
  short = 1500,
  medium = 3000,
  long = 5000,
  inifinte = -1,
}

type NotificationTimeStrings = keyof typeof NotificationTime;

export interface Notification {
  id?: string;
  title: string;
  type: NotificationType;
  label: string;
  time: NotificationTimeStrings;
}

type NotificationInput = Omit<Notification, "id" | "time" | "type"> & {
  id?: string;
  time?: NotificationTimeStrings;
  type?: NotificationType;
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const throwError = (err: unknown, message: string): void => {
    console.log({ err });
    if (err instanceof AxiosError) {
      sendNotification({
        title: "Unexpected problem",
        label: err.response?.data?.message?.message ?? err.response?.data?.message ?? message,
        type: "error",
      });
      return;
    }

    sendNotification({
      title: "Unexpected problem",
      label: message,
      type: "error",
    });
  };

  const sendNotification = ({
    title,
    label,
    id = uuidv4(),
    type = "info",
    time = "medium",
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

    const duration = NotificationTime[time];
    if (duration === -1) return;

    const timeoutId = setTimeout(() => {
      closeNotification(id);
      timers.current.delete(id);
    }, duration);

    timers.current.set(id, timeoutId);
  };

  const closeNotification = (id: string) => {
    setNotificationQueue((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notificationQueue, throwError, closeNotification, sendNotification }}
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
