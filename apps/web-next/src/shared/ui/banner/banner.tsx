import clsx from "clsx";
import { ReactNode } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";

import { styles } from ".";

type BannerType = "info" | "neutral" | "important" | "error";

interface BannerProps {
  type: BannerType;
  message: string | ReactNode;
}

export const Banner = ({ message, type }: BannerProps) => (
  <div className={clsx(styles.banner, styles[type])}>
    {typeof message === "string" ? (
      <BedrockText
        text={message}
        type="p"
        color={type === "important" ? "black" : "white"}
      />
    ) : (
      message
    )}
  </div>
);
