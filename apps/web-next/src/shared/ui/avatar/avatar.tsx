import Steve from "@/public/images/avatars/Steve.png";
import Summsatsuma from "@/public/images/avatars/sumssatsuma.png";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { BedrockComponentProps } from "@/shared/lib/utils";
import { Routes } from "@/shared/lib/utils";
import { Link } from "@/shared/ui/link";
import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./avatar.module.scss";

interface AvatarComponent extends FC<AvatarProps> {
  Profile: FC<AvatarProfileProps>;
  Details: FC<AvatarDetailsProps>;
}

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
  link?: boolean;
  className?: string;
}

interface AvatarProps {
  children?: ReactNode;
  name?: string;
  className?: string;
}

export const Avatar = (({ children, name, className }) => (
  <Link link={name && Routes.PROFILE + "/" + name + "/projects"} hideStyles>
    <div className={clsx(styles.avatar, className)}>{children}</div>
  </Link>
)) as AvatarComponent;

Avatar.Profile = ({
  size,
  name,
  className,
  link = true,
}: AvatarProfileProps) => (
  <Link
    link={link ? Routes.PROFILE + "/" + name + "/projects" : undefined}
    className={(size && styles[size], className && className)}
  >
    <img
      alt={name + " profile"}
      src={name === "sumssatsuma" ? Summsatsuma.src : Steve.src}
      className={clsx(
        styles.picture,
        size && styles[size],
        className && className,
      )}
    />
  </Link>
);

Avatar.Details = ({
  name,
  at,
  bold,
  className,
  children,
  link = true,
}: AvatarDetailsProps) => {
  return (
    <div className={clsx(styles.details, className && className)}>
      <Link
        link={link ? Routes.PROFILE + "/" + name + "/projects" : undefined}
        hideStyles
      >
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

Avatar.displayName = "Avatar";
Avatar.Profile.displayName = "Avatar.Profile";
Avatar.Details.displayName = "Avatar.Details";
