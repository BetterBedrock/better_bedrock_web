import Steve from "~/assets/images/avatars/Steve.png";
import { Link } from "~/components/link";
import { BedrockComponentProps } from "~/types";
import { Routes } from "~/utils/routes";
import { styles } from ".";
import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { ReactNode } from "react";

interface AvatarProps extends BedrockComponentProps {
  name: string;
  link?: boolean;
  profilePage?: boolean;
}

interface AvatarDetailsProps {
  name: string;
  children: ReactNode;
}

interface AvatarProps {
  children: ReactNode;
}

export const Avatar = ({ children }: AvatarProps) => (
  <div className={styles.avatar}>{children}</div>
);

Avatar.Profile = ({ size, name, link = true }: AvatarProps) => (
  <Link link={link ? Routes.PROFILE + "/" + name : undefined}>
    <img
      alt={name + " profile"}
      src={Steve}
      className={clsx(styles.picture, size && styles[size])}
    />
  </Link>
);

Avatar.Details = ({ name, children }: AvatarDetailsProps) => {
  return (
    <div className={styles.details}>
      <Link link={Routes.PROFILE + "/" + name}>
        <BedrockText text={name} type="p" color="white" />
      </Link>
      {children}
    </div>
  );
};
