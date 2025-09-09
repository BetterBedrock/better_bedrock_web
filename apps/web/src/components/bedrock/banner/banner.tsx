import clsx from "clsx";
import { ReactNode } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

type BannerType = "info" | "neutral" | "important" | "error";

interface BannerProps {
  type: BannerType;
  message: string | ReactNode;
}

export const Banner = ({ message, type }: BannerProps) => (
  <div className={clsx(styles.banner, styles[type])}>
    {typeof message === "string" ? <BedrockText text={message} type="p" color="white" /> : message}
  </div>
);
