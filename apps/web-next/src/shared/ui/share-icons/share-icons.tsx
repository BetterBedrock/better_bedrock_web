"use client";

import { Routes } from "@/shared/lib/utils";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import styles from "./share-icons.module.scss";
import clsx from "clsx";

interface ShareIconsProps {
  projectId?: string;
  center?: boolean;
}

export const ShareIcons = ({ projectId, center }: ShareIconsProps) => {
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${Routes.PROJECT_PREVIEW}/${projectId}`;

  return (
    <div className={clsx(styles.list, center && styles.center)}>
      <FacebookShareButton url={url} title="Test" hashtag="#betterbedrock">
        <FacebookIcon className={styles.icon} />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title="Hey, checkout this Minecraft Bedrock Mod"
      >
        <XIcon className={styles.icon} />
      </TwitterShareButton>
      <RedditShareButton
        url={url}
        title="Hey, checkout this Minecraft Bedrock Mod"
      >
        <RedditIcon className={styles.icon} />
      </RedditShareButton>
      <WhatsappShareButton
        url={url}
        title="Hey, checkout this Minecraft Bedrock Mod"
      >
        <WhatsappIcon className={styles.icon} />
      </WhatsappShareButton>
      <VKShareButton url={url} title="Эй, загляни в Minecraft Bedrock">
        <VKIcon className={styles.icon} />
      </VKShareButton>
    </div>
  );
};
