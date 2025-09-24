import Steve from "~/assets/images/avatars/Steve.png";
import Summsatsuma from "~/assets/images/avatars/sumssatsuma.png";
import { Link } from "~/components/link";
import { BedrockComponentProps } from "~/types";
import { Routes } from "~/utils/routes";
import { styles } from ".";
import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { ReactNode } from "react";

interface AvatarProfileProps extends BedrockComponentProps {
  name: string;
  link?: boolean;
  profilePage?: boolean;
  className?: string;
}

interface AvatarDetailsProps {
  name: string;
  bold?: boolean;
  at?: boolean;
  center?: boolean;
  children?: ReactNode;
  className?: string;
}

interface AvatarProps {
  children: ReactNode;
}

export const Avatar = ({ children }: AvatarProps) => (
  <div className={styles.avatar}>{children}</div>
);

Avatar.Profile = ({ size, name, className, link = true }: AvatarProfileProps) => (
  <Link
    link={link ? Routes.PROFILE + "/" + name : undefined}
    className={(size && styles[size], className && className)}
  >
    <img
      alt={name + " profile"}
      src={name === "sumssatsuma" ? Summsatsuma : Steve}
      className={clsx(styles.picture, size && styles[size], className && className)}
    />
  </Link>
);

Avatar.Details = ({ name, at, bold, className, children }: AvatarDetailsProps) => {
  return (
    <div className={clsx(styles.details, className && className)}>
      <Link link={Routes.PROFILE + "/" + name} hideStyles>
        <BedrockText
          text={`${at ? "@" : ""}${name}`}
          type="p"
          color="white"
          font={bold ? "Minecraft" : "Mojangles"}
          textAlign="start"
        />
      </Link>
      {children}
    </div>
  );
};
