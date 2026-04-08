import clsx from "clsx";
import { ReactNode } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./banner.module.scss";

type BannerType = "info" | "neutral" | "important" | "error" | "success";

interface BannerProps {
  variant?: BannerType;
  message: string | ReactNode;
}

export const Banner = ({ message, variant = "info" }: BannerProps) => (
  <div className={clsx(styles.banner, styles[variant])}>
    {typeof message === "string" ? (
      <BedrockText text={message} type="p" />
    ) : (
      message
    )}
  </div>
);
