import { BedrockText } from "@/shared/ui/bedrock-text";
import {
  useNotification,
  Notification as BaseNotification,
  NotificationTypes,
} from "../../../../../app/providers/notification";
import styles from "./notification.module.scss";
import clsx from "clsx";
import Exit from "@/public/images/exit.png";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/shared/lib/utils";

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
          <img
            alt={`${notification.type} notification`}
            src={icon}
            className={styles.icon}
          />
        </div>

        <div className={clsx(styles.column, styles.content)}>
          <div className={styles.heading}>
            <BedrockText
              text={notification.title}
              type="p"
              color={color}
              textAlign="left"
            />
            <Image
              width={25}
              height={25}
              unoptimized
              alt="Close Icon"
              src={Exit.src}
              className={styles.close}
              onClick={handleExit}
            />
          </div>
          <BedrockText
            text={capitalizeFirstLetter(notification.label)}
            type="p"
            color="white"
            textAlign="left"
          />
        </div>
      </div>
    </div>
  );
};
